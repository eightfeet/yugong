import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import requester from "~/core/fetch";
import EventEmitter from "~/core/EventEmitter";
import {
  AnyObjectType,
  AppDataElementsTypes,
  ArgumentsBoolean,
  ArgumentsNumber,
  ArgumentsString,
} from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import useGame from "~/hooks/useGame";
import useStyles from "./Roulette.useStyles";
import s from "./Roulette.module.less";
import * as mock from "./mockData";
import classNames from "classnames";
import Backgrounp from "./Backgroup";
import config from "./Roulette.config";
import useLifeCycle from "~/hooks/useLifeCycle";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { debounce } from "lodash";
import { setClass } from "./helper";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import message from "~/components/Message";
import Record from "./Record";

export interface RouletteProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

interface PrizeTypes {
  prizeId: number; // 奖品id
  prizeType: number; // 奖品类型 0 未中奖, 1 实物, 2 虚拟
  receiveType?: number; // 领取方式 1：默认；2：填写地址；3：链接类；4：虚拟卡
  prizeAlias?: string; // 奖品别名
  prizeName: string; // 奖品名称
  awardMsg?: string; // 中奖提示信息
  gameImg?: string; // 游戏图片
  prizeImg: string; // 奖品图片
  memo?: string; // 奖品备注
}

const Roulette: Modules<RouletteProps> = (props) => {
  const { moduleId, style } = props;
  const { currentEditorStylePath } = useSelector(
    (state: RootState) => state.controller
  );

  const [prizes, setPrizes] = useState<PrizeTypes[]>([]);
  const [phoneAndRCardId, setPhoneAndRCardId] = useState<AnyObjectType>();
  const [receiverInfo, setReceiverInfo] = useState<AnyObjectType>(
    mock.receiverInfo
  );
  const [successmodalParams, setSuccessmodalParams] = useState<AnyObjectType>(
    {}
  );

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

  // 页面api
  const { api } = props;

  // 皮肤设置样式
  const MId = `gametarget${moduleId}`;
  const userClass = useStyles(MId)(style);

  // ===========================================组件Api============================================

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
    async (data) => {
      // 这里不需要api设置参数
      const apiArguments = api?.find((item) => item.apiId === "saveAddress");
      // 获取抽奖结果数据， 将结果数据中转到全局数据中
      if (apiArguments) {
        apiArguments.body = [
          { type: "object", fieldName: "addressData", data },
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

  // ===========================================组件方法============================================
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

  // ==============================================end=============================================
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
      let currentPrize = settedApi.response;
      prizes.some((prize) => {
        if (prize.prizeId === currentPrize.prizeId) {
          currentPrize = {
            ...currentPrize,
            ...(prize || {}),
          };
          return true;
        }
        return false;
      });

      return currentPrize;
    }

    // 没有设置Api时启用mock数据
    if (!settedApi) {
      message.warning("活动奖品或抽奖Api未设置正确, 当前使用模拟抽奖！");
      const winnerInfo = prizes[Math.floor(Math.random() * prizes.length - 1)];
      return winnerInfo;
    }
  }, [apiBeforeStart, apiStart, checked, prizes, setDelayStart]);

  const gamePrames = useMemo(
    () => ({
      targetId: MId,
      parentId: `game${props.moduleId}`,
      playerPhone: phoneAndRCardId?.phone,
      successModalTitle: successmodalParams.title || "恭喜您，获得",
      SuccessModalAnimation: {
        form: successmodalParams.animation || "flipInY",
      },
      cardIdRequest: phoneAndRCardId?.cardIdRequest, // 填写收货地址时是否验证身份证: this.cardIdRequest = 1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
      style: mock.initStyle,
      start: startLottery,
      saveAddress: apiSaveAddress,
      receiverInfo,
      checkVerificationCode, // 检查手机验证码
      prizes,
      onCancel: dispatchEventRef.current?.onCancel,
      onEnsure: dispatchEventRef.current?.onEnsure,
      onShowSuccess: () => {
        setClass(`${MId}_successmodal`, userClass.successModal);
        dispatchEventRef.current?.onShowSuccess();
      },
      onShowFailed: () => {
        setClass(`${MId}_failedmodal`, userClass.failedModal);
        dispatchEventRef.current?.onShowFailed();
      },
      onShowAddress: () => {
        setClass(`${MId}_addressmodal`, userClass.addressModal);
        dispatchEventRef.current?.onShowAddress();
      },
    }),
    [
      MId,
      checkVerificationCode,
      phoneAndRCardId?.cardIdRequest,
      phoneAndRCardId?.phone,
      prizes,
      props.moduleId,
      receiverInfo,
      apiSaveAddress,
      startLottery,
      successmodalParams.animation,
      successmodalParams.title,
      userClass.addressModal,
      userClass.failedModal,
      userClass.successModal,
    ]
  );

  /**
   * 创建游戏
   */
  const [game, nodes] = useGame(gamePrames);

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
      console.log(game.core.AddressModal);

      game.core.AddressModal.updateParams(parames);
      setReceiverInfo(parames);
    },
    [game]
  );

  /**
   * 抽奖方法
   */
  const lottery = useCallback(() => {
    game?.core.lottery();
  }, [game]);

  const showRecord = useCallback(() => {
    game?.core.handleSaveAddress(
      (res: any) => {
        console.log("地址数据及", res);
      },
      () => {}
    );
    setClass(`${MId}_addressmodal`, userClass.addressModal);
  }, [MId, game?.core, userClass.addressModal]);

  /**
   * 编辑弹窗样式时可视化弹窗
   * 做高频编辑防抖处理
   */
  const onChangeDebounce = useMemo(
    () =>
      debounce(() => {
        if (game && currentEditorStylePath?.length) {
          const path = currentEditorStylePath?.map((item) => item.value);
          if (path.includes("successcontainer")) {
            game.core.showSuccessModal(mock.prizes[0]);
          }
          if (path.includes("failedcontainer")) {
            game.core.showFailedModal(mock.prizes[1]);
          }
          if (path.includes("addressmodalcontainer")) {
            game.core.showAddressModal();
          }
        }
      }, 1000),
    [currentEditorStylePath, game]
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
      setRunningPrizes,
      lottery,
      checkedLottery,
      useConfig,
      setDefaultReceiveInfo,
      setSuccessModal,
    },
    api?.find((item) => item.apiId === "init")
  );
  // ref存储
  dispatchEventRef.current = dispatchEvent;

  const [visibleRecord, setVisibleRecord] = useState(true);
    
  return (
    <>
      <Wrapper {...props}>
        <div
          className={classNames(s.root, s.bag, userClass.wrap)}
          id={`game${props.moduleId}`}
          style={{ visibility: !!prizes?.length ? "visible" : "hidden" }}
          ref={nodes}
        >
          <div className={classNames(s.root, s.bgwrap, `${MId}_light`)}>
            <Backgrounp />
          </div>
        </div>
        <Record
            visible={visibleRecord} 
            classNameGroup={{
                content: userClass.recordModalContent,
                close: userClass.recordModalClose,
            }}
            onClose={() => setVisibleRecord(false)} 
        />
      </Wrapper>
      <div style={{ width: "200px" }} onClick={() => setVisibleRecord(true)}>
        中奖记录
      </div>
    </>
  );
};

// bind static
for (const key in config) {
  if (Object.prototype.hasOwnProperty.call(config, key)) {
    Roulette[key] = config[key];
  }
}

export default Roulette;
