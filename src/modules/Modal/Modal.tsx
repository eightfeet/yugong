import { useCallback, useEffect, useMemo, useState } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
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

export interface ModalProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
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
    const { eventEmitter, events = {}, api, moduleId, style } = props;
    const [useParams, setUserParams] = useState<UseParams>();

    const MId = `MD${moduleId}`;
    const params = buildParams({
        id: MId,
        animationType: 'zoomIn',
        animationDuration: '0.2ms',
        closable: true,
        shouldCloseOnOverlayClick: true,
        ...(useParams || {}),
        onCancel: () => {
            eventEmitter.emit(events.onCancel);
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
                shouldCloseOnOverlayClick: argshouldCloseOnOverlayClick as boolean,
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

            const footer = btnNodeOk || btnNodeCancel
            ? `<div>${btnNodeOk || ''}${btnNodeCancel || ''}</div>`
            : undefined;
            
            createModal({
                header,
                article,
                footer,
            }).then(() => {
                // 关闭图标
                if (params.closable) {
                    const closeIconNode = document.querySelector(`.${MId}_close`);
                    ReactDOM.render(
                        <IconCancel />,
                        closeIconNode
                      );
                }
                // 确定按钮
                if (isOk) {
                    const okNode = document.getElementById(`${MId}_ok`);
                    if (isOkDisabled) {
                        okNode?.setAttribute('disabled', 'disabled')
                    }
                    okNode!.onclick = async () => {
                        // 确定api
                        const apiArguments = api?.find((item) => item.apiId === "onOkApi");
                        if (apiArguments) await requester(apiArguments);
                        // onOk
                        await eventEmitter.emit(events.onOk);
                        hideModal(false);
                    };
                }
                // 取消按钮
                if (isCancel) {
                    const cancelNode = document.getElementById(`${MId}_cancel`);
                    if (isCancelDisabled) {
                        cancelNode?.setAttribute('disabled', 'disabled')
                    }
                    cancelNode!.onclick = async () => {
                        // 取消api
                        const apiArguments = api?.find((item) => item.apiId === "onCancelApi");
                        if (apiArguments) await requester(apiArguments);
                        // onCancel
                        hideModal(false);
                        eventEmitter.emit(events.onCancel);
                    };
                }
            });
            const rootDom = document.getElementById(MId);
            if (rootDom && modal) {
                rootDom.className = `${s.modalinit} ${userClass.root}`;
            }
        },
        [MId, api, btnstate, createModal, eventEmitter, events.onCancel, events.onOk, hideModal, modal, params.closable, userClass.root]
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

    // 向eventEmitter注册事件，向外公布
    useMemo(() => {
        eventEmitter.addEventListener('setOnOff', setOnOff);
        eventEmitter.addEventListener('setAnimation', setAnimation);
        eventEmitter.addEventListener('createModal', show);
        eventEmitter.addEventListener('hideModal', hideModal);
        eventEmitter.addEventListener('setButton', setButton);
    }, [eventEmitter, show, hideModal, setOnOff, setAnimation, setButton]);

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
    return <Wrapper {...props} maxHeight maxWidth />;
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Modal.exposeFunctions = [
    {
        name: 'setOnOff',
        description: '设置开关',
        arguments: [
            {
                type: 'boolean',
                name: '是否可关闭',
                describe: '控制弹窗有无关闭按钮',
                data: {
                    comparableAverageA: '0',
                    comparableAverageB: '0',
                    method: '===',
                },
                fieldName: 'closable',
            },
            {
                type: 'boolean',
                name: '点击背景可关闭',
                describe: '点击蒙层背景关闭弹窗',
                data: {
                    comparableAverageA: '0',
                    comparableAverageB: '1',
                    method: '===',
                },
                fieldName: 'shouldCloseOnOverlayClick',
            },
        ],
    },
    {
        name: 'setButton',
        description: '设置按钮',
        arguments: [
            {
                type: 'boolean',
                name: '显示确认按钮',
                describe: '条件成立显示确认按钮',
                data: {
                    comparableAverageA: '0',
                    comparableAverageB: '0',
                    method: '===',
                },
                fieldName: 'isOk',
            },
            {
                type: 'boolean',
                name: '禁用确认按钮',
                describe: '条件成立禁用确认按钮',
                data: {
                    comparableAverageA: '0',
                    comparableAverageB: '1',
                    method: '===',
                },
                fieldName: 'isOkDisabled',
            },
            {
                type: 'boolean',
                name: '显示取消按钮',
                describe: '条件成立显示取消按钮',
                data: {
                    comparableAverageA: '0',
                    comparableAverageB: '1',
                    method: '===',
                },
                fieldName: 'isCancel',
            },
            {
                type: 'boolean',
                name: '禁用取消按钮',
                describe: '条件成立禁用取消按钮',
                data: {
                    comparableAverageA: '0',
                    comparableAverageB: '1',
                    method: '===',
                },
                fieldName: 'isCancelDisabled',
            },
            {
                type: 'object',
                name: '按钮文字',
                describe: '设置按钮文字',
                data: {
                    okText: '确定',
                    cancelText: '取消',
                },
                fieldName: 'buttontext',
            },
        ],
    },
    {
        name: 'setAnimation',
        description: '设置动画',
        arguments: [
            {
                type: 'string',
                name: '动画类型',
                describe:
                    '动画类型包含 "fadeInLeft" | "fadeInRight" | "fadeInDown" | "fadeInUp" | "zoomInLeft" | "zoomInRight" | "zoomInDown" | "zoomInUp" | "zoomIn" | "flipInX" | "flipInY"',
                data: '',
                fieldName: 'animationType',
            },
            {
                type: 'string',
                name: '动画时间',
                describe: '转场动画时长(默认0.2s)',
                data: '',
                fieldName: 'animationDuration',
            },
        ],
    },
    {
        name: 'createModal',
        description: '显示弹窗',
        arguments: [
            {
                type: 'object',
                name: '数据',
                describe: '对话框数据',
                html: 'innerhtml',
                data: {
                    header: '<h3>header</h3>',
                    article: '<p>内容</p>',
                },
                fieldName: 'modaldata',
            },
        ],
    },
    {
        name: 'hideModal',
        description: '隐藏弹窗',
    },
];

/**
 * 发布事件的静态描述
 */
Modal.exposeEvents = [
    {
        name: 'mount',
        description: '初始化',
    },
    {
        name: 'unmount',
        description: '卸载',
    },
    {
        name: 'onOk',
        description: '确认',
    },
    {
        name: 'onCancel',
        description: '取消/关闭',
    },
];

/**
 * 发布默认porps
 */
Modal.exposeDefaultProps = {
    layout: {
        w: 0,
        h: 0,
        x: 0,
        y: 0,
    },
    style: {
        basic: {},
        overlay: {},
        container: {},
        content: {},
        header: {},
        article: {},
        close: {
            display: {
                width: 10,
                height: 10,
            }
        },
        ok: {},
        okdisabled: {},
        cancel: {},
        canceldisabled: {},
        modify1: {},
        modify2: {},
        modify3: {},
        modify4: {},
    },
    styleDescription: {
        overlay: '覆盖层',
        container: '容器',
        content: '内容区',
        header: '头部',
        article: '文本区',
        close: '关闭图标',
        ok: '确认按钮',
        okdisabled: '确认禁用',
        cancel: '取消按钮',
        canceldisabled: '取消禁用',
        modify1: '修饰层',
        modify2: '修饰层',
        modify3: '修饰层',
        modify4: '修饰层',
    },
};

/**
 * 发布默认Api
 */
Modal.exposeApi = [{
    apiId: "onOkApi",
    name: "确定",
    description: "确认弹窗时可以调用api"
  },{
    apiId: "onCancelApi",
    name: "取消",
    description: "确认弹窗时可以调用api"
  }];

export default Modal;
