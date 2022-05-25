import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PresetModule from '~/components/PresetModule';
import { ClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsItem, ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import MD from "~/components/Modal";
import Wrapper from '../Wrapper';
import requester from "~/core/fetch";
import config, { ExposeEventsKeys } from './Modal.config';
import createStyles, { ClassesKey } from './Modal.createStyles';
import classNames from 'classnames';
import Cancel from "~/components/Icon/Cancel";

export type ModalProps = ClassModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

const Modal: React.FC<ModalProps> = (props) => {
  const { editingId, currentEditorStylePath } = useSelector((state: RootState) => state.controller);
  const { api, moduleId, style } = props;
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
    (title: ArgumentsItem, content: ArgumentsItem, ok: ArgumentsItem, cancel: ArgumentsItem, coveclose: ArgumentsItem) => {
      const orgTitle = getArgumentsItem(title) as string;
      const orgContent = getArgumentsItem(content) as string;
      const orgOk = getArgumentsItem(ok) as string;
      const orgCancel = getArgumentsItem(cancel) as string;
      const orgCoveclose = getArgumentsItem(coveclose) as boolean;
      setTitle(orgTitle);
      setContent(orgContent);
      setOk(orgOk);
      setCancel(orgCancel);
      setShouldCloseOnOverlayClick(orgCoveclose);
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
    <Wrapper {...props}  maxHeight maxWidth>
      <MD
        id={MId}
        visible={visible}
        shouldCloseOnOverlayClick={!!shouldCloseOnOverlayClick}
        onCancel={hide}
        className={classes.root}
        modifyStyle={[{fontSize: '0'}]}
      >
        <div className={classes.container}>
          <div className={classes.close} onClick={hide}>
            <Cancel />
          </div>
          <div className={classes.content} onClick={e => e.stopPropagation()}>
            {title && <header className={classes.header}>{title}</header>}
            {content && <div className={classes.article}>{content}</div>}
            <footer className={classes.footer}>
              {ok?.length ? <button className={classNames(classes.button, classes.okButton)} onClick={onClickOk}> {ok} </button> : null}{" "}
              {cancel?.length ? <button onClick={hide} className={classNames(classes.button, classes.cancelButton)}> {cancel} </button> : null}
            </footer>
          </div>
        </div>
      </MD>
    </Wrapper>
  )
}

export default PresetModule<ModalProps>(Modal, config, createStyles);
