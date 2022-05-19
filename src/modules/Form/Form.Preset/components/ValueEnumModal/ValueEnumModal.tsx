import { Button, Checkbox, Col, Input, Modal, ModalProps, Row, Switch } from 'antd';
import React from 'react';
import s from './ValueEnumModal.module.scss';

interface Props {
  
}

const ValueEnumModal:React.FC<Props & ModalProps> = ({...other}) => {
  return (
    <div>
      <Modal {...other}>
        <Button>新增属性</Button>
        <Row className={s.formitem}>
          <Col>
            名称/字段：
          </Col>
          <Col>
            <Input.Group compact>
              <Input name='text' className={s.inp} placeholder="名称" />
              <Input name='all' className={s.inp} placeholder="字段" />
              <div className={s.checkbox}>
                <Checkbox onChange={() => {}}>禁用</Checkbox>
              </div>
              <Button >删除</Button>
            </Input.Group>
          </Col>
        </Row>
        
      </Modal>
    </div>
  )
}

export default ValueEnumModal;
