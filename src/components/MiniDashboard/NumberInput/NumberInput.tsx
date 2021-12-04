import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Row, Col, InputNumber } from 'antd';
import s from './NumberInput.module.scss';
import { InputNumberProps } from 'antd/lib/input-number';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import useSafeCallback from '~/hooks/useSafeCallback';
import { throttle } from 'lodash';

interface Props extends InputNumberProps {
    label: string;
    unit?: string;
}

const QuadrangularSelect: React.FC<Props> = ({
    unit,
    label,
    defaultValue,
    onChange,
    ...other
}) => {
    const ref = useRef(null);
    const moduleId = useSelector(
        (state: RootState) => state.activationItem.moduleId
    );

    useEffect(() => {
        if (ref.current) {
            (ref.current as any).blur();
        }
    }, [moduleId]);

    const [onDebounce, setOnDebounce] = useState(false);
    const onFocus = useCallback(() => {
        // 开启防抖禁止defaultValue回填
        setOnDebounce(true);
    }, []);
    const onBlur = useCallback(() => {
        // 关闭防抖允许defaultValue回填
        setValue(defaultValue);
        setOnDebounce(false);
    }, [defaultValue]);

    // 接管默认值
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      if (!onDebounce) {
        setValue(defaultValue);
      } 
    }, [defaultValue, onDebounce]);

    const refChange = useSafeCallback(onChange);

    /**
     * 高频编辑防抖处理
     */
    const onChangeDebounce = useMemo(
        () =>
            throttle((e: number) => {
                refChange(e);
            }, 500),
        [refChange]
    );

    const onChangeValue = useCallback(
      (e) => {
        setValue(e);
        onChangeDebounce(e);
      },
      [onChangeDebounce],
    )
    
    return (
        <Row className={s.row} gutter={4}>
            <Col className={s.label} span={7}>
                {label || ''}
            </Col>
            <Col span={17}>
                <InputNumber
                    {...other}
                    onChange={onChangeValue}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    value={value}
                    ref={ref}
                    addonAfter={unit}
                />
            </Col>
        </Row>
    );
};

export default QuadrangularSelect;
