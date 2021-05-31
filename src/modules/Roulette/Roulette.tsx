import { useCallback, useEffect, useMemo } from "react";
import requester from "~/core/fetch";
import EventEmitter from "~/core/EventEmitter";
import { AppDataElementsTypes } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import useGame from "~/hooks/useGame";
import useStyles from "./Roulette.useStyles";
import s from "./Roulette.module.less";
import prizes1 from "./mockData.json";
import classNames from "classnames";
import Backgrounp from "./Backgroup";
import config from "./Roulette.config";
import useLifeCycle from "~/hooks/useLifeCycle";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { debounce } from "lodash";


var start1 = function () {
  return new Promise(function (resolve) {
    window.setTimeout(function () {
      resolve(prizes1[3]);
    }, 1000);
  });
};

var saveAddress = function (data: any) {
  return new Promise<void>(function (resolve) {
    window.setTimeout(function () {
      console.log("data", data);
      console.log("saveAddress");
      resolve();
    }, 3000);
  }).catch((err) => {
    console.log("处理", err);
  });
};

var checkVerificationCode = function () {
  return new Promise<void>(function (resolve) {
    window.setTimeout(function () {
      resolve();
    }, 1000);
  });
};

var receiverInfo = {
  idCard: "430522201008124611",
  receiverPhone: "13622841234",
  address: "address",
};

export interface RouletteProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

const Roulette: Modules<RouletteProps> = (props) => {
  const { moduleId, style } = props;
  const currentEditorStylePath = useSelector((state:RootState) => state.controller.currentEditorStylePath);

  const MId = `gametarget${moduleId}`;
  const userClass = useStyles(MId)(style);
  const [game, nodes] = useGame({
    targetId: MId,
    parentId: `game${props.moduleId}`,
    playerPhone: "13635219421",
    successModalTitle: "恭喜您，获得",
    SuccessModalAnimation: {
      form: "flipInY",
    },
    cardIdRequest: 3, // 填写收货地址时是否验证身份证: this.cardIdRequest = 1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
    style: {
      SuccessModalTheme: {
        close: {

        },
        modify: [{
          color: 'transparent'
        }]
      },
    },
    start: start1,
    saveAddress: saveAddress,
    receiverInfo: receiverInfo,
    checkVerificationCode, // 检查手机验证码
    prizes: prizes1,
    onCancel: () => console.log("放弃1"),
    onEnsure: function (prize: any) {
      console.log("确定中奖结果1！", prize);
    },
    onShowSuccess: () => {
      const rootDom = document.getElementById(`${MId}_successmodal`);
      if (rootDom) {
        rootDom.className = userClass.successModal;
      }
    },
    onShowAddress: () => {
      const rootDom = document.getElementById(`${MId}_addressmodal`);
      if (rootDom) {
        rootDom.className = userClass.addressModal;
      }
    },
    loading: {
      size: 20,
      length: 5,
      // verticesColor: ['red', 'green', 'blue', 'yellow', 'orange'],
      cycleTime: 1,
    },
  });

  const lottery = useCallback(() => {
    game?.core.lottery();
  }, [game]);

  /**
     * 高频编辑防抖处理
     */
   const onChangeDebounce = useMemo(
    () => debounce(() => {
      if (game && currentEditorStylePath?.length) {
        const path = currentEditorStylePath?.map(item => item.value);
        if (path.includes('successcontainer')) {
          game.core.showSuccessModal(prizes1[0])
        }
        if (path.includes('addressmodalcontainer')) {
          game.core.showAddressModal()
        }
      }
    }, 1000),
    [currentEditorStylePath, game]
);

  const editorShow = useCallback(
    () => {
      onChangeDebounce()
    },
    [onChangeDebounce],
  )

  useEffect(() => {
    editorShow();
  }, [editorShow]);

  useLifeCycle(moduleId, { mount: "初始化", unmount: "卸载" }, { lottery });
  const { api } = props;
  // API请求 注意依赖关系
  useEffect(() => {
    const apiArguments = api?.find((item) => item.apiId === "");
    requester(apiArguments || {});
  }, [api]);

  return (
    <Wrapper {...props}>
      <div
        className={classNames(s.root, s.bag, userClass.wrap)}
        id={`game${props.moduleId}`}
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
