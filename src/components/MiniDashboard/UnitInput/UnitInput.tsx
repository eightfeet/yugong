import React, { useCallback, useState } from 'react';
import { Input, Col, Row, Select, InputNumber } from 'antd';
import s from './UnitInput.module.less';
import classNames from 'classnames';

const { Option } = Select;

interface Props {
    /**标签 */
    label: string;
    /**间隔 */
    span?: {
        label: number;
        wrapper: number;
    };
    /**最小值，作用于数据类型 */
    min?: number;
    /**最大值，作用于数据类型 */
    max?: number;
    className?: string;
    onChange?: (value: [(string | number), string]) => void;
    /**默认值 */
    defaultValue?: [(string | number), string];
}

const Unitinput: React.FC<Props> = ({ label, span, min, max, defaultValue }) => {
    const [unitType, setUnitType] = useState<'number' | 'text'>('number');
    const [ defaultInpValue, defaultUnitValue ] = defaultValue || [];

    const [unit, setUnit] = useState<string>(defaultUnitValue || '');
    const [value, setValue] = useState(defaultInpValue || '');

    const onChangeUnitType = useCallback(
        (unit) => {
            console.log(unit)
            setUnit(unit)
        },
        [],
    )

    return (
        <Row className={classNames(s.row, s.className)} gutter={8}>
            <Col className={s.label} span={span?.label|| 7}>{label}</Col>
            <Col span={span?.wrapper|| 17}>
                <Input.Group compact className={s.group}>
                    {unitType === 'number' ? <InputNumber min={min} max={max} className={s.input} value={value} defaultValue={100} /> : null}
                    {unitType === 'text' ? <Input className={s.input} defaultValue="100" value={value} /> : null}
                    <Select className={s.select} onChange={onChangeUnitType} defaultValue={unit}>
                        <Option value="">全局(rem)</Option>
                        <Option value="%">%</Option>
                        <Option value="px">px</Option>
                        <Option value="rem">rem</Option>
                        <Option value="vw">vw</Option>
                        <Option value="vh">vh</Option>
                        <Option value="-">自定义</Option>
                    </Select>
                </Input.Group>
            </Col>
        </Row>
    );
};

export default Unitinput;
