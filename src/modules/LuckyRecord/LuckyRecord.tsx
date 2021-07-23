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
import List from './List';
import Modal from '~/components/Modal';

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
    
    const renderList = useCallback(
        () => {
            
        },
        [],
    )

    const show = useCallback(
        async (data, MId) => {
            // 创建一个弹窗
            createModal();
            const rootDom = document.getElementById(modal?.state.id || '');
            if (rootDom) {
                rootDom.className = `${s.modalinit} ${userClass.root}`;
            }
            // 内容dom
            const rootNode = modal?.state.contentDom;
            if (!rootNode) {
                return;
            }
            // 内容挂载
            const contentWrap = rootNode.querySelector('.article');
            if (contentWrap) {
                ReactDOM.render(<List />, contentWrap, () => {
                    contentWrap?.classList.add(s.artical);
                });
            }
            
            // 关闭图标
            const closeIconNode = rootNode.querySelector(`.${MId}_close`);
            if (params.closable && closeIconNode) {
                ReactDOM.render(<IconCancel />, closeIconNode);
            }
            
        },
        [createModal, modal, params.closable, userClass.root]
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
        if (editingId === moduleId) {
            show({}, MId).catch()
        }
    }, [editingId, moduleId, show, currentEditorStylePath, MId])

    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find((item) => item.apiId === '');
        requester(apiArguments || {});
    }, [api]);

    const [visible, setVisible] = useState<boolean>();
    const [visible2, setVisible2] = useState<boolean>();
    const ref = useRef<any>();

    useEffect(() => {
        if (ref.current) {
            ref.current.create();
        }
    }, [ref])

    return <Wrapper {...props} maxHeight maxWidth >
        <div onClick={() => setVisible(true)}>打开弹窗1</div>
        <div onClick={() => setVisible2(true)}>打开弹窗2</div>
        <Modal 
            visible={visible}
            onCancel={() => setVisible(false)}
            animation={{
                form:'fadeInRight'
            }}
            closeStyle={{
                width: '5px',
                height: '5px',
                background: 'red'
            }}
            contentStyle={{
                position: 'absolute',
                right: 0
            }}
            modifyStyle={[
                {
                    width: '30px',
                    height: '30px',
                    left: '-10px',
                    background: 'brown'
                },
                {
                    width: '10px',
                    height: '10px',
                    left: '-15px',
                    background: 'yellow'
                }
            ]}
            innerRef={(modal) => {ref.current=modal}}
            shouldCloseOnOverlayClick
        >
            <div>这是来自模块1</div>
            <button onClick={() => setVisible(false)}>关闭模块</button>
        </Modal>
        <Modal 
            visible={visible2}
            onCancel={() => setVisible(false)}
            overlayStyle={{background: 'rgba(0, 255, 0, 0.5)'}}
        >
            <div>这是来自模块2</div>
            <button onClick={() => setVisible2(false)}>关闭模块</button>
        </Modal>
    </Wrapper>;
};

// bind static
for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        LuckyRecord[key] = config[key];
    }
}

export default LuckyRecord;
