import { Button, Checkbox, Col, Input, Modal, ModalProps, Row, } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import s from './ValueEnumModal.module.scss';

export interface valueEnumType {
  [filed: string]: {
    text?: string;
    disabled?: boolean;
  }
}

interface Props {
  valueEnum?: valueEnumType;
  onConfirm: (value: valueEnumType) => void;
}

const ValueEnumModal: React.FC<Props & ModalProps> = ({ valueEnum, onOk, onConfirm, ...other }) => {
  const [fileds, setFileds] = useState<string[]>([]);
  const [text, setText] = useState<(string|undefined)[]>([]);
  const [disableds, setDisableds] = useState<boolean[]>([]);

  useEffect(() => {
    if (valueEnum) {
      const initFileds:string[] = [];
      const initText:(string|undefined)[] = [];
      const initDisableds:boolean[] = [];
      Object.keys(valueEnum).forEach(key => {
        const element = valueEnum[key];
        initFileds.push(key);
        initText.push(element.text);
        initDisableds.push(!!element.disabled);
      });
      setFileds(initFileds)
    }
  }, [valueEnum])
  

  const onPlus = useCallback(
    () => {
      setFileds(datas => {
        const newData = cloneDeep(datas);
        newData.push(`filed${newData.length}`);
        return newData;
      })
      setText(datas => {
        const newData = cloneDeep(datas);
        newData.push(`字段${newData.length}`);
        return newData;
      })
      setDisableds(datas => {
        const newData = cloneDeep(datas);
        newData.push(false);
        return newData;
      })
    },
    [],
  )

  const onMinus = useCallback(
    (index: number) => {
      setFileds(data => data.filter((item, ind) => index !== ind));
      setText(data => data.filter((item, ind) => index !== ind));
      setDisableds(data => data.filter((item, ind) => index !== ind));
    },
    [],
  )
  
  const handleDisabled = useCallback(
    (index: number, value: any) => {
      setDisableds(data => {
        const newData = cloneDeep(data)
        newData[index] = value;
        return newData
      })
    },
    [],
  )

  const handleOk = useCallback(
    (e) => {
      const enumData = {};
      fileds.forEach((key, index) => {
        if (key) {
          enumData[key] = {
            text: text[index],
            disabled: disableds[index]
          }
        }
      })
      if(typeof onOk === 'function') onOk(e);
      if(typeof onConfirm === 'function' && enumData) onConfirm(enumData);
    },
    [fileds, onOk, onConfirm, text, disableds],
  )

  const handleText = useCallback(
    (index: number, text: any) => {
      setText(data => {
        const newData = cloneDeep(data)
        newData[index] = text;
        return newData
      })
    },
    [],
  )

  const handleFiled = useCallback(
    (index: number, value: any) => {
      setFileds(data => {
        const newData = cloneDeep(data)
        newData[index] = value;
        return newData
      })
    },
    [],
  )
  
  return (
    <div>
      <Modal onOk={handleOk} {...other}>
        <Button onClick={onPlus}>新增属性</Button>
        {
          fileds.map((filed, index) => <Row key={index} className={s.formitem}>
            <Col>
              名称/字段：
            </Col>
            <Col>
              <Input.Group compact>
                <Input name='text' onChange={e => handleText(index, e.target.value)} value={text[index]} className={s.inp} placeholder="名称" />
                <Input name='all'  onChange={(e) => handleFiled(index, e.target.value)} value={fileds[index]} className={s.inp} placeholder="字段" />
                <div className={s.checkbox}>
                  <Checkbox checked={disableds[index]} onChange={(e) => handleDisabled(index, e.target.checked)}>禁用</Checkbox>
                </div>
                <Button onClick={() => onMinus(index)}>删除</Button>
              </Input.Group>
            </Col>
          </Row>)
        }
      </Modal>
    </div>
  )
}

export default ValueEnumModal;
