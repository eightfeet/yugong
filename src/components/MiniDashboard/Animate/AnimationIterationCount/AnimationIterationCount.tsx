import { Checkbox, Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import NumberInput from '../../NumberInput';
import s from './AnimationIterationCount.module.less';

interface Props {
  defaultValue?: 'infinite' | number;
  onChange?: (data: 'infinite' | number) => void;
}

const AnimationIterationCount: React.FC<Props> = ({
  defaultValue,
  onChange,
}) => {
  // 接管默认值
  const [value, setValue] = useState(defaultValue);

  const [isInfinite, setIsInfinite] = useState(false);

  useEffect(() => {
    if (defaultValue === 'infinite') {
      setIsInfinite(true);
      if (typeof onChange === 'function') onChange('infinite');
    } else {
      setValue(defaultValue);
      if (typeof onChange === 'function' && value) onChange(value);
    }
  }, [defaultValue, onChange, value]);

  const handleInfinite = useCallback(() => {
    setIsInfinite((isInfinite) => {
      return !isInfinite;
    });
  }, []);

  const onChangeNum = useCallback(
    (data: any) => {
      if (typeof onChange === 'function') onChange(data);
    },
    [onChange],
  );
  return (
    <>
      <Col span={12}>
        <NumberInput
          label="播放次数"
          placeholder="定义动画播放次数"
          unit="次"
          min={0}
          defaultValue={value}
          onChange={onChangeNum}
          disabled={isInfinite}
        />
      </Col>
      <Col span={12}>
        <Row className={s.row} gutter={4}>
          <Col className={s.label} span={10}>
            <Checkbox checked={isInfinite} onChange={handleInfinite}>
              无限次
            </Checkbox>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default AnimationIterationCount;
