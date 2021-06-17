import {
    PlusOutlined,
    SettingOutlined,
    MinusOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { Row, Col, Tooltip, Input, Button } from 'antd';
import parser from 'html-react-parser';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { Api, ArgumentsObject } from '~/types/appData';
import ArgumentsSetting from '../ArgumentsSetting';
import s from './ApiConfig.module.less';

interface Props {
    dataMap: Api['dataMap'];
    onChange?: (data: Api['dataMap']) => void;
    description?: string;
    overwrite?: boolean;
    title: string;
}

const ApiDataMap: React.FC<Props> = ({
    dataMap,
    onChange,
    description,
    title,
    overwrite,
}) => {
    const [maps, setMaps] = useState<Api['dataMap']>(dataMap);
    const [visableModal, setVisableModal] = useState<boolean>(false);
    const [mapsArg, setMapsArg] = useState<ArgumentsObject>();
    const [currentIndex, setCurrentIndex] = useState<number>();

    useEffect(() => {
        if (overwrite) {
            setMaps(dataMap?.slice(0, 1));
        } else {
            setMaps(dataMap);
        }
    }, [dataMap, overwrite]);

    const updateMaps = useCallback(
        (data: Api['dataMap']) => {
            setMaps(data);
            if (onChange instanceof Function) {
                onChange(data);
            }
        },
        [onChange]
    );

    const onPluse = useCallback(() => {
        const operateApiDataMap = [...(maps || [])];
        operateApiDataMap.push({});
        updateMaps(operateApiDataMap);
    }, [maps, updateMaps]);

    const onMinus = useCallback(
        (index: number) => {
            let operateApiDataMap = [...(maps || [])];
            operateApiDataMap = operateApiDataMap.filter(
                (_, itemIndex) => itemIndex !== index
            );
            updateMaps(operateApiDataMap);
        },
        [maps, updateMaps]
    );

    const onArgOk = useCallback(
        (data) => {
            let operateApiDataMap = [...(maps || [])];
            if (currentIndex !== undefined && data[0]) {
                operateApiDataMap[currentIndex].map = data[0];
                updateMaps(operateApiDataMap);
            }
            setVisableModal(false);
        },
        [currentIndex, maps, updateMaps]
    );

    const showArg = useCallback(
        (index: number) => {
            setCurrentIndex(index);
            const mapsArg = (maps || [])[index].map;
            setMapsArg(mapsArg || undefined);
            setVisableModal(true);
        },
        [maps]
    );

    const onChangeSource = useCallback(
        (index, e) => {
            let operateApiDataMap = [...(maps || [])];
            operateApiDataMap[index].source = e.target.value;
            updateMaps(operateApiDataMap);
        },
        [maps, updateMaps]
    );

    const onChangeTarget = useCallback(
        (index, e) => {
            let operateApiDataMap = [...(maps || [])];
            operateApiDataMap[index].target = e.target.value;
            updateMaps(operateApiDataMap);
        },
        [maps, updateMaps]
    );

    return (
        <>
            <Button
                onClick={onPluse}
                icon={<PlusOutlined />}
                type="text"
                size="small"
            >
                {title}
            </Button>
            {description ? (
                <Tooltip title={parser(description || '')}>
                    <QuestionCircleOutlined />
                </Tooltip>
            ) : null}
            {maps?.map((item, index) => (
                <Row
                    key={index}
                    gutter={4}
                    className={classNames(s.row, s.map)}
                >
                    {overwrite ? null : (
                        <>
                            <Col span={8}>
                                <Tooltip
                                    title={
                                        <div>
                                            源数据以{' '}
                                            <span style={{ color: 'red' }}>
                                                response
                                            </span>{' '}
                                            开头
                                            <br />
                                            response[key]
                                            <br />
                                            Eg:
                                            定位到原始数据中的body值response.body
                                        </div>
                                    }
                                >
                                    <Input
                                        placeholder="输入要转换的源数据"
                                        onChange={(e) =>
                                            onChangeSource(index, e)
                                        }
                                        value={item.source as any}
                                    />
                                </Tooltip>
                            </Col>
                            <Col span={8}>
                                <Tooltip
                                    title={
                                        <div>
                                            输入目标数据属性名称: <br /> 最终Api
                                            return数据为
                                            <br />
                                            {`{`}
                                            <br />
                                              &nbsp;response, <br />
                                              &nbsp;{item.target || 'target'}: {item.source ? `[ ${item.source} ]` : '[ source ]'}
                                            <br />
                                            {`}`}
                                        </div>
                                    }
                                >
                                    <Input
                                        placeholder="输入目标数据属性名称"
                                        onChange={(e) =>
                                            onChangeTarget(index, e)
                                        }
                                        value={item.target as any}
                                    />
                                </Tooltip>
                            </Col>
                        </>
                    )}
                    <Col span={overwrite ? 23 : 7}>
                        <Tooltip
                            title={
                                <div>
                                    确定转换映射关系，
                                    <br /> {`{ foo: bar }`} <br />
                                    foo=源数据 key；bar=新数据 key
                                </div>
                            }
                        >
                            <Button
                                className={s.w100}
                                onClick={() => showArg(index)}
                                icon={<SettingOutlined />}
                            >
                                映射关系
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col span={1}>
                        <Tooltip title={<div>移除</div>}>
                            <MinusOutlined onClick={() => onMinus(index)} />
                        </Tooltip>
                    </Col>
                </Row>
            ))}
            <ArgumentsSetting
                title="映射关系"
                dataFlexible
                visible={visableModal}
                initArgumentData={[
                    mapsArg || {
                        type: 'object',
                        describe: '',
                        fieldName: 'mapsArg',
                        name: '映射关系',
                        data: {},
                    },
                ]}
                onCancel={() => setVisableModal(false)}
                onOk={onArgOk}
                forceUpdate
            />
        </>
    );
};

export default ApiDataMap;
