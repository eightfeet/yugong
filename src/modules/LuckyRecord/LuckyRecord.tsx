import { useCallback, useEffect, useRef, useState } from "react";
import requester from "~/core/fetch";
import { AnyObjectType, AppDataElementsTypes, ArgumentsItem } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import MD from "~/components/Modal";
import useStyles from "./LuckyRecord.useStyles";
import config from "./LuckyRecord.config";
import useLifeCycle, { UseLifeCycleResult } from "~/hooks/useLifeCycle";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "~/redux/store";
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import s from "./LuckyRecord.module.less";
import Cancel from "~/components/Icon/Cancel";
import classNames from "classnames";

export interface LuckyRecordProps extends AppDataElementsTypes {}

const LuckyRecord: Modules<LuckyRecordProps> = (props) => {
  const { editingId, currentEditorStylePath } = useSelector((state: RootState) => state.controller);
  const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;
  const { api, moduleId, style } = props;
  const eventEmitterRef =
    useRef<
      UseLifeCycleResult<
        { [keys in "mount" | "unmount" | "cancel" | "clickItem" | "clickA" | "clickB" | "clickC"]: Function }
      >
    >();

  const MId = `MD${moduleId}`;
  // 定义注册方法
  // ===================================================================================

  // 创建模块
  const userClass = useStyles(MId)(style);
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [list, setList] = useState<any[]>();
  const [activite, setActivite] = useState<number>();
  const [itemRuleList, setItemRuleList] = useState<{
    itemCover?: ArgumentsItem,
    itemTitle?: ArgumentsItem,
    itemSubTitle?: ArgumentsItem,
    itemContent?: ArgumentsItem,
  }>();
  const [buttonRuleA, setButtonRuleA] = useState<ArgumentsItem>();
  const [buttonRuleB, setButtonRuleB] = useState<ArgumentsItem>();
  const [buttonRuleC, setButtonRuleC] = useState<ArgumentsItem>();

  /**
   * 配置弹窗
   */
  const config = useCallback(
    (
      title: ArgumentsItem,
    ) => {
      // 设置弹窗标题
      const orgTitle = getArgumentsItem(title) as string;
      setTitle(orgTitle);
    },
    []
  );

  /**
   * 配置列表项数据
   */
  const itemConfig = useCallback(
    (
      itemCover: ArgumentsItem,
      itemTitle: ArgumentsItem,
      itemSubTitle: ArgumentsItem,
      itemContent: ArgumentsItem,
    ) => {
      setItemRuleList({
        itemCover,
        itemTitle,
        itemSubTitle,
        itemContent
      })
    },
    [],
  )

  /**
   * 配置按钮
   */

  const buttonConfig = useCallback(
    (
      buttonA: ArgumentsItem,
      buttonB: ArgumentsItem,
      buttonC: ArgumentsItem,
    ) => {
      setButtonRuleA(buttonA);
      setButtonRuleB(buttonB);
      setButtonRuleC(buttonC);
    },
    [],
  )

  /**
   * 获取数据
   */
   const getList = useCallback(
    async () => {
      const {itemCover, itemTitle, itemSubTitle, itemContent} = itemRuleList || {};
      let data = [];
      /**获取数据 */
      const apiArguments = api?.find((item) => item.apiId === "getList");
      // api 参数交由requester自行处理
      const { response } = await requester(apiArguments || {});

      // 处理数据关系
      if (Array.isArray(response)) {
        response.forEach(responseItem => {
          // 在不改变原数据的结构下这里在原数据中设计一个展示数据用于数据展示
          const display: {[keys: string]: any} = {};
          // getArgumentsItem会把数据从原数据中整合出结果
          if (itemCover) display.cover = getArgumentsItem(itemCover, responseItem);
          if (itemTitle) display.title = getArgumentsItem(itemTitle, responseItem);
          if (itemSubTitle) display.subtitle = getArgumentsItem(itemSubTitle, responseItem);
          if (itemContent)display.content = getArgumentsItem(itemContent, responseItem);
          responseItem.display = display;
        })
        
        data = response;
        setList([...(list || []), ...data]);
      }
    },
    [api, itemRuleList, list],
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


  const publishActivatedToRuntime = useCallback(
    (tag: ArgumentsItem) => {
      const argTag = getArgumentsItem(tag) as string;
      if (activite !== undefined && argTag && list) {
        setRunningTimes({
          [argTag]: list[activite]
        })
      }
    },
    [activite, list, setRunningTimes],
  )

  eventEmitterRef.current = useLifeCycle(
    moduleId,
    // 操作
    {
      mount: "初始化",
      unmount: "卸载",
      cancel: "取消/关闭",
      clickItem: "点击(文字部分)",
      clickA: "点击(按钮A)",
      clickB: "点击(按钮B)",
      clickC: "点击(按钮C)"
    },
    // 被操作
    { config, itemConfig, buttonConfig, show, hide, getList, publishActivatedToRuntime }
  );

  

  const handleClick = useCallback(
    (index: number, tag: 'buttonA' | 'buttonB' | 'buttonC' | 'buttonItem') => async () => {
      setActivite(index);
      // 做数据延时等待
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        });
      })
      switch (tag) {
        case 'buttonA':
          eventEmitterRef.current?.[0].clickA();
          break;
        case 'buttonB':
          eventEmitterRef.current?.[0].clickB();
          break;
        case 'buttonC':
          eventEmitterRef.current?.[0].clickC();
          break;
        case 'buttonItem':
          eventEmitterRef.current?.[0].clickItem();
          break;
        default:
          break;
      }
    },
    [],
  )

  useEffect(() => {
    if (editingId === moduleId && !visible) {
      show();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId, moduleId, show, currentEditorStylePath])

  const renderButton = useCallback(
    (rule, data, onClick) => {
      if (rule) {
        const value = getArgumentsItem(rule, data) as AnyObjectType;
        if (value?.show === '1') return <button onClick={onClick}>{value?.name}</button>
      }
      return null;
    },
    [],
  )

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
                <PullToRefresh
                  disablePullDown
                  onPullUp={getList}
                >
                  <ul className={classNames(s.articlelist, s.listwrap)}>
                    {list ?  (list.length ? list.map((item, index) => {
                      const {cover, title, subtitle, content} = item?.display|| {};
                      return <li key={index}>
                      {cover ? <div className={s.cover}><img src={cover} alt={cover} /></div> : null}
                      <div className={s.item}>
                        <div onClick={handleClick(index, 'buttonItem')}>
                          {title ? <h3 className={s.itemtitle}>{title}</h3> : null}
                          {subtitle ? <h4 className={s.itemsubtitle}>{subtitle}</h4> : null}
                          {content ? <p className={s.iteminfo}>{content}</p> : null}
                        </div>
                        <div className={s.buttons}>
                          {renderButton(buttonRuleA, item, handleClick(index, 'buttonA'))}
                          {renderButton(buttonRuleB, item, handleClick(index, 'buttonB'))}
                          {renderButton(buttonRuleC, item, handleClick(index, 'buttonC'))}
                        </div>
                      </div>
                    </li>
                    }) : <li className={classNames(s.nodate)}>暂无数据</li>) : null}
                  </ul>
                </PullToRefresh>
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
