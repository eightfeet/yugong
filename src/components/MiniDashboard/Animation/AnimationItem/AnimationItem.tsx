import { Row, Col, Button, Select as AntSelect } from 'antd';
import React, { useCallback, useState } from 'react';
import { AnimationTypesOfStyleItems } from '~/types/appData';
import Select from '~/components/MiniDashboard/Select';
import s from './AnimationItem.module.less';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import MoveIcon from './MoveIcon';
import { MinusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import NumberInput from '../../NumberInput';
import AnimationIterationCount from '../AnimationIterationCount';
import AnimationTimingFunction from '../AnimationTimingFunction';
import animationDisc from './animationDisc.json';

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

interface Props {
  onChange: (value: AnimationTypesOfStyleItems) => void;
  defaultData: AnimationTypesOfStyleItems;
  onMinus: () => void;
}

const AnimationItem: React.FC<Props> = ({ onChange, defaultData, onMinus }) => {
  const [animation, setAnimation] = useState<AnimationTypesOfStyleItems>({
    ...defaultData,
  });
  
  // 确定当前类型
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
        if (onChange instanceof Function) {
          onChange({ ...animation });
        }
      },
    [animation],
  );

  return (
    <div className={classNames(s.backgroundwrap, 'hocdragwrap')}>
      <DragHandle />
      <div className={s.divide}>
        <div className={s.title} />
        <div className={s.menu}>
          <Button size="small" onClick={onMinus} icon={<MinusOutlined />}>
            删除
          </Button>
        </div>
      </div>
      <div className={s.backgrounditem}>
        <Row className={s.row}>
          <Col span={12}>
            <Row gutter={4} className={s.row}>
              <Col span={7} className={s.label}>
                动画类型
              </Col>
              <Col span={17}>
                <AntSelect
                  className={s.antselect}
                  value={defaultData?.animationName}
                  placeholder="请选择要添加的动画"
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
          <Col span={12} />
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
      </div>
    </div>
  );
};

export default SortableElement(AnimationItem);
