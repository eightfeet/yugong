import { useCallback, useState } from 'react';
import { Collapse, Tooltip } from 'antd';
import ApiSetting from '../ApiSetting';
import EventsSetting from '../EventsSetting';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { ExposeApi, ExposeEvents, ExposeFunctions } from '~/types/modules';
import Presetting from '../Presetting';
import { ExceptionOutlined, InfoCircleOutlined } from '@ant-design/icons';
import MarkdownModalDoc from '../MarkdownModalDoc';
import { useAsyncMemo } from '~/hooks/useAsyncMemo';
const { Panel } = Collapse;

const describe = () => (
    <div>
        返回数据结构
        <br />
        [data]: 原始数据, <br />
        [target]: 转换/映射数据
        <br />
        {`{ `}
        <br />
        data: any, <br />
        [target1]: any, <br />
        [target2]: any, <br />
        [target...n]: any <br />
        {`}`}
    </div>
);

const ConfigurationController = () => {
    /**
     * 获取当前被选择项的api数据
     */
    const activationItem = useSelector(
        (state: RootState) => state.activationItem
    );

    const { type } = activationItem;

    const [exposeFunctions, setExposeFunctions] = useState<ExposeFunctions[]>();
    const [isCustom, setIsCustom] = useState(false);
    const [exposeApi, setExposeApi] = useState<ExposeApi[]>();
    const [exposeEvents, setExposeEvents] = useState<ExposeEvents[]>()
    const [ready, setReady] = useState(false);

    /**
     * 获取当前被选组件导出的（自定义）默认Api数据
     */
    useAsyncMemo(async () => {
        if (!!type) {
            const res = await import(`../../../modules/${type}/index.ts`);
            setExposeFunctions(res.default.exposeFunctions);
            setIsCustom(res.default.exposeDefaultProps.preset);
            setExposeApi(res.default.exposeApi);
            setExposeEvents(res.default.exposeEvents);
            setReady(true);
        }
    }, [type]);

    const [showHelp, setShowHelp] = useState(false);

    const handlerHelp = useCallback((e) => {
        e.stopPropagation();
        setShowHelp(true);
    }, []);

    //  确保导入静态数据准备就绪
    if (!ready) return null;

    return (
        <>
            <Collapse
                accordion
                bordered={false}
                defaultActiveKey={exposeFunctions?.length ? ['0'] : ['1']}
            >
                {exposeFunctions?.length ? (
                    <Panel
                        header="预设"
                        key="0"
                        extra={
                            <div onClick={handlerHelp}>
                                <ExceptionOutlined /> 帮助
                            </div>
                        }
                    >
                        <Presetting
                            custom={!!isCustom}
                            // exposeFunctions={exposeFunctions}
                        />
                    </Panel>
                ) : null}
                <Panel header="事件" key="1">
                    <EventsSetting exposeEvents={exposeEvents} />
                </Panel>
                {exposeApi?.length ? (
                    <Panel
                        header="Api"
                        key="2"
                        extra={
                            <Tooltip title={describe}>
                                <InfoCircleOutlined />
                            </Tooltip>
                        }
                    >
                        <ApiSetting />
                    </Panel>
                ) : null}
            </Collapse>
            <MarkdownModalDoc
                visible={showHelp}
                moduleName={type}
                onCancel={() => setShowHelp(false)}
            />
        </>
    );
};

export default ConfigurationController;
