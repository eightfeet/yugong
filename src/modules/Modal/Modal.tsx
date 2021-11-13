import { useCallback, useEffect, useRef, useState } from "react";
import requester from "~/core/fetch";
import { AppDataElementsTypes, ArgumentsItem } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import MD from "~/components/Modal";
import useStyles from "./Module.useStyles";
import config from "./Modal.config";
import useLifeCycle, { UseLifeCycleResult } from "~/hooks/useLifeCycle";
import classNames from "classnames";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Cancel from "~/components/Icon/Cancel";

export interface ModalProps extends AppDataElementsTypes {}

const Modal: Modules<ModalProps> = (props) => {
  const { editingId, currentEditorStylePath } = useSelector((state: RootState) => state.controller);
  const { api, moduleId, style } = props;
  const eventEmitterRef =
    useRef<
      UseLifeCycleResult<
        { [keys in "mount" | "unmount" | "ok" | "cancel"]: Function }
      >
    >();

  const MId = `MD${moduleId}`;
  // 定义注册方法
  // ===================================================================================

  // 创建模块
  const userClass = useStyles(MId)(style);
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
    eventEmitterRef.current?.[0].cancel();
  }, []);

  eventEmitterRef.current = useLifeCycle(
    moduleId,
    {
      mount: "初始化",
      unmount: "卸载",
      ok: "确认",
      cancel: "取消/关闭",
    },
    { config, show, hide }
  );

  // API请求 注意依赖关系
  // 点击事件
  const onClickOk = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === 'onOkApi');
    // api 参数交由requester自行处理
    await requester(apiArguments || {});
    eventEmitterRef.current?.[0].ok();
}, [api]);

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
        className={userClass.root}
        modifyStyle={[{fontSize: '0'}]}
      >
        <div className={userClass.container}>
          <div className={userClass.close} onClick={hide}>
            <Cancel />
          </div>
          <div className={userClass.content} onClick={e => e.stopPropagation()}>
            {title && <header className={userClass.header}>{title}</header>}
            {content && <div className={userClass.article}>{content}</div>}
            <footer className={userClass.footer}>
              {ok?.length ? <button className={classNames(userClass.button, userClass.okButton)} onClick={onClickOk}> {ok} </button> : null}{" "}
              {cancel?.length ? <button onClick={hide} className={classNames(userClass.button, userClass.cancelButton)}> {cancel} </button> : null}
            </footer>
          </div>
        </div>
      </MD>
    </Wrapper>
  );
};

// bind static
for (const key in config) {
  if (Object.prototype.hasOwnProperty.call(config, key)) {
    Modal[key] = config[key];
  }
}

export default Modal;
