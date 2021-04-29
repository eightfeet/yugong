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
import s from './Modal.module.less';

export interface ModalProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

interface uerParams {
    animationType:
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
    animationDuration: string;
    closable: boolean;
    shouldCloseOnOverlayClick: boolean;
}

const Modal: Modules<ModalProps> = (props) => {
    const { eventEmitter, events = {}, api, moduleId, style } = props;
    const [uerParams, setUserParams] = useState<uerParams>();

    const MId = `MD${moduleId}`;
    const params = buildParams({
        id: MId,
        animationType: 'fadeInDown',
        animationDuration: '0.2ms',
        closable: true,
        shouldCloseOnOverlayClick: true,
        ...(uerParams || {}),
    });

    // 创建模块
    const { createModal, hideModal, modal } = useModal(params);
    const userClass = useStyles(MId)(style);

    const setModal = useCallback(
        (
            closable,
            shouldCloseOnOverlayClick,
            animationType,
            animationDuration
        ) => {
            const argclosable = getArgumentsItem(closable);
            const argshouldCloseOnOverlayClick = getArgumentsItem(shouldCloseOnOverlayClick);
            const arganimationDuration = getArgumentsItem(animationDuration);
            const arganimationType = getArgumentsItem(animationType);
            setUserParams({
                animationType: arganimationType as uerParams['animationType'],
                animationDuration: arganimationDuration as string,
                closable: argclosable as boolean,
                shouldCloseOnOverlayClick: argshouldCloseOnOverlayClick as boolean,
            });
        },
        []
    );

    const show = useCallback(
        (data) => {
            const { header, article } = getArgumentsItem(data) as AnyObjectType;
            createModal({
                header,
                article,
            });
            const rootDom = document.getElementById(MId);
            if (rootDom && modal) {
                rootDom.className = `${s.modalinit} ${userClass.root}`;
            }
        },
        [MId, createModal, modal, userClass.root]
    );

    // 向eventEmitter注册事件，向外公布
    useMemo(() => {
        eventEmitter.addEventListener('setModal', setModal);
        eventEmitter.addEventListener('createModal', show);
        eventEmitter.addEventListener('hideModal', hideModal);
    }, [eventEmitter, show, hideModal, setModal]);

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
                    article: '',
                },
                fieldName: 'modaldata',
            },
        ],
    },
    {
        name: 'hideModal',
        description: '隐藏弹窗',
    },
    {
        name: 'setModal',
        description: '设置弹窗',
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
        close: {},
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
        close: '关闭按钮',
        modify1: '修饰层',
        modify2: '修饰层',
        modify3: '修饰层',
        modify4: '修饰层',
    },
};

/**
 * 发布默认Api
 */
Modal.exposeApi = [];

export default Modal;
