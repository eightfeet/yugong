import { Row, Col, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Select from '~/components/MiniDashboard/Select';
import s from './AnimationTimingFunction.module.less';

interface Props {
  onChange?: (data: string) => void;
  defaultValue?: string;
}

const AnimationTimingFunction: React.FC<Props> = ({
  onChange,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [inPutValue, setInPutValue] = useState<string>();
  const [enabled, setEnabled] = useState<boolean>();

  useEffect(() => {
    const fixedParameters: (string | undefined)[] = [
      '',
      'linear',
      'ease',
      'ease-in',
      'ease-out',
      'ease-in-out',
    ];
    if (fixedParameters.includes(defaultValue)) {
      setSelectedValue(defaultValue || '');
    } else {
      setInPutValue(defaultValue || '');
      setEnabled(true);
      setSelectedValue('other');
    }
  }, [defaultValue]);

  const onChangeSelect = useCallback(
    (val: string) => {
      setSelectedValue(val);
      if (val === 'other') {
        setEnabled(true);
        if (typeof onChange === 'function' && inPutValue) {
          onChange(inPutValue);
        }
      } else {
        setEnabled(false);
        if (typeof onChange === 'function') {
          onChange(val);
        }
      }
    },
    [inPutValue, onChange],
  );

  const onChangeInput = useCallback(
    (data) => {
      const val = data.target.value;
      if (typeof onChange === 'function') {
        onChange(val);
      }
    },
    [onChange],
  );

  return (
    <>
      <Col span={12}>
        <Select
          label="速度曲线"
          value={selectedValue}
          optionsData={{
            '': '无',
            linear: '恒速',
            ease: '渐进',
            'ease-in': '缓入',
            'ease-out': '缓出',
            'ease-in-out': '缓入缓出',
            other: '高级',
          }}
          onChange={onChangeSelect}
        />
      </Col>
      <Col span={12}>
        <Row className={s.row} gutter={4}>
          <Col className={s.label} span={2} />
          <Col span={22}>
            <Input
              disabled={!enabled}
              placeholder="cubic-bezier/step"
              onChange={onChangeInput}
              value={inPutValue}
            />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default AnimationTimingFunction;
