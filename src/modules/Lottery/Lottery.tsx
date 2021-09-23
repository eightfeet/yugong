import EventEmitter from "~/core/EventEmitter";
import {
  AnyObjectType,
  AppDataElementsTypes,
  ArgumentsArray,
  ArgumentsBoolean,
  ArgumentsItem,
  ArgumentsNumber,
  ArgumentsString,
} from "~/types/appData";
import { Modules } from "~/types/modules";
import config from "./Lottery.config";
import Wrapper from "../Wrapper";
import useLifeCycle from "~/hooks/useLifeCycle";
import useStyles from "./Lottery.useStyles";
import Game, { GameRecords, GameModal } from "~/components/Game";
import { GameHandle, GameMap } from "~/components/Game/useGame";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as mock from "./mockData";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import message from "~/components/Message";
import requester from "~/core/fetch";
import { Prize } from "@byhealth/lottery/dist/types/core";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { getPrizeById, setClass } from "./helper";
import { debounce } from "lodash";
import { gametypes } from "~/components/Game/Game";
import s from "./Lottery.module.less";
import { saveAddressParames } from "~/components/Game/GameType";

export interface RecordsType extends Prize {
  /**中奖id */
  id?: number | string;
  /**收货地址 */
  receiverAddress?: string;
  /**收货姓名 */
  receiverName?: string;
  /**收货电话 */
  receiverPhone?: string;
  /**中奖时间 */
  winTime?: string;
  [keys: string]: any;
}

export interface LotteryProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

