import { Row, Col, Select as AntSelect } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import s from './Animation.module.less';
import animationDisc from './animationDisc.json';
import { AnimationTypesOfStyleItems } from '~/types/appData';
import produce from '~/core/helper/produce';
import NumberInput from '~/components/MiniDashboard/NumberInput';
import AnimationIterationCount from '~/components/MiniDashboard/Animation/AnimationIterationCount';
import AnimationTimingFunction from '~/components/MiniDashboard/Animation/AnimationTimingFunction';
import Select from '~/components/MiniDashboard/Select';
import { ElementStyleContext } from '../../../ElementStyleContext';

interface Props {}

const Animation: React.FC<Props> = () => {
  const context = useContext(ElementStyleContext);
  const [animation, setAnimation] = useState<AnimationTypesOfStyleItems>({});

  useEffect(() => {
    setAnimation({ ...(context.style?.animation || {}) });
  }, [context.style?.animation]);

  const onChangeAnimation = useCallback(
    (
        type:
          | 'animationDuration'
          | 'animationTimingFunction'
          | 'animationDelay'
          | 'animationIterationCount'
          | 'animationFillMode'
          | 'animationDirection'
          | 'animationName'
          | 'animationPlayInView',
      ) =>
      (value: any) => {
        const nextAnimation = produce(animation, draft => {
          if (type === 'animationPlayInView') {
            draft[type] = value.target.checked;
          } else {
            draft[type] = value;
          }
        })
        
        setAnimation(nextAnimation);
        if (context.onChange instanceof Function) {
          context.onChange(nextAnimation, 'animation');
        }
      },
    [context, animation],
  );
  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Row gutter={4} className={s.rowtop}>
            <Col className={s.label} span={7}>
              动画类型
            </Col>
            <Col span={17}>
              <AntSelect
                className={s.antselect}
                value={animation?.animationName}
                onChange={onChangeAnimation('animationName')}
              >
                {Object.keys(animationDisc).map((key) => (
                  <AntSelect.OptGroup key={key} label={key}>
                    {animationDisc[key].map((element: string) => (
                      <AntSelect.Option key={element} value={element}>
                        {element}
                      </AntSelect.Option>
                    ))}
                  </AntSelect.OptGroup>
                ))}
              </AntSelect>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="动画时长"
            placeholder="动画持续时长(ms)"
            unit="ms"
            min={0}
            defaultValue={animation?.animationDuration}
            onChange={onChangeAnimation('animationDuration')}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="延时播放"
            placeholder="延时时长(ms)"
            unit="ms"
            min={0}
            defaultValue={animation?.animationDelay}
            onChange={onChangeAnimation('animationDelay')}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <AnimationIterationCount
          defaultValue={animation?.animationIterationCount}
          onChange={onChangeAnimation('animationIterationCount')}
        />
      </Row>
      <Row className={s.row}>
        <AnimationTimingFunction
          defaultValue={animation?.animationTimingFunction}
          onChange={onChangeAnimation('animationTimingFunction')}
        />
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Select
            label="动画方向"
            value={animation?.animationDirection}
            optionsData={{
              normal: '正常',
              alternate: '来回播放',
            }}
            onChange={onChangeAnimation('animationDirection')}
          />
        </Col>
        <Col span={12}>
          <Select
            label="填充模式"
            value={animation?.animationFillMode}
            optionsData={{
              none: '默认',
              forwards: '正向',
              backwards: '反向',
              both: '双向',
            }}
            onChange={onChangeAnimation('animationFillMode')}
          />
        </Col>
      </Row>
    </>
  );
};

export default Animation;
