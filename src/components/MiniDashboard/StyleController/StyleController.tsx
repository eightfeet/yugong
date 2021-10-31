import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './StyleController.module.less';
import { RootState } from '~/redux/store';
import StyleSheetPanel from '../StyleSheetPanel';
import TreeSelect from 'antd/lib/tree-select';
import { Col, Row } from 'antd';
import { AnyObjectType } from '~/types/appData';
import { findPath } from './helper';
import usePostMessage from '~/hooks/usePostMessage';

interface Props {}

const StyleController: React.FC<Props> = () => {
    // 模板ID
    const activationItem = useSelector(
        (state: RootState) => state.activationItem
    );
    const sendMsg = usePostMessage(() => {});
    const { moduleId, type } = activationItem;

    // 获取模块样式描述清单
    const moduleType: { [keys: string]: string }[] = useMemo(() => {
        if (moduleId) {
            return (
                require(`~/modules/${type}`)?.default
                    ?.exposeDefaultProps?.styleDescription || []
            );
        }
        return [];
    }, [moduleId, type]);

    // 当前编辑路径
    const [stylePath, setStylePath] = useState('');
    const [path, setPath] = useState<AnyObjectType[]>();
    const resetPath = useCallback(
        () => {
            const pathData = [{ title: '基础' }];
            setPath(pathData);
            const win = (
                document.getElementById('wrapiframe') as HTMLIFrameElement
            ).contentWindow;
            sendMsg(
                {
                    tag: 'setCurrentEditorStylePath',
                    value: pathData,
                },
                win
            );
            setStylePath('basic');
        },
        [sendMsg],
    )
    
    // 重置路径
    useEffect(() => {
        resetPath()
    }, [activationItem.moduleId, resetPath])

    // 设置当前编辑路径
    const onSelectStylePath = useCallback(
        (value) => {
            const pathData = findPath(value, moduleType).reverse();
            setPath(pathData);
            const win = (
                document.getElementById('wrapiframe') as HTMLIFrameElement
            ).contentWindow;
            sendMsg(
                {
                    tag: 'setCurrentEditorStylePath',
                    value: pathData,
                },
                win
            );
            setStylePath(value);
        },
        [moduleType, sendMsg]
    );

    const height = useMemo(() => window.innerHeight - 200, []);
    return (
        <div className={s.dashboardstylewrap}>
            <div className={s.wrap}>
                <div className={s.top}>
                    <Row className={s.row}>
                        <Col span={4}>当前编辑元素</Col>
                        <Col span={20}>
                            <div className={s.bar}>
                                <div className={s.path}>
                                    {path?.map((item, index) => (
                                        <span key={index}>{item.title}</span>
                                    ))}
                                </div>
                                <TreeSelect
                                    style={{ width: '100%', height: '100%' }}
                                    className={s.select}
                                    value={stylePath}
                                    dropdownStyle={{
                                        maxHeight: `${height}px`,
                                        overflow: 'auto',
                                    }}
                                    listHeight={height}
                                    treeData={moduleType || []}
                                    placeholder="请选择"
                                    treeDefaultExpandAll
                                    onChange={onSelectStylePath}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <StyleSheetPanel path={stylePath} />
        </div>
    );
};

export default StyleController;
