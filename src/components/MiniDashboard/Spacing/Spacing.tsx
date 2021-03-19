import { Row, Col, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import s from './Spacing.module.less';

type SpaceType = 'padding' | 'margin';

interface Props {
    unit?: string;
    onChange: (type: SpaceType, values: {[keys: string]: any}) => void;
}

const handleValue = (type: string, values: any[], unit: string) => {
    const data = {};
    const tips = ['Top', 'Right', 'Bottom', 'Left'];
    values.forEach((item, index) => {
        data[`${type}${tips[index]}`] = isFinite(item) ? `${item}${unit}` : (item || '')
    });
    return data;
}

const Spacing: React.FC<Props> = ({ unit, onChange }) => {
    const [spaceOutType, setSpaceType] = useState<'margin' | 'padding'>('padding');

    const [inValues, setInValues] = useState<any[]>([
        undefined,
        undefined,
        undefined,
        undefined,
    ]);

    const [outValues, setOutValues] = useState<any[]>([
        undefined,
        undefined,
        undefined,
        undefined,
    ]);

    const onChangeSpace = useCallback((index) => (e:any) => {
        if (spaceOutType === 'padding') {
            const values = [...inValues];
            values[index] = e.target.value;
            setInValues(values);
            onChange(spaceOutType, handleValue(spaceOutType, values, unit || 'px'));
        }
        if (spaceOutType === 'margin') {
            const values = [...outValues]
            values[index] = e.target.value;
            setOutValues(values);
            onChange(spaceOutType, handleValue(spaceOutType, values, unit || 'px'));
        }
    }, [spaceOutType, outValues, inValues]);

    const onChangeValue = useCallback(
        (type: SpaceType) => (e: any) => {
            e.stopPropagation();
            setSpaceType(type);
        },
        [setSpaceType]
    );

    let values: any[] = [];
    if (spaceOutType === 'padding') {
        values=inValues
    }
    if (spaceOutType === 'margin') {
        values=outValues
    }

    return (
        <div className={s.wrap}>
            <Row gutter={4}>
                <Col span={3} className={s.right}>
                    边距
                </Col>
                <Col span={12}>
                    <div
                        className={s.boxA}
                        onClick={onChangeValue('margin')}
                        style={
                            spaceOutType === 'margin'
                                ? { backgroundColor: '#fff' }
                                : { backgroundColor: '#eee' }
                        }
                    >
                        <div
                            className={s.boxB}
                            onClick={onChangeValue('padding')}
                            style={
                                spaceOutType === 'padding'
                                    ? { backgroundColor: '#fff' }
                                    : { backgroundColor: '#eee' }
                            }
                        />
                    </div>
                </Col>
                <Col span={9}>
                    {values.map((item, index) => (
                        <Row gutter={4} className={s.row} key={index}>
                            <Col span={6} className={s.label}>
                                {index === 0 ? '上' : null}
                                {index === 1 ? '右' : null}
                                {index === 2 ? '下' : null}
                                {index === 3 ? '左' : null}
                            </Col>
                            <Col span={14}>
                                <Input
                                    type="text"
                                    disabled={!spaceOutType}
                                    value={item}
                                    onChange={onChangeSpace(index)}
                                />
                            </Col>
                            <Col span={4} className={s.unit}>
                                {isFinite(item) ? unit : ''}
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
        </div>
    );
};

export default Spacing;