const Lottery: Modules<LotteryProps> = (props) => {
  const { moduleId, style } = props;
  const { currentEditorStylePath } = useSelector(
    (state: RootState) => state.controller
  );

  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [phoneAndRCardId, setPhoneAndRCardId] = useState<AnyObjectType>();
  const [receiverInfo, setReceiverInfo] = useState<AnyObjectType>(
    mock.receiverInfo
  );
  const [successmodalParams, setSuccessmodalParams] = useState<AnyObjectType>(
    {}
  );

  const [type, setType] = useState<keyof GameMap>("redenvelope");
  const [displayRecord, setDisplayRecord] = useState<boolean>(false);
  const [displayRule, setDisplayRule] = useState<boolean>(false);
  const [ruleText, setRuleText] = useState<any[]>([]);
  const winInfo = useRef<Prize>();

  // 禁用抽奖
  const checked = useRef<{
    /**禁用信息 */
    message?: string;
    /**是否禁用 */
    enabled: boolean;
  }>({ enabled: true });

  // 确定数据是否准备就是，没有准备好时会启用模拟数据
  const prizesIsReadyRef = useRef<boolean>();
  // 此ref用于存储useLifeCycle组件暴露的事件
  const dispatchEventRef = useRef<{
    mount: () => void;
    unmount: () => void;
    onStart: () => void;
    onEnd: () => void;
    onCancel: () => void;
    onEnsure: () => void;
    onShowSuccess: () => void;
    onShowFailed: () => void;
    onShowAddress: () => void;
  }>();

  let gameHandle: GameHandle<typeof Game> | undefined = undefined;
  const setGameHandle = useCallback((ref) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    gameHandle = ref!;
  }, []);

  // 页面api
  const { api } = props;

  // 皮肤设置样式
  const MId = `gametarget${moduleId}_${type}`;
  
  const userClass = useStyles(MId)(style);

  /**保存地址 */
  const handleSaveAddress = useCallback(() => {
    console.log(95588, gameHandle?.game.current?.core.AddressModal);
    
    gameHandle?.game.current?.core.AddressModal.showModal((address) => {
      console.log(address);
    });
  }, [gameHandle]);

  // ===========================================组件Api============================================
  //#region
  /**
   * 抽奖前置Api, 用于检查是否满足抽奖条件
   * */
  const apiBeforeStart = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === "beforeStart");
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments && apiArguments.url && apiArguments.method) {
      try {
        return requester(apiArguments || {});
      } catch (error) {
        throw error;
      }
    }
  }, [api]);

  /**
   * 抽奖Api, 用于抽奖
   */
  const apiStart = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === "lottery");
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments && apiArguments.url && apiArguments.method) {
      return requester(apiArguments || {});
    }
  }, [api]);

  /**
   * 保存地址Api, 用于实物奖品保存地址信息
   */
  const apiSaveAddress = useCallback(
    async (data: saveAddressParames) => {
      const oprationData = {
        winId: "winInfo.current.id",
        ...data,
      };
      // 这里不需要api设置参数
      const apiArguments = api?.find((item) => item.apiId === "saveAddress");
      // 获取抽奖结果数据， 将结果数据中转到全局数据中
      if (apiArguments) {
        apiArguments.body = [
          { type: "object", fieldName: "addressData", data: oprationData },
        ];
        return requester(apiArguments || {});
      }
      // 处理收货地址
      message.warning("没有设置保存地址Api, 当前不可保存！");
    },
    [api]
  );

  /**
   * 检查手机验证码
   * */
  const checkVerificationCode = useCallback(
    async (data) => {
      // 这里不需要api设置参数
      const apiArguments = api?.find(
        (item) => item.apiId === "getVerificationCode"
      );
      // 获取抽奖结果数据， 将结果数据中转到全局数据中
      if (apiArguments) {
        apiArguments.body = [
          { type: "object", fieldName: "addressData", data },
        ];
        return requester(apiArguments || {});
      }
      // 处理收货地址

      message.warning("没有设置获取验证码Api！");
    },
    [api]
  );

  const apiGetRecord = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === "getRecord");
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments && apiArguments.url && apiArguments.method) {
      return requester(apiArguments || {});
    }
  }, [api]);

  //#endregion
  // ===========================================组件方法============================================ //
  //#region
  /**
   * 修改抽奖类型
   */
  const setGameType = useCallback((type: ArgumentsString) => {
    const argOptType = getArgumentsItem(type) as keyof GameMap;
    if (gametypes.includes(argOptType)) {
      setType(argOptType);
    }
  }, []);

  // 设置文本
  const setRules = useCallback((rules: ArgumentsItem) => {
    const rulesTexts = getArgumentsItem(rules) as any[];
    setRuleText(rulesTexts);
  }, []);

  /**
   * 设置奖品数据, 无数据时使用mock
   */
  const setRunningPrizes = useCallback((prizes) => {
    const prizesArg = getArgumentsItem(prizes) as any[];
    if (Array.isArray(prizesArg) && prizesArg.length) {
      setPrizes(prizesArg);
      prizesIsReadyRef.current = true;
    }
    // 没有准备过数据会使用mock数据
    if (!prizesIsReadyRef.current) {
      setPrizes(mock.prizes);
    }
  }, []);

  /**
   * 设置中奖记录
   */
  const [records, setRecords] = useState<RecordsType[]>(mock.records);
  const [disablePullDown, setDisablePullDown] = useState(false);
  const [disablePullUp, setDisablePullUp] = useState(false);
  const onSaveAddress = useCallback(
    (item) => () => {
      console.log(item);
      return handleSaveAddress();
    },
    [handleSaveAddress]
  );
  /**
   * 设置运行时中奖记录
   */
  const setRunningRecords = useCallback(
    (
      records: ArgumentsArray,
      disablePullDown: ArgumentsString,
      disablePullUp: ArgumentsString
    ) => {
      // 中奖记录
      const recordArg = getArgumentsItem(records) as any[];
      const disablePullDownArg = getArgumentsItem(disablePullDown) as string;
      const disablePullUpArg = getArgumentsItem(disablePullUp) as string;

      if (Array.isArray(recordArg) && recordArg.length) {
        setRecords(recordArg);
      }

      setDisablePullDown(disablePullDownArg === '0') ;
      setDisablePullUp(disablePullUpArg === '0');
    },
    []
  );
  /**
   * 渲染中奖记录
   */
  const renderRecords = useCallback(
    () =>
      records?.length ? (
        <ul className={s.recordwrap}>
          {records.map((item, index) => {
            return (
              <li key={index} className={s.recorditem}>
                <div className={s.prizeimg}>
                  <img src={item.prizeImg} alt={item.prizeName} />
                </div>
                <div className={s.recordstr}>
                  <div className={s.prizename}>{item.prizeName}</div>
                  <div className={s.timeandbutton}>
                    <div className={s.wintime}>{item.winTime}</div>
                    {item.receiveType === 2 && !item.receiverAddress ? (
                      <button onClick={onSaveAddress(item)}>填写地址</button>
                    ) : null}
                  </div>
                  {item.receiverAddress ? (
                    <div className={s.receiveraddress}>
                      收货地址:{item.receiverAddress}
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>暂无中奖记录</div>
      ),
    [onSaveAddress, records]
  );

  /**
   * 设置玩家基本信息
   * @param phone 设置玩家手机号码
   * @param cardIdRequest 设置领取奖品时是否需要填写身份证1 隐藏，2 验证，3 为空时不验证有填写时验证，4 不验证
   */
  const useConfig = useCallback(
    (phone: ArgumentsString, cardIdRequest: ArgumentsNumber) => {
      const argOptPhone = getArgumentsItem(phone);
      const argCardIdRequest = getArgumentsItem(cardIdRequest);
      setPhoneAndRCardId({
        phone: argOptPhone,
        cardIdRequest: argCardIdRequest,
      });
    },
    []
  );

  /**
   * 设置中奖弹窗
   * @param title 中奖弹窗标题
   * @param animation 中奖弹窗动画
   */
  const setSuccessModal = useCallback(
    (title: ArgumentsString, animation: ArgumentsString) => {
      setSuccessmodalParams({
        title: getArgumentsItem(title),
        animation: getArgumentsItem(animation),
      });
    },
    []
  );

  /**
   * 检查抽奖
   * @param
   */
  const checkedLottery = useCallback(
    (enabled: ArgumentsBoolean, message: ArgumentsString) => {
      const argEnabled = getArgumentsItem(enabled) as boolean;
      const argMessage = getArgumentsItem(message) as string;
      checked.current = {
        enabled: argEnabled,
        message: argMessage,
      };
    },
    []
  );
  // hank 等待
  const setDelayStart = useCallback(
    () =>
      new Promise((res) =>
        setTimeout(() => {
          dispatchEventRef.current?.onStart();
          res(null);
        })
      ),
    []
  );

  /**
   * 开始抽奖
   * */
  const startLottery = useCallback(async () => {
    // step1、执行前置api 用于抽奖前检查是否满足抽奖条件
    await apiBeforeStart();

    // step2 执行抽奖事件
    await setDelayStart();
    // step3、检查状态是否可以抽奖
    if (!checked.current.enabled) {
      console.log("没有权限，请勿抽奖！");
      message.error(checked.current?.message || "暂无抽奖权限！");
      throw checked.current?.message;
    }

    // step4、返回抽奖接口
    const settedApi = (await apiStart()) as AnyObjectType;

    // step5、执行结束事件，可用于重置数据
    dispatchEventRef.current?.onEnd();
    if (settedApi?.response?.prizeId !== undefined) {
      let currentPrize = getPrizeById(settedApi.response.prizeId, prizes);
      // 回填当前操作奖品
      winInfo.current = currentPrize;
      return currentPrize;
    }

    // 没有设置Api时启用mock数据
    if (!settedApi) {
      message.warning("活动奖品或抽奖Api未设置正确, 当前使用模拟抽奖！");
      const winData = prizes[Math.floor(Math.random() * prizes.length - 1)];
      // 回填当前操作奖品
      winInfo.current = winData;
      return winData;
    }
  }, [apiBeforeStart, apiStart, checked, prizes, setDelayStart]);

  /**
   * 设置默认实物奖品邮寄地址，用于地址填写时回填信息
   * @param receiverPhone 收货电话
   * @param regionName 收货姓名
   * @param region 收货人省市区
   * @param address 收货人详细地址
   * @param idCard 人身份证id
   */
  const setDefaultReceiveInfo = useCallback(
    (
      receiverPhone: ArgumentsString,
      regionName: ArgumentsString,
      region: ArgumentsString,
      address: ArgumentsString,
      idCard: ArgumentsString
    ) => {
      const argReceiverPhone = getArgumentsItem(receiverPhone);
      let argRegionName: any = getArgumentsItem(regionName);
      let argRegion: any = getArgumentsItem(region);
      const argAddress = getArgumentsItem(address);
      const argIdCard = getArgumentsItem(idCard);
      argRegionName = argRegionName
        ?.replace(/，/g, ",")
        ?.split(",")
        ?.filter(Boolean);
      argRegion = argRegion?.replace(/，/g, ",")?.split(",");
      const parames = {
        receiverPhone: argReceiverPhone,
        address: argAddress,
        region: argRegion,
        idCard: argIdCard,
      };

      if (!!argRegionName.length) {
        (parames as any).regionName = argRegionName;
      }
      gameHandle?.game.current?.core.AddressModal.updateParams(parames as any);
      setReceiverInfo(parames);
    },
    [gameHandle]
  );

  /**通过其他事件关联抽奖 */
  const lottery = useCallback(() => {
    gameHandle?.game.current?.core.lottery();
  }, [gameHandle]);

  /**显示中奖记录 */
  const showRecord = useCallback(async () => {
    await apiGetRecord()
    setDisplayRecord(true);
    setTimeout(() => setClass(`${MId}_records`, userClass.recordsModal), 100);
  }, [MId, apiGetRecord, userClass.recordsModal]);

  /**显示活动规则 */
  const showRules = useCallback(() => {
    setDisplayRule(true);
    setTimeout(() => setClass(`${MId}_rules`, userClass.rulesModal));
  }, [MId, userClass.rulesModal]);

  //#endregion
  //=========================================end=================================================//
  /**
   * 编辑弹窗样式时可视化弹窗
   * 做高频编辑防抖处理
   */
  const onChangeDebounce = useMemo(
    () =>
      debounce(() => {
        if (gameHandle?.game.current && currentEditorStylePath?.length) {
          const path = currentEditorStylePath?.map((item) => item.value);
          if (path.includes("successcontainer")) {
            gameHandle?.game.current?.core.showSuccessModal(prizes[0]);
          }
          if (path.includes("failedcontainer")) {
            gameHandle?.game.current?.core.showFailedModal(prizes[1]);
          }
          if (path.includes("addressmodalcontainer")) {
            gameHandle?.game.current?.core.showAddressModal();
          }
        }
      }, 1000),
    [currentEditorStylePath, gameHandle, prizes]
  );

  const editorShow = useCallback(() => {
    onChangeDebounce();
  }, [onChangeDebounce]);

  useEffect(() => {
    editorShow();
  }, [editorShow]);

  // lifeCycle
  const [dispatchEvent] = useLifeCycle(
    moduleId,
    {
      mount: "初始化",
      unmount: "卸载",
      onStart: "抽奖",
      onEnd: "抽奖结束",
      onCancel: "放弃中奖/关闭弹窗",
      onEnsure: "确认中奖结果",
      onShowSuccess: "显示中奖",
      onShowFailed: "显示未中奖",
      onShowAddress: "显示地址",
    },
    {
      setGameType,
      setRunningPrizes,
      setRules,
      setRunningRecords,
      lottery,
      checkedLottery,
      useConfig,
      setDefaultReceiveInfo,
      setSuccessModal,
      showRecord,
      showRules,
    },
    api?.find((item) => item.apiId === "init")
  );
  // ref存储
  dispatchEventRef.current = dispatchEvent;

  return (
    <Wrapper {...props}>
      <Game
        className={userClass.wrap}
        parentId={`${MId}_wrap`}
        targetId={MId}
        playerPhone={phoneAndRCardId?.phone}
        successModalTitle={successmodalParams.title || "恭喜您，获得"}
        successModalAnimation={{
          form: successmodalParams.animation || "flipInY",
        }}
        type={type}
        cardIdRequest={phoneAndRCardId?.cardIdRequest}
        ref={setGameHandle}
        start={startLottery}
        prizes={prizes}
        saveAddress={apiSaveAddress}
        receiverInfo={receiverInfo}
        onCancel={dispatchEventRef.current?.onCancel}
        onEnsure={dispatchEventRef.current?.onEnsure}
        checkVerificationCode={checkVerificationCode}
        onShowSuccess={() => {
          setClass(`${MId}_successmodal`, userClass.successModal);
          dispatchEventRef.current?.onShowSuccess();
        }}
        onShowFailed={() => {
          setClass(`${MId}_failedmodal`, userClass.failedModal);
          dispatchEventRef.current?.onShowFailed();
        }}
        onShowAddress={() => {
          setTimeout(() => setClass(`${MId}_addressmodal`, userClass.recordsModal), 100);
          dispatchEventRef.current?.onShowAddress();
        }}
      />
      <GameRecords
        id={`${MId}_records`}
        visible={displayRecord}
        onCancel={() => setDisplayRecord(false)}
        disablePullUp={disablePullUp}
        disablePullDown={disablePullDown}
        onPullDown={async () => console.log()}
        onPullUp={async () => console.log()}
      >
        {renderRecords()}
      </GameRecords>
      <GameModal
        id={`${MId}_rules`}
        visible={displayRule}
        title="<h3>活动规则</h3>"
        okText="返回抽奖"
        onOk={() => setDisplayRule(false)}
        onCancel={() => setDisplayRule(false)}
      >
        <ol className={s.rule}>
          {ruleText.map((item, key) => (
            <li key={key}>{item}</li>
          ))}
        </ol>
      </GameModal>
    </Wrapper>
  );
};

// bind static
for (const key in config) {
  if (Object.prototype.hasOwnProperty.call(config, key)) {
    Lottery[key] = config[key];
  }
}

export default Lottery;
