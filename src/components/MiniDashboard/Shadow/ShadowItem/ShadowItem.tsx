import { MinusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Switch } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import Color from '../../Color';
import UnitInput from '../../UnitInput';
import { BoxShadow } from '../Shadow';
import MoveIcon from './MoveIcon';
import s from './ShadowItem.module.less';


const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

interface Props {
    data: BoxShadow,
    type: "box" | "text",
    onMinus: () => void;
    onToggleShow: () => void;
    onChangeColor: (data: any) => void;
    onChangeInset: (e: boolean) => void;
    onChangeshiftRight: (e: any) => void;
    onChangeshiftDown: (e: any) => void;
    onChangeBlur: (e: any) => void;
    onChangeSpread: (e: any) => void;
}

const ShadowItem:React.FC<Props> = ({data, type, onMinus, onToggleShow, onChangeColor, onChangeInset, onChangeshiftRight, onChangeshiftDown, onChangeBlur, onChangeSpread}) => {
    return (
        <div className={classNames(s.shadowwrap, 'shadowwrap')}>
            <DragHandle />
            <div className={s.divide}>
              <div className={s.title} />
              <div className={s.menu}>
                <Button
                  size="small"
                  icon={<MinusOutlined onClick={onMinus} />}
                >删除</Button>
              </div>
            </div>
            <div className={classNames({ [s.hidden]: data.hiddenItem }, s.content)}>
              <Row className={s.row}>
                <Col span={12}>
                  <Color
                    label="投影颜色"
                    onChange={onChangeColor}
                    defaultColor={data.color}
                  />
                </Col>
                <Col span={12}>
                  {type !== "text" ? (
                    <Row>
                      <Col span={12}></Col>
                      <Col span={12} style={{textAlign: 'right'}}>
                        <Switch
                          checkedChildren="内阴影"
                          unCheckedChildren="内阴影"
                          checked={data.inset}
                          onChange={onChangeInset}
                        />
                      </Col>
                    </Row>
                  ) : null}
                </Col>
              </Row>
              <Row className={s.row}>
                <Col span={12}>
                  <UnitInput
                    label="横向偏移"
                    min={-1000}
                    max={1000}
                    defaultValue={data.shiftRight as any}
                    onChange={onChangeshiftRight}
                  />
                </Col>
                <Col span={12}>
                  <UnitInput
                    label="纵向偏移"
                    min={-1000}
                    max={1000}
                    defaultValue={data.shiftDown as any}
                    onChange={onChangeshiftDown}
                  />
                </Col>
              </Row>
              <Row className={s.row}>
                <Col span={12}>
                  <UnitInput
                    label="模糊"
                    min={-1000}
                    max={1000}
                    defaultValue={data.blur as any}
                    onChange={onChangeBlur}
                  />
                </Col>
                <Col span={12}>
                  {type !== "text" ? (
                    <UnitInput
                      label="扩展"
                      min={-1000}
                      max={1000}
                      defaultValue={data.spread as any}
                      onChange={onChangeSpread}
                    />
                  ) : null}
                </Col>
              </Row>
            </div>
          </div>
    )
}

export default SortableElement(ShadowItem)