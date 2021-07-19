import { useCallback, useEffect, useRef, useState } from 'react';
import requester from '~/core/fetch';
import { AnyObjectType, AppDataElementsTypes, ArgumentsItem } from '~/types/appData';
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
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

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

const LuckyRecord: Modules<LuckyRecordProps> = (props) => {
    const { api, moduleId, style } = props;
    const { editingId,  currentEditorStylePath} = useSelector(
        (state: RootState) => state.controller
    );

    const [useParams, setUserParams] = useState<UseParams>();
    const eventEmitterRef = useRef<UseLifeCycleResult<{ [keys in 'mount' | 'unmount' | 'onCancel' ]: Function }>>();
    const [modalTitle, setModalTitle] = useState<string>();
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

    const setTitle = useCallback(
        (title: ArgumentsItem) => {
            const argtitle = getArgumentsItem(title) as string;
            setModalTitle(argtitle)
        },
        [],
    )

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
            const footer = '';
            createModal({
                header: modalTitle,
                article: `<div class="article ${s.articalinit}">列表内容</div>`,
                footer,
            }).then(() => {
                const rootNode = modal?.state.contentDom;
                if (!rootNode) {
                    return;
                }

                // 内容挂载
                const contentWrap = rootNode.querySelector('.article');
                ReactDOM.render(<IconCancel />, contentWrap, () => {
                    contentWrap?.classList.add(s.artical)
                });

                // 关闭图标
                if (params.closable) {
                    const closeIconNode = rootNode.querySelector(
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
        [MId, createModal, modal, modalTitle, params.closable, userClass.root]
    );

    eventEmitterRef.current = useLifeCycle(
        moduleId,
        {
            mount: '初始化',
            unmount: '卸载',
            onCancel: '取消/关闭',
        },
        { setTitle, setAnimation, createModal: show, hideModal }
    );

    useEffect(() => {
        console.log(currentEditorStylePath, currentEditorStylePath);
        // 如何显示弹窗
        // if (editingId === moduleId) {
        //     show({})
        // }
        // return () => {
        //     hideModal(false)
        // }
    }, [currentEditorStylePath])

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
