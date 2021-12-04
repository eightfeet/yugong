import { Row, Col, Select as AntSelect } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleContext } from '~/context/StyleContext';
import { RootState } from '~/redux/store';
import NumberInput from '../NumberInput';
import Select from '../Select';
import s from './Animation.module.less';
import AnimationIterationCount from './AnimationIterationCount';
import AnimationTimingFunction from './AnimationTimingFunction';
import animationDisc from './animationDisc.json';

interface Props {}

interface DefautData {
  animationDuration?: number;
  animationTimingFunction?: string;
  animationDelay?: number;
  animationIterationCount?: 'infinite' | number;
  animationDirection?: string;
  animationFillMode?: string;
  animationName?: string;
}

const Animation: React.FC<Props> = ({}) => {
  const context = useContext(StyleContext);
  const [animation, setAnimation] = useState<DefautData>({});
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId,
  );

  useEffect(() => {
    setAnimation({ ...(context.getDefaultData?.('animation') || {}) });
  }, [context, moduleId]);

  const onChangeAnimation = useCallback(
    (
        type:
          | 'animationDuration'
          | 'animationTimingFunction'
          | 'animationDelay'
          | 'animationIterationCount'
          | 'animationFillMode'
          | 'animationDirection'
          | 'animationName',
      ) =>
      (value: any) => {
        animation[type] = value;
        setAnimation({ ...animation });
        if (context.onChange instanceof Function) {
          context.onChange({ ...animation }, 'animation');
        }
      },
    [context, animation],
  );
  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Row className={s.row} gutter={4}>
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
            label="延时"
            placeholder="延时时长(ms)"
            unit="ms"
            min={0}
            defaultValue={animation?.animationDelay}
            onChange={onChangeAnimation('animationDelay')}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <AnimationTimingFunction
          defaultValue={animation?.animationTimingFunction}
          onChange={onChangeAnimation('animationTimingFunction')}
        />
      </Row>
      <Row className={s.row}>
        <AnimationIterationCount
          defaultValue={animation?.animationIterationCount}
          onChange={onChangeAnimation('animationIterationCount')}
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
