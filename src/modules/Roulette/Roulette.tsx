import { useCallback, useEffect, useMemo, useState } from "react";
import requester from "~/core/fetch";
import EventEmitter from "~/core/EventEmitter";
import {
  AnyObjectType,
  AppDataElementsTypes,
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
  const [prizesIsReady , setPrizesIsReady] = useState<boolean>();

  const { api } = props;

  const MId = `gametarget${moduleId}`;
  const userClass = useStyles(MId)(style);

  /**
   * 设置奖品数据
   */
  const setRunningPrizes = useCallback(
    (prizes) => {
      const prizesArg = getArgumentsItem(prizes) as any[];
      if (Array.isArray(prizesArg) && prizesArg.length) {
        setPrizes(prizesArg);
        setPrizesIsReady(true);
      } else {
        setPrizes(mock.prizes);
      }
    },
    [],
  )

  /**
   * 开始抽奖
   * */
  const startLottery = useCallback(() => {
    const apiArguments = api?.find((item) => item.apiId === "lottery");
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments && apiArguments.url && apiArguments.method) {
      return requester(apiArguments || {}, true);
    }
    // 数据转换为下游中奖信息
    message.warning("活动奖品或抽奖Api未设置正确, 当前使用模拟抽奖！");
    const winnerInfo = prizes[Math.floor(Math.random() * prizes.length - 1)];
    winnerInfo.receiveType = 2;
    return winnerInfo;
  }, [api, prizes]);

  /**
   * 保存地址
   * */
  const saveAddress = useCallback(async (data) => {
    // 这里不需要api设置参数
    const apiArguments = api?.find((item) => item.apiId === "saveAddress");
    // 获取抽奖结果数据， 将结果数据中转到全局数据中
    if (apiArguments) {
      apiArguments.body = [
          { type: 'object', fieldName: 'addressData', data },
      ];
      return requester(apiArguments || {}, true);
    }
    // 处理收货地址
    message.warning("没有设置保存地址Api, 当前不可保存！");
  }, [api]);

  /**
   * 检查手机验证码
   * */
  const checkVerificationCode = useCallback(async (data) => {
    // 处理收货地址
    console.log("验证码参数", data);
  }, []);

  const [phoneAndRCardId, setPhoneAndRCardId] = useState<AnyObjectType>();
  /**
   * 活动设置
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

  const [receiverInfo, setReceiverInfo] = useState<AnyObjectType>(
    mock.receiverInfo
  );
  /**
   * 设置收货人信息
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
      argRegionName = argRegionName.replace(/，/g, ",").split(",");
      argRegion = argRegion.replace(/，/g, ",").split(",");
      setReceiverInfo({
        receiverPhone: argReceiverPhone,
        regionName: argRegionName,
        address: argAddress,
        region: argRegion,
        idCard: argIdCard,
      });
    },
    []
  );

  const [successmodalParams, setSuccessmodalParams] = useState<AnyObjectType>(
    {}
  );
  /**
   * 设置弹窗信息
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
   * 创建游戏
   */
  const [game, nodes] = useGame({
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
    saveAddress,
    receiverInfo,
    checkVerificationCode, // 检查手机验证码
    prizes,
    onCancel: () => dispatchEvent.onCancel(),
    onEnsure: () => dispatchEvent.onEnsure(),
    onShowSuccess: () => {
      setClass(`${MId}_successmodal`, userClass.successModal);
      dispatchEvent.onShowSuccess();
    },
    onShowFailed: () => {
      setClass(`${MId}_failedmodal`, userClass.failedModal);
      dispatchEvent.onShowFailed();
    },
    onShowAddress: () => {
      setClass(`${MId}_addressmodal`, userClass.addressModal);
      dispatchEvent.onShowAddress();
    },
  });

  const lottery = useCallback(() => {
    game?.core.lottery();
  }, [game]);

  /**
   * 高频编辑防抖处理
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

  const [dispatchEvent] = useLifeCycle(
    moduleId,
    {
      mount: "初始化",
      unmount: "卸载",
      onCancel: "放弃中奖/关闭弹窗",
      onEnsure: "确认中奖结果",
      onShowSuccess: "显示中奖",
      onShowFailed: "显示未中奖",
      onShowAddress: "显示地址",
    },
    {
      setRunningPrizes,
      lottery,
      useConfig,
      setDefaultReceiveInfo,
      setSuccessModal,
    }
  );

  // API请求 注意依赖关系
  useEffect(() => {
    if (api?.length) {
      const apiArguments = api?.find((item) => item.apiId === "init");
      requester(apiArguments || {});
    }
  }, [api]);

  return (
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
    </Wrapper>
  );
};

// bind static
for (const key in config) {
  if (Object.prototype.hasOwnProperty.call(config, key)) {
    Roulette[key] = config[key];
  }
}

export default Roulette;
