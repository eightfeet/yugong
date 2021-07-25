import { useCallback, useEffect, useRef, useState } from "react";
import requester from "~/core/fetch";
import { AnyObjectType, AppDataElementsTypes } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import MD from "~/components/Modal";
import { buildParams } from "./defaultParams";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import useStyles from "./Module.useStyles";
import IconCancel from "./IconCancel";
import s from "./Modal.module.less";
import ReactDOM from "react-dom";
import config from "./Modal.config";
import useLifeCycle, { UseLifeCycleResult } from "~/hooks/useLifeCycle";
import useModal from "~/hooks/useModal";
import { ModalParameters } from "@eightfeet/modal";
import classNames from "classnames";

export interface ModalProps extends AppDataElementsTypes {}

interface UseParams {
  animationType?:
    | "fadeInLeft"
    | "fadeInRight"
    | "fadeInDown"
    | "fadeInUp"
    | "zoomInLeft"
    | "zoomInRight"
    | "zoomInDown"
    | "zoomInUp"
    | "zoomIn"
    | "flipInX"
    | "flipInY";
  animationDuration?: string;
  closable?: boolean;
  shouldCloseOnOverlayClick?: boolean;
}

interface Btnstate {
  isOk: boolean;
  okText: string;
  isCancel: boolean;
  cancelText: string;
  isOkDisabled: boolean;
  isCancelDisabled: boolean;
}

const Modal: Modules<ModalProps> = (props) => {
  const { api, moduleId, style } = props;
  const [useParams, setUserParams] = useState<UseParams>();
  const eventEmitterRef =
    useRef<
      UseLifeCycleResult<
        { [keys in "mount" | "unmount" | "onOk" | "onCancel"]: Function }
      >
    >();

  const MId = `MD${moduleId}`;
  // 定义注册方法
  // ===================================================================================
  const params = buildParams({
    id: MId,
    animationType: "zoomIn",
    animationDuration: "0.2ms",
    closable: true,
    shouldCloseOnOverlayClick: true,
    ...(useParams || {}),
    onCancel: () => {
      eventEmitterRef.current?.[0].onCancel();
    },
  });

  const [btnstate, setbtnstate] = useState<Btnstate>({
    isOk: true,
    okText: "确定",
    isCancel: true,
    cancelText: "取消",
    isOkDisabled: false,
    isCancelDisabled: false,
  });

  // 创建模块
  const userClass = useStyles(MId)(style);

  const [animation, setAnimation] = useState<ModalParameters["animation"]>();
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [shouldCloseOnOverlayClick, setShouldCloseOnOverlayClick] =
    useState<boolean>();
  const [ok, setOk] = useState<string>();
  const [cancel, setCancel] = useState<string>();

  /**
   * 设置内容
   */
  const handleContent = useCallback(() => {
    setTitle("设置标题");
    setContent("设置内容");
    setShouldCloseOnOverlayClick(true);
  }, []);

  const handleButton = useCallback(() => {
    setOk("确定");
    setCancel("取消");
  }, []);

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
        animation={animation}
        onCancel={hide}
        className={userClass.root}
      >
        <div className={userClass.modify} />
        <div className={userClass.container}>
          <div className={userClass.close} onClick={hide}>
            <IconCancel />
          </div>
          <div className={userClass.content}>
            {title && <h3 className={userClass.header}>{title}</h3>}
            {content && <div className={userClass.article}>{content}</div>}
            <footer>
              {ok?.length && <button className={classNames(userClass.button, userClass.okButton)}> {ok} </button>}{" "}
              {cancel?.length && <button onClick={hide} className={classNames(userClass.button, userClass.cancelButton)}> {cancel} </button>}
            </footer>
          </div>
        </div>
      </MD>
      <button onClick={handleContent}>设置标题</button>
      <button onClick={handleButton}>设置按钮</button>
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
