import { Button, Checkbox, Col, Input, Modal, ModalProps, Row, Switch } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import s from './ValueEnumModal.module.scss';

export interface valueEnumType {
  [field: string]: {
    text?: string;
    disabled?: boolean;
  }
}

interface Props {
  valueEnum?: valueEnumType;
  onConfirm: (value: valueEnumType) => void;
}

const ValueEnumModal: React.FC<Props & ModalProps> = ({ valueEnum, onOk, onConfirm, ...other }) => {
  const [enumData, setEnumData] = useState<valueEnumType>({});

  useEffect(() => {
    if (valueEnum) {
      setEnumData(valueEnum)
    }
  }, [valueEnum])
  

  const onPlus = useCallback(
    () => {
      setEnumData(enumData => {
        const newData = cloneDeep(enumData);
        const length = Object.keys(newData).length;
        newData[`field${length + 1}`] = {
          text: `字段${length + 1}`
        }
        return newData;
      })
    },
    [],
  )

  const onMinus = useCallback(
    (key: string) => {
      setEnumData(enumData => {
        const newData = cloneDeep(enumData);
        delete newData[key];
        return newData
      })
    },
    [],
  )
  
  const handleDisabled =  useCallback(
    (key: string, value: boolean) => {
      setEnumData(enumData => {
        const newData = cloneDeep(enumData);
        newData[key].disabled = value;
        return newData
      })
    },
    [],
  )

  const handleOk = useCallback(
    (e) => {
      if(typeof onOk === 'function') onOk(e);
      if(typeof onConfirm === 'function' && enumData) onConfirm(enumData);
    },
    [onConfirm, onOk, enumData],
  )
  
  return (
    <div>
      <Modal onOk={handleOk} {...other}>
        <Button onClick={onPlus}>新增属性</Button>
        {
          Object.keys(enumData).map((key, index) => <Row key={`${key}${index}`} className={s.formitem}>
            <Col>
              名称/字段：
            </Col>
            <Col>
              <Input.Group compact>
                <Input name='text' value={enumData[key].text} className={s.inp} placeholder="名称" />
                <Input name='all' value={key} className={s.inp} placeholder="字段" />
                <div className={s.checkbox}>
                  <Checkbox checked={enumData[key].disabled} onChange={(e) => handleDisabled(key, e.target.checked)}>禁用</Checkbox>
                </div>
                <Button onClick={() => onMinus(key)}>删除</Button>
              </Input.Group>
            </Col>
          </Row>)
        }
      </Modal>
    </div>
  )
}

export default ValueEnumModal;
