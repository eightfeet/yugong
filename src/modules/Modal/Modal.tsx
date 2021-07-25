import { useCallback, useEffect, useRef, useState } from "react";
import requester from "~/core/fetch";
import { AppDataElementsTypes } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import MD from "~/components/Modal";
import useStyles from "./Module.useStyles";
import IconCancel from "./IconCancel";
import config from "./Modal.config";
import useLifeCycle, { UseLifeCycleResult } from "~/hooks/useLifeCycle";
import classNames from "classnames";

export interface ModalProps extends AppDataElementsTypes {}

const Modal: Modules<ModalProps> = (props) => {
  const { api, moduleId, style } = props;
  const eventEmitterRef =
    useRef<
      UseLifeCycleResult<
        { [keys in "mount" | "unmount" | "onOk" | "onCancel"]: Function }
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
   * 显示弹窗
   */
  const show = useCallback(() => {
    setTitle("设置标题");
    setContent("设置内容");
    setOk("确定");
    setCancel("取消");
    setShouldCloseOnOverlayClick(true);
    setVisible(true);
  }, []);

  /**
   * 隐藏弹窗
   */
  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  eventEmitterRef.current = useLifeCycle(
    moduleId,
    {
      mount: "初始化",
      unmount: "卸载",
      onOk: "确认",
      onCancel: "取消/关闭",
    },
    { show, hide }
  );

  // API请求 注意依赖关系
  useEffect(() => {
    const apiArguments = api?.find((item) => item.apiId === "");
    requester(apiArguments || {});
  }, [api]);

  return (
    <Wrapper {...props} maxHeight maxWidth>
      <MD
        id={MId}
        visible={visible}
        shouldCloseOnOverlayClick={!!shouldCloseOnOverlayClick}
        onCancel={hide}
        className={userClass.root}
      >
        <div className={userClass.modify} />
        <div className={userClass.container}>
          <div className={userClass.close} onClick={hide}>
            <IconCancel />
          </div>
          <div className={userClass.content} onClick={e => e.stopPropagation()}>
            {title && <h3 className={userClass.header}>{title}</h3>}
            {content && <div className={userClass.article}>{content}</div>}
            <footer>
              {ok?.length && <button className={classNames(userClass.button, userClass.okButton)}> {ok} </button>}{" "}
              {cancel?.length && <button onClick={hide} className={classNames(userClass.button, userClass.cancelButton)}> {cancel} </button>}
            </footer>
          </div>
        </div>
      </MD>
      <button onClick={show}>确定</button>
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
