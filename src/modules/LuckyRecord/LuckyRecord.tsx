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
import s from './LuckyRecord.module.less';
import ReactDOM from 'react-dom';
import config from './LuckyRecord.config';
import useLifeCycle, { UseLifeCycleResult } from '~/hooks/useLifeCycle';

export interface LuckyRecordProps extends AppDataElementsTypes {
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

const LuckyRecord: Modules<LuckyRecordProps> = (props) => {
    const { api, moduleId, style } = props;
    const [useParams, setUserParams] = useState<UseParams>();
    const eventEmitterRef = useRef<UseLifeCycleResult<{ [keys in 'mount' | 'unmount' | 'onCancel' ]: Function }>>();
    
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

    // 创建模块
    const { createModal, hideModal, modal } = useModal(params);
    const userClass = useStyles(MId)(style);

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


            const footer = '';

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
            });
            const rootDom = document.getElementById(MId);
            if (rootDom && modal) {
                rootDom.className = `${s.modalinit} ${userClass.root}`;
            }
        },
        [MId, createModal, modal, params.closable, userClass.root]
    );


    eventEmitterRef.current = useLifeCycle(
        moduleId,
        {
            mount: '初始化',
            unmount: '卸载',
            onCancel: '取消/关闭',
        },
        { setAnimation, createModal: show, hideModal }
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
        LuckyRecord[key] = config[key];
    }
}

export default LuckyRecord;
