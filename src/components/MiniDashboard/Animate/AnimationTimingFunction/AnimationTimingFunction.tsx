import { Row, Col } from 'antd';
import React, {useState} from 'react';
import Select from '~/components/MiniDashboard/Select';
// import s from './AnimationTimingFunction.module.less';

interface Props {
  onChange?: (data: string) => void;
  defaultValue?: string;
}

const AnimationTimingFunction: React.FC<Props> = ({}) => {
  const [selectedValue, setSelectedValue] = useState('');

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
            bezier: 'bezier函数',
          }}
          onChange={() => {}}
        />
      </Col>
      <Col>
          
      </Col>
    </>
  );
};

export default AnimationTimingFunction;
