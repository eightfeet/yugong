import React, {
    useCallback,
    useMemo,
    useState,
    useEffect,
} from 'react';
import { Input, Col, Row, Select, InputNumber } from 'antd';

import s from './UnitInput.module.less';
import classNames from 'classnames';
import getUnits from './unit';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { throttle } from 'lodash';
import useSafeCallback from '~/hooks/useSafeCallback';

const { Option } = Select;
const style: React.CSSProperties = { position: 'relative', zIndex: 2 };

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
    onChange?: (value: [string | number, string]) => void;
    /**默认值 */
    defaultValue?: [string | number, string];
}

const Unitinput: React.FC<Props> = ({
    label,
    span,
    min,
    max,
    defaultValue,
    onChange,
}) => {
    //拆解当前默认值
    const [defaultInpValue, defaultUnitValue] = defaultValue || [];
    // 组件内部单位
    const [unit, setUnit] = useState<string>(defaultUnitValue || '');
    // 组件内value值
    const [value, setValue] = useState(defaultInpValue || '');
    // 组件内value类型，仅自定义“-”时为字符，其他单位类型都是数字
    const [valueType, setValueType] = useState<'number' | 'text'>(
        defaultUnitValue === '-' ? 'text' : 'number'
    );
    // 获取option Value值
    const globalUnit = useSelector(
        (state: RootState) => state.pageData.unit || 'px'
    );
    const memoUnit = useMemo(() => getUnits(globalUnit), [globalUnit]);

    // onforce
    const [forceItem, setForceItem] = useState<'input' | 'select'>();

    const refChange = useSafeCallback(onChange);

    /**
     * 高频编辑防抖处理
     */
    const onChangeDebounce = useMemo(
        () =>
            throttle(({ val, un }: { val: string | number; un: string }) => {
                const values: [string | number, string] = [val, un];
                refChange.current?.(values);
            }, 500),
        [refChange]
    );

    /**
     * onChange 值
     */
    const onChangeValue = useCallback(
        (e) => {
            if (valueType === 'text') {
                setValue(e.target.value);
                onChangeDebounce({ val: e.target.value, un: unit });
            }
            if (valueType === 'number') {
                setValue(e);
                onChangeDebounce({ val: e, un: unit });
            }
        },
        [onChangeDebounce, unit, valueType]
    );

    /**
     * change 单位
     */
    const onChangeUnitType = useCallback(
        (unit) => {
            if (unit === '-' || unit === 'runningTime') {
                setValueType('text');
                if (value) {
                    setValue(`${value}`);
                    onChangeDebounce({ val: `${value}`, un: unit });
                }
            } else {
                setValueType('number');
                const val = Number(value);
                if (val) {
                    setValue(val);
                    onChangeDebounce({ val, un: unit });
                }
            }
            setUnit(unit);
        },
        [onChangeDebounce, value]
    );

    useEffect(() => {
        console.log('rending ?');
    }, [defaultValue]);
    return (
        <Row className={classNames(s.row, s.className)} gutter={8}>
            <Col className={s.label} span={span?.label || 7}>
                {label}
            </Col>
            <Col span={span?.wrapper || 17}>
                <Input.Group compact className={s.group}>
                    {valueType === 'number' ? (
                        <InputNumber
                            min={min}
                            max={max}
                            className={s.input}
                            onChange={onChangeValue}
                            value={Number(value) || undefined}
                            style={forceItem === 'input' ? style : undefined}
                            onFocus={() => setForceItem('input')}
                        />
                    ) : null}
                    {valueType === 'text' ? (
                        <Input
                            className={s.input}
                            onChange={onChangeValue}
                            value={value}
                            style={forceItem === 'input' ? style : undefined}
                            onFocus={() => setForceItem('input')}
                        />
                    ) : null}
                    <Select
                        className={s.select}
                        dropdownClassName={s.dropdown}
                        onChange={onChangeUnitType}
                        defaultValue={unit}
                        style={forceItem === 'select' ? style : undefined}
                        onFocus={() => setForceItem('select')}
                    >
                        {memoUnit.map((item) => (
                            <Option key={item.text} value={item.value}>
                                {item.text}
                            </Option>
                        ))}
                    </Select>
                </Input.Group>
            </Col>
        </Row>
    );
};

export default Unitinput;
