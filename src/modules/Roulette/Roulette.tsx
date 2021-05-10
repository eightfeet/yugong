import { useEffect } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import useGame from '~/hooks/useGame';
import useStyles from './Roulette.useStyles';
import s from './Roulette.module.less';
import prizes1 from './mockData.json';
import classNames from 'classnames';
import Backgrounp from './Backgroup';
import styleDescription from './styleDescription.json';

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
            console.log('data', data);
            console.log('saveAddress');
            resolve();
        }, 3000);
    }).catch((err) => {
        console.log('处理', err);
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
    idCard: '430522201008124611',
    receiverPhone: '13622841234',
    address: 'address',
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
        playerPhone: '13635219421',
        successModalTitle: '恭喜您，获得',
        SuccessModalAnimation: {
            form: 'flipInY',
        },
        cardIdRequest: 3, // 填写收货地址时是否验证身份证: this.cardIdRequest = 1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
        style: {},
        start: start1,
        saveAddress: saveAddress,
        receiverInfo: receiverInfo,
        checkVerificationCode: checkVerificationCode, // 检查手机验证码
        prizes: prizes1,
        onCancel: () => console.log('放弃1'),
        onEnsure: function (prize: any) {
            console.log('确定中奖结果1！', prize);
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
        const apiArguments = api?.find((item) => item.apiId === '');
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
                className={classNames(s.root, s.bag, userClass.wrap)}
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
        name: 'mount',
        description: '初始化',
    },
    {
        name: 'unmount',
        description: '卸载',
    },
];

/**
 * 发布默认porps
 */
Roulette.exposeDefaultProps = {
    style: {
        basic: {},
        wrap: {},
        light: {},
        wheel: {},
        divide: {},
        prizealias: {},
        lotterybutton: {
            backgroundCommon: {
                backgroundColor: 'rgba(162, 162, 162, 0.61)',
            },
            border: {
                radiusTopLeft: 100,
                radiusTopRight: 100,
                radiusBottomLeft: 100,
                radiusBottomRight: 100,
            },
        },
        needle: {
            backgroundCommon: { backgroundColor: 'rgba(0, 0, 0, 0.22)' },
            border: {
                radiusTopLeft: 100,
                radiusTopRight: 100,
                radiusBottomLeft: 100,
                radiusBottomRight: 100,
            },
        },
        gameImg: {},

        successclose: { display: { width: 10, height: 10 } },
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
