import { useCallback, useEffect, useMemo, useState } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import {
    AnyObjectType,
    AppDataElementsTypes,
    ArgumentsNumber,
    ArgumentsRunningTime,
    ArgumentsString,
} from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import useGame from '~/hooks/useGame';
import useStyles from './Roulette.useStyles';
import s from './Roulette.module.less';
import * as mock from './mockData';
import classNames from 'classnames';
import Backgrounp from './Backgroup';
import config from './Roulette.config';
import useLifeCycle from '~/hooks/useLifeCycle';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { debounce } from 'lodash';
import { setClass } from './helper';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';

export interface RouletteProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Roulette: Modules<RouletteProps> = (props) => {
    
    const { moduleId, style } = props;
    const { currentEditorStylePath } = useSelector(
        (state: RootState) => state.controller
    );

    const [prizes, setPrizes] = useState(mock.prizes);

    const MId = `gametarget${moduleId}`;
    const userClass = useStyles(MId)(style);

    /**
     * 设置奖品信息
     */
    const setRunningPrizes = useCallback(
        (prizes: ArgumentsRunningTime) => {
            const orgPrizes = getArgumentsItem(prizes) as any[];
            setPrizes(orgPrizes)
        },
        [],
    )

    /**
     * 开始抽奖
     * */
    const startLottery = useCallback(async () => {
        return prizes[Math.floor(Math.random() * 6)];
    }, [prizes]);

    /**
     * 保存地址
     * */
    const saveAddress = useCallback(async (data) => {
        // 处理收货地址
        console.log('收货地址参数', data);
    }, []);

    /**
     * 检查手机验证码
     * */
    const checkVerificationCode = useCallback(async (data) => {
        // 处理收货地址
        console.log('验证码参数', data);
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

    const [receiverInfo, setReceiverInfo] = useState<AnyObjectType>(mock.receiverInfo);
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
            argRegionName = argRegionName.replace(/，/g, ',').split(',');
            argRegion = argRegion.replace(/，/g, ',').split(',');
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

    const [successmodalParams, setSuccessmodalParams] = useState<AnyObjectType>({})
    /**
     * 设置弹窗信息 
     */
    const setSuccessModal = useCallback(
        (title: ArgumentsString, animation: ArgumentsString) => {
            setSuccessmodalParams({
                title: getArgumentsItem(title),
                animation: getArgumentsItem(animation)
            });
        },
        [],
    )


    /**
     * 创建游戏
     */
    const [game, nodes] = useGame({
        targetId: MId,
        parentId: `game${props.moduleId}`,
        playerPhone: phoneAndRCardId?.phone,
        successModalTitle: successmodalParams.title || '恭喜您，获得',
        SuccessModalAnimation: {
            form: successmodalParams.animation || 'flipInY',
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
                    const path = currentEditorStylePath?.map(
                        (item) => item.value
                    );
                    if (path.includes('successcontainer')) {
                        game.core.showSuccessModal(mock.prizes[0]);
                    }
                    if (path.includes('failedcontainer')) {
                        game.core.showFailedModal(mock.prizes[1]);
                    }
                    if (path.includes('addressmodalcontainer')) {
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
            mount: '初始化',
            unmount: '卸载',
            onCancel: '放弃中奖/关闭弹窗',
            onEnsure: '确认中奖结果',
            onShowSuccess: '显示中奖',
            onShowFailed: '显示未中奖',
            onShowAddress: '显示地址',
        },
        { lottery, useConfig, setDefaultReceiveInfo, setSuccessModal, setRunningPrizes }
    );

    const { api } = props;
    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find((item) => item.apiId === '');
        requester(apiArguments || {});
    }, [api]);

    return (
        <Wrapper {...props}>
            <div
                className={classNames(s.root, s.bag, userClass.wrap)}
                id={`game${props.moduleId}`}
                style={{visibility: !!prizes?.length ? 'visible' : 'hidden'}}
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
