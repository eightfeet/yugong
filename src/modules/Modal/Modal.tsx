import { useCallback, useEffect, useRef, useState } from 'react';
import requester from '~/core/fetch';
import { AnyObjectType, AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import useModal from '~/hooks/useModal';
import { buildParams } from './defaultParams';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import useStyles from './Module.useStyles';
import IconCancel from './IconCancel';
import s from './Modal.module.less';
import ReactDOM from 'react-dom';
import config from './Modal.config';
import useLifeCycle, { UseLifeCycleResult } from '~/hooks/useLifeCycle';

export interface ModalProps extends AppDataElementsTypes {
}

interface UseParams {
    animationType?:
        | 'fadeInLeft'
        | 'fadeInRight'
        | 'fadeInDown'
        | 'fadeInUp'
        | 'zoomInLeft'
        | 'zoomInRight'
        | 'zoomInDown'
        | 'zoomInUp'
        | 'zoomIn'
        | 'flipInX'
        | 'flipInY';
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
    const eventEmitterRef = useRef<UseLifeCycleResult<{ [keys in 'mount' | 'unmount' | 'onOk' | 'onCancel' ]: Function }>>();
    
    const MId = `MD${moduleId}`;
    // 定义注册方法
    // ===================================================================================
    const params = buildParams({
        id: MId,
        animationType: 'zoomIn',
        animationDuration: '0.2ms',
        closable: true,
        shouldCloseOnOverlayClick: true,
        ...(useParams || {}),
        onCancel: () => {
            eventEmitterRef.current?.[0].onCancel();
        },
    });

    const [btnstate, setbtnstate] = useState<Btnstate>({
        isOk: true,
        okText: '确定',
        isCancel: true,
        cancelText: '取消',
        isOkDisabled: false,
        isCancelDisabled: false,
    });

    // 创建模块
    const { createModal, hideModal, modal } = useModal(params);
    const userClass = useStyles(MId)(style);

    const setOnOff = useCallback(
        (closable, shouldCloseOnOverlayClick) => {
            const argclosable = getArgumentsItem(closable);
            const argshouldCloseOnOverlayClick = getArgumentsItem(
                shouldCloseOnOverlayClick
            );
            setUserParams({
                ...useParams,
                closable: argclosable as boolean,
                shouldCloseOnOverlayClick:
                    argshouldCloseOnOverlayClick as boolean,
            });
        },
        [useParams]
    );

    const setAnimation = useCallback(
        (animationType, animationDuration) => {
            const arganimationDuration = getArgumentsItem(animationDuration);
            const arganimationType = getArgumentsItem(animationType);
            setUserParams({
                ...useParams,
                animationDuration: arganimationDuration as string,
                animationType: arganimationType as UseParams['animationType'],
            });
        },
        [useParams]
    );

    const show = useCallback(
        (data) => {
            const { header, article } = getArgumentsItem(data) as AnyObjectType;
            const {
                isOk,
                okText,
                isCancel,
                cancelText,
                isCancelDisabled,
                isOkDisabled,
            } = btnstate;
            const btnNodeOk = isOk
                ? `<button class="${MId}_ok" id="${MId}_ok">${okText}</button>`
                : '';
            const btnNodeCancel = isCancel
                ? `<button class="${MId}_cancel" id="${MId}_cancel">${cancelText}</button>`
                : '';

            const footer =
                btnNodeOk || btnNodeCancel
                    ? `<div>${btnNodeOk || ''}${btnNodeCancel || ''}</div>`
                    : undefined;

            createModal({
                header,
                article,
                footer,
            }).then(() => {
                const rootNode = modal?.state.contentDom;
                if (!rootNode) {
                    return;
                }
                // 关闭图标
                if (params.closable) {
                    const closeIconNode = document.querySelector(
                        `.${MId}_close`
                    );
                    ReactDOM.render(<IconCancel />, closeIconNode);
                }
                // 确定按钮
                if (isOk) {
                    const okNode = document.getElementById(`${MId}_ok`);
                    if (isOkDisabled) {
                        okNode?.setAttribute('disabled', 'disabled');
                    }
                    okNode!.onclick = async () => {
                        // 确定api
                        const apiArguments = api?.find(
                            (item) => item.apiId === 'onOkApi'
                        );
                        if (apiArguments) await requester(apiArguments);
                        // onOk
                        await eventEmitterRef.current?.[0].onOk();
                        hideModal(false);
                    };
                }
                // 取消按钮
                if (isCancel) {
                    const cancelNode = document.getElementById(`${MId}_cancel`);
                    if (isCancelDisabled) {
                        cancelNode?.setAttribute('disabled', 'disabled');
                    }
                    cancelNode!.onclick = async () => {
                        // 取消api
                        const apiArguments = api?.find(
                            (item) => item.apiId === 'onCancelApi'
                        );
                        if (apiArguments) await requester(apiArguments);
                        // onCancel
                        hideModal(false);
                        eventEmitterRef.current?.[0].onCancel();
                    };
                }
            });
            const rootDom = document.getElementById(MId);
            if (rootDom && modal) {
                rootDom.className = `${s.modalinit} ${userClass.root}`;
            }
        },
        [MId, api, btnstate, createModal, hideModal, modal, params.closable, userClass.root]
    );

    const setButton = useCallback(
        (isOk, isOkDisabled, isCancel, isCancelDisabled, buttontext) => {
            const argIsOk = getArgumentsItem(isOk);
            const argIsOkDisabled = getArgumentsItem(isOkDisabled);
            const argIsCancel = getArgumentsItem(isCancel);
            const argIsCancelDisabled = getArgumentsItem(isCancelDisabled);

            const { okText, cancelText } = getArgumentsItem(buttontext) as any;
            setbtnstate({
                isOk: argIsOk as boolean,
                isOkDisabled: argIsOkDisabled as boolean,
                okText,
                isCancel: argIsCancel as boolean,
                isCancelDisabled: argIsCancelDisabled as boolean,
                cancelText,
            });
        },
        []
    );

    eventEmitterRef.current = useLifeCycle(
        moduleId,
        {
            mount: '初始化',
            unmount: '卸载',
            onOk: '确认',
            onCancel: '取消/关闭',
        },
        { setOnOff, setAnimation, createModal: show, hideModal, setButton }
    );

    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find((item) => item.apiId === '');
        requester(apiArguments || {});
    }, [api]);

    return <Wrapper {...props} maxHeight maxWidth />;
};

// bind static
for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        Modal[key] = config[key];
    }
}

export default Modal;
