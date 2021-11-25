import { Row, Col } from 'antd';
import React from 'react';
import NumberInput from '../NumberInput';
import Select from '../Select';
import s from './Animate.module.less';
import AnimationIterationCount from './AnimationIterationCount';
import AnimationTimingFunction from './AnimationTimingFunction';

interface Props {}

const Animate: React.FC<Props> = ({}) => {
  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Select
            label="动画类型"
            value={''}
            optionsData={{
              '': '无',
              bounce: 'bounce',
              flash: 'flash',
              pulse: 'pulse',
              rubberBand: 'rubberBand',
              shakeX: 'shakeX',
              shakeY: 'shakeY',
              headShake: 'headShake',
              swing: 'swing',
              tada: 'tada',
              wobble: 'wobble',
              jello: 'jello',
              heartBeat: 'heartBeat',
            }}
            onChange={() => {}}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="动画时长"
            placeholder="动画持续时长(ms)"
            unit="ms"
            min={0}
            defaultValue={100}
            onChange={() => {}}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="延时"
            placeholder="延时时长(ms)"
            unit="ms"
            min={0}
            defaultValue={0}
            onChange={() => {}}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <AnimationTimingFunction />
      </Row>
      <Row className={s.row}>
        <AnimationIterationCount defaultValue={111} onChange={(data) => console.log(data)} />
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Select
            label="动画方向"
            value={''}
            optionsData={{
              normal: '正常',
              alternate: '来回播放',
            }}
            onChange={() => {}}
          />
        </Col>
        <Col span={12}>
          <Select
            label="填充模式"
            value={''}
            optionsData={{
              none: '默认',
              forwards: '正向',
              backwards: '反向',
              both: '双向',
            }}
            onChange={() => {}}
          />
        </Col>
      </Row>
    </>
  );
};

export default Animate;

// animation-duration: 7.4s;
// animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
// animation-delay: 0s;
// animation-iteration-count: infinite;
// animation-direction: normal;
// animation-fill-mode: both;
// animation-play-state: running;
// animation-name: bounce;
