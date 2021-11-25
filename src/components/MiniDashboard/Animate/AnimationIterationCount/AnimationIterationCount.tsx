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
  const [value, setValue] = useState<number>(0);

  const [isInfinite, setIsInfinite] = useState<boolean>(false);

  useEffect(() => {
    if (defaultValue === 'infinite') {
      setIsInfinite(true);
    } else {
      setIsInfinite(false);
      setValue(Number(defaultValue) || 0);
    }
  }, [defaultValue]);

  const handleInfinite = useCallback(() => {
    setIsInfinite((isInfinite) => {
      if (typeof onChange === 'function') {
        if (!isInfinite === true) {
          onChange('infinite');
        } else {
          onChange(value || 0);
        }
      }
      return !isInfinite;
    });
  }, [value, onChange]);

  const onChangeNum = useCallback((data) => {
    if (typeof onChange === 'function') onChange(data as number);
    setValue(data);
  }, []);

  return (
    <>
      <Col span={12}>
        <NumberInput
          label="播放次数"
          placeholder="定义动画播放次数"
          unit="次"
          min={0}
          defaultValue={Number(value) || undefined}
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
