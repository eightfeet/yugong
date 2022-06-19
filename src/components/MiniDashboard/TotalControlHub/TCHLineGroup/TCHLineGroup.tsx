import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button } from 'antd';
import React from 'react';
import s from './TCHLineGroup.module.scss';

interface Props {
  points: any[];
  line: string;
}

const TCHLineGroup:React.FC<Props> = ({points, line}) => {
  return (
    <div className={s.block}>
                <CloseOutlined className={s.minus} />
                <Form.Item label="如果节点" className={s.lineItem}>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <Select style={{ width: '40%' }} placeholder="请选择" >
                        {points.map((item, index) => <Select.Option key={index} value={`${line}_${item.point}`}>
                          {item.point}
                        </Select.Option>)}
                      </Select>
                    </Form.Item>
                    <div className={s.bridge}>的状态 =</div>
                    <Form.Item noStyle>
                      <Select style={{ width: '40%' }} placeholder="初始状态" suffixIcon={<div style={{fontSize: 14}}>时</div>}>
                        <Select.Option value="locked">锁定</Select.Option>
                        <Select.Option value="unlocked">解锁</Select.Option>
                      </Select>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                <Form.Item label="执行" className={s.lineItem}>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <Select style={{ width: '40%' }} placeholder="组件">
                        <Select.Option value="locked">锁定</Select.Option>
                        <Select.Option value="unlocked">解锁</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item noStyle>
                      <Select style={{ width: '40%' }} placeholder="方法">
                        <Select.Option value="locked">锁定</Select.Option>
                        <Select.Option value="unlocked">解锁</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item noStyle>
                      <Button
                        icon={<SettingOutlined />}
                        onClick={() => {}}
                      >
                        参数
                      </Button>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </div>
  )
}

export default TCHLineGroup;