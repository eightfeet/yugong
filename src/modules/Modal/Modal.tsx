import { useCallback, useEffect, useMemo } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import { AnyObjectType, AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import useModal from '~/hooks/useModal';
import { buildParams } from './defaultParams';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';

export interface ModalProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Modal: Modules<ModalProps> = (props) => {
    const { eventEmitter, events = {}, api, moduleId } = props;
    const MId = `MD${moduleId}`;
    const params = buildParams({
        id: MId,
        animationType: 'fadeInDown',
        animationDuration: '0.5ms',
        closable: true,
        shouldCloseOnOverlayClick: true,
    });
    // 创建模块
    const { createModal, hideModal } = useModal(params);

    const show =  useCallback(
        (data) => {
            const {header, article} = getArgumentsItem(data) as AnyObjectType;
            createModal({
                header,
                article
            })
        },
        [createModal],
    )

    // 向eventEmitter注册事件，向外公布
    useMemo(() => {
        eventEmitter.addEventListener('createModal', show);
        eventEmitter.addEventListener('hideModal', hideModal);
    }, [eventEmitter, show, hideModal]);

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
        description: '隐藏弹窗'
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
};

/**
 * 发布默认Api
 */
Modal.exposeApi = [];

export default Modal;
