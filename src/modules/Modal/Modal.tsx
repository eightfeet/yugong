import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PresetModule from '~/components/PresetModule';
import { ClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsItem } from '~/types/appData';
import { getArguments, getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { RootState } from '~/redux/store';
import MD from "~/components/Modal";
import Wrapper from '../Wrapper';
import requester from "~/core/fetch";
import config, { ExposeEventsKeys } from './Modal.config';
import createStyles, { ClassesKey } from './Modal.createStyles';
import classNames from 'classnames';
import Cancel from "~/components/Icon/Cancel";
import { boolean } from 'yup';

export type ModalProps = ClassModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

const Modal: React.FC<ModalProps> = (props) => {
  const { editingId, currentEditorStylePath } = useSelector((state: RootState) => state.controller);
  const { api, moduleId } = props;
  const MId = `MD${moduleId}`;
  const {
    registersFunction,
    eventDispatch,
    classes,
  } = props;

  // 定义注册方法
  // ===================================================================================

  // 创建模块
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [shouldCloseOnOverlayClick, setShouldCloseOnOverlayClick] =
    useState<boolean>();
  const [ok, setOk] = useState<string>();
  const [cancel, setCancel] = useState<string>();

  /**
   * 配置弹窗
   */
  const config = useCallback(
    (...args: ArgumentsItem[]) => {
      const { title, content, ok, cancel, coveclose } = getArguments(args) as { 
        title: string, 
        content: string, 
        ok: string, 
        cancel: string, 
        coveclose: boolean 
      }
      setTitle(title?.length ? title : undefined);
      setContent(content);
      setOk(ok);
      setCancel(cancel);
      setShouldCloseOnOverlayClick(coveclose);
    },
    [],
  )

  /**
   * 显示弹窗
   */
  const show = useCallback(() => {
    setVisible(true);
  }, []);

  /**
   * 隐藏弹窗
   */
  const hide = useCallback(() => {
    setVisible(false);
    // eventEmitterRef.current?.[0].cancel();
  }, []);


  // First setup registers
  useEffect(() => {
    registersFunction({
      config, show, hide
    })
  }, [config, hide, registersFunction, show])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // API请求 注意依赖关系
  // 点击事件
  const onClickOk = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === 'onOkApi');
    // api 参数交由requester自行处理
    await requester(apiArguments || {});
    props.eventDispatch().ok();
  }, [api, props]);

  useEffect(() => {
    if (editingId === moduleId && !visible) {
      show();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId, moduleId, show, currentEditorStylePath])

  return (
    <Wrapper {...props} maxHeight maxWidth>
      <MD
        id={MId}
        visible={visible}
        shouldCloseOnOverlayClick={!!shouldCloseOnOverlayClick}
        onCancel={hide}
        className={classes[`MD${props.moduleId}`]}
        modifyStyle={[{ fontSize: '0' },{ fontSize: '0' }]}
      >
        {title ? <MD.Header className={classes.header}>{title}</MD.Header>: null}
        <div className={classes.container}>
          <div className={classes.content} onClick={e => e.stopPropagation()}>
            {content && <div className={classes.article}>{content}</div>}
          </div>
        </div>
        {
          (ok?.length || cancel?.length) ? <MD.Footer className={classes.footer}>
            {ok?.length ? <button className={classNames(classes.button, classes.okButton)} onClick={onClickOk}> {ok} </button> : null}{" "}
              {cancel?.length ? <button onClick={hide} className={classNames(classes.button, classes.cancelButton)}> {cancel} </button> : null}
          </MD.Footer> : null
        }
      </MD>
    </Wrapper>
  )
}

export default PresetModule<ModalProps>(Modal, config, createStyles);
