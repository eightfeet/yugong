import { useCallback, useEffect, useRef, useState } from "react";
import requester from "~/core/fetch";
import { AppDataElementsTypes, ArgumentsItem } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import MD from "~/components/Modal";
import useStyles from "./LuckyRecord.useStyles";
import config from "./LuckyRecord.config";
import useLifeCycle, { UseLifeCycleResult } from "~/hooks/useLifeCycle";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import s from "./LuckyRecord.module.less";
import Cancel from "~/components/Icon/Cancel";
import classNames from "classnames";

export interface LuckyRecordProps extends AppDataElementsTypes {}

const LuckyRecord: Modules<LuckyRecordProps> = (props) => {
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
  const [list, setList] = useState([1,2,3,4,5,6])

  /**
   * 配置弹窗
   */
  const config = useCallback(
    (
      title: ArgumentsItem,
      content: ArgumentsItem,
      ok: ArgumentsItem,
      cancel: ArgumentsItem,
      coveclose: ArgumentsItem
    ) => {
      const orgTitle = getArgumentsItem(title) as string;
      setTitle(orgTitle);
    },
    []
  );

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
    const apiArguments = api?.find((item) => item.apiId === "onOkApi");
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
        onCancel={hide}
        className={userClass.root}
        modifyStyle={[{ fontSize: "0" }]}
      >
        <div className={userClass.container}>
          <div className={userClass.close} onClick={hide}>
            <Cancel />
          </div>
          <div
            className={userClass.content}
            onClick={(e) => e.stopPropagation()}
          >
            {title && <header className={userClass.header}>{title}</header>}
            <div className={classNames(s.articlelistwrap, userClass.article)}>
              <div>
                <ul className={classNames(s.articlelist, s.listwrap)}>
                  {list && list.map((item) => <li key={item}>
                    <div className={s.cover}></div>
                    <div className={s.item}>
                      <h3 className={s.itemtitle}>这是标题</h3>
                      <h4 className={s.itemsubtitle}>
                        1内容1内容1内容1内容1内容1内容1内容1内容
                      </h4>
                      <p className={s.iteminfo}>1内容1内容1内容1内容1内容1内容1内容1内容</p>
                      <div className={s.buttons}>
                        <button>按钮</button>
                        <button>按钮</button>
                        <button>按钮</button>
                      </div>
                    </div>
                  </li>)}
                </ul>
              </div>
            </div>
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
    LuckyRecord[key] = config[key];
  }
}

export default LuckyRecord;
