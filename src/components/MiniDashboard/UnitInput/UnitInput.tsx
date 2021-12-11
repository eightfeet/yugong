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
import { UnitType } from '~/types/appData';

const { Option } = Select;
const style: React.CSSProperties = { position: 'relative', zIndex: 2 };

interface Props {
    /**标签 */
    label?: string;
    /**间隔 */
    span?: {
        label?: number;
        wrapper?: number;
    };
    /**最小值，作用于数据类型 */
    min?: number;
    /**最大值，作用于数据类型 */
    max?: number;
    className?: string;
    onChange?: (value: UnitType) => void;
    /**默认值 */
    defaultValue?: UnitType;
}

const stringTypes: any[] = ['-', '', 'runningTime'];

const Unitinput: React.FC<Props> = ({
    label,
    span,
    min,
    max,
    defaultValue,
    onChange,
    className
}) => {
    //拆解当前默认值
    const [defaultInpValue, defaultUnitValue] = defaultValue || [];
    // 组件内部单位
    const [unit, setUnit] = useState<string>(defaultUnitValue || '');
    // 组件内value值
    const [value, setValue] = useState<string | number | null>(defaultInpValue || '');
    // 组件内value类型，仅自定义“-”时为字符，其他单位类型都是数字
    const [valueType, setValueType] = useState<'number' | 'text'>(
        stringTypes.includes(defaultUnitValue)  ? 'text' : 'number'
    );
    // 获取option Value值
    const globalUnit = useSelector(
        (state: RootState) => state.pageData.unit || 'px'
    );
    const memoUnit = useMemo(() => getUnits(globalUnit), [globalUnit]);

    // onforce
    const [forceItem, setForceItem] = useState<'input' | 'select'>();

    const refChange = useSafeCallback(onChange);

    useEffect(() => {
        if (defaultUnitValue === '-' || defaultUnitValue === 'runningTime') {
            setValueType('text');
        } else {
            setValueType('number');
        }
    }, [defaultUnitValue])
    /**
     * 高频编辑防抖处理
     */
    const onChangeDebounce = useMemo(
        () =>
            throttle(({ val, un }: { val: string | number; un: string }) => {
                const values: UnitType = [val, un];
                refChange(values);
            }, 500),
        [refChange]
    );

    /**
     * 关于防抖设计。
     * 输入控件未操作时不应防止defaultValue回填，这里需要一个开关来做控制，
     * 通过onFocus事件来开启，onBlur事件来关闭页面的防抖机制
     */
    const [onDebounce, setOnDebounce] = useState(false);
    const onFocus = useCallback(
      () => {
        // 处理样式
        setForceItem('input');
        // 开启防抖禁止defaultValue回填
        setOnDebounce(true);
      },
      [],
    )
    const onBlur = useCallback(
      () => {
        // 关闭防抖允许defaultValue回填
        setOnDebounce(false);
      },
      [],
    )

    useEffect(() => {
      if (!onDebounce) {
          const value: any = defaultValue || [];
        setUnit(value[1]);
        setValue(value[0]);
      } 
    }, [defaultValue, onDebounce])

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
                // 单位设为text类型时需要将数据转换为文本值
                const val = value ?? '';
                setValue(val);
                onChangeDebounce({ val, un: unit });
            } else {
                setValueType('number');
                const numberValue = Number(value || '-');
                const val = numberValue ?? null;
                setValue(val);
                onChangeDebounce({ val, un: unit });
            }
            setUnit(unit);
        },
        [onChangeDebounce, value]
    );

    return (
        <Row className={classNames(s.row, className)} gutter={4}>
            {label ? <Col className={s.label} span={span?.label || 7}>
                {label || ''}
            </Col> : null}
            <Col span={span?.wrapper || 17}>
                <Input.Group compact className={s.group}>
                    {valueType === 'number' ? (
                        <InputNumber
                            min={min}
                            max={max}
                            className={s.input}
                            onChange={onChangeValue}
                            value={
                             value as number   
                            }
                            style={forceItem === 'input' ? style : undefined}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                    ) : null}
                    {valueType === 'text' ? (
                        <Input
                            className={s.input}
                            onChange={onChangeValue}
                            value={value || undefined}
                            style={forceItem === 'input' ? style : undefined}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                    ) : null}
                    <Select
                        className={s.select}
                        onChange={onChangeUnitType}
                        value={unit || ''}
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
