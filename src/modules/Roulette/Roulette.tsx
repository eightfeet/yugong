import { useEffect } from "react";
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
import styleDescription from "./styleDescription.json";

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
  const MId = `gametarget${moduleId}`;
  const userClass = useStyles(MId)(style);
  const [game, nodes] = useGame({
    targetId: `gametarget${props.id}`,
    parentId: `game${props.id}`,
    playerPhone: "13635219421",
    successModalTitle: "恭喜您，获得",
    SuccessModalAnimation: {
      form: "flipInY",
    },
    cardIdRequest: 3, // 填写收货地址时是否验证身份证: this.cardIdRequest = 1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
    style: {},
    start: start1,
    saveAddress: saveAddress,
    receiverInfo: receiverInfo,
    checkVerificationCode: checkVerificationCode, // 检查手机验证码
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
    loading: {
      size: 20,
      length: 5,
      // verticesColor: ['red', 'green', 'blue', 'yellow', 'orange'],
      cycleTime: 1,
    },
  });
  const { eventEmitter, events = {}, api } = props;
  // API请求 注意依赖关系
  useEffect(() => {
    const apiArguments = api?.find((item) => item.apiId === "");
    requester(apiArguments || {});
  }, [api]);
  // 基本事件
  useEffect(() => {
    // 执行挂载事件
    eventEmitter.emit(events.mount);
    return () => {
      // 执行卸载事件
      eventEmitter.emit(events.unmount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper {...props}>
      <div
        className={classNames(s.root, s.bag, 3333, userClass.wrap)}
        id={`game${props.id}`}
        ref={nodes}
      >
        <div className={classNames(s.root, s.bgwrap, `${MId}_light`)}>
          <Backgrounp />
        </div>
      </div>
    </Wrapper>
  );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Roulette.exposeFunctions = [];

/**
 * 发布事件的静态描述
 */
Roulette.exposeEvents = [
  {
    name: "mount",
    description: "初始化",
  },
  {
    name: "unmount",
    description: "卸载",
  },
];

/**
 * 发布默认porps
 */
Roulette.exposeDefaultProps = {
  style: {
    basic: {
      display: {
        overflow: "visible",
      },
    },
    wrap: {
      display: {
        overflow: "visible",
        width: [250, ''],
        height: [250, ''],
      },
    },
    light: {
      backgroundCommon: {
        backgroundColor: "inherit",
      },
      font: {
        color: "rgba(243, 64, 8, 1)",
      },
      textShadow: [],
      boxShadow: [],
    },
    wheel: {
      backgroundCommon: {
        backgroundColor: "rgba(255, 178, 0, 1)",
      },
      border: {
        radiusTopLeft: [1000, ''],
        radiusTopRight: [1000, ''],
        radiusBottomLeft: [1000, ''],
        radiusBottomRight: [1000, ''],
        borderPosition: {
          borderTop: false,
          borderRight: false,
          borderBottom: false,
          borderLeft: false,
          border: true,
        },
        borderStyle: "none",
      },
      boxShadow: [
        {
          inset: true,
          spread: [2, ''],
          blur: [15, ''],
          color: "rgba(255, 87, 34, 1 )",
        },
        {
          color: "rgba(255, 152, 0, 1 )",
          inset: true,
          blur: [20, ''],
          spread: [20, ''],
        },
      ],
      backgroundGradient: {
        gradient: [
          {
            color: "rgba(255, 87, 34, 1)",
            transition: 45,
          },
          {
            color: "rgba(255, 235, 59, 1)",
            transition: 100,
          },
        ],
        gradientDirections: "center",
      },
      display: {
        overflow: "visible",
        display: "block",
      },
    },
    divide: {
      border: {
        borderColor: "rgba(44, 9, 218, 1)",
        borderStyle: "hidden",
        borderPosition: {
          borderTop: false,
          borderRight: false,
          borderBottom: false,
          borderLeft: false,
          border: false,
        },
      },
      backgroundCommon: {
        backgroundColor: "rgba(255, 255, 255, 0.18)",
      },
      display: {
        width: [1, '']
      },
      boxShadow: [],
    },
    prizealias: {
      font: {
        color: "rgba(255, 255, 255, 1)",
      },
      display: {
        margin: [[-5, ''], null, null, null],
      },
    },
    lotterybutton: {
      backgroundCommon: {
        backgroundColor: "rgba(162, 162, 162, 0.61)",
        imageUrl:
          "https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0510222608604.png",
        sizeX: [80, ''],
        sizeY: [80, ''],
        repeat: "no-repeat",
        positionX: [50, ''],
        positionY: [50, ''],
      },
      border: {
        radiusTopLeft: [100, ''],
        radiusTopRight: [100, ''],
        radiusBottomLeft: [100, ''],
        radiusBottomRight: [100, ''],
      },
      display: {
        width: [80, ''],
        height: [80, ''],
        position: "absolute",
        left: [124, ''],
      },
      boxShadow: [
        {
          color: "rgba(196, 55, 10, 0.53 )",
          spread: [2,''],
          blur: [1, ''],
        },
        {
          color: "rgba(170, 41, 0, 0.65 )",
          spread: [2,''],
          blur: [8, ''],
        },
      ],
    },
    needle: {
      backgroundCommon: {
        backgroundColor: "rgba(61, 23, 244, 0)",
        imageUrl:
          "https://yyjzx.blob.core.chinacloudapi.cn/upload-test/images/0510225817739.png",
        sizeX: [120, ''],
        repeat: "no-repeat",
        positionX: [50, ''],
        positionY: [50, ''],
      },
      border: {},
      display: {
        width: [120, ''],
        height: [230, ''],
        position: "absolute",
        padding: [null, null, null, null],
        left: [65, ''],
        margin: [[0, ''], [0, ''], [0, ''], [0, '']],
        top: [0, ''],
      },
    },
    gameImg: {
      display: {
        margin: [[-10, ''], null, null, null],
      },
      border: {
        radiusTopLeft: [300,''],
        radiusTopRight: [300,''],
        radiusBottomLeft: [300,''],
        radiusBottomRight: [300,''],
        borderColor: "rgba(178, 70, 36, 1)",
      },
      backgroundCommon: {
        backgroundColor: "inherit",
      },
    },
    successclose: {
      display: {
        width: [10, ''],
        height: [10, ''],
      },
    },
    successoverlay: {},
    successcontainer: {},
    successcontent: {},
    successheader: {},
    successarticle: {},
    successok: {},
    successokdisabled: {},
    successcancel: {},
    successcanceldisabled: {},
    successmodify1: {},
    successmodify2: {},
    successmodify3: {},
    successmodify4: {},
  },
  styleDescription,
};

/**
 * 发布默认Api
 */
Roulette.exposeApi = [];

export default Roulette;
