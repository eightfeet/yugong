import { MinusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';
import Output from "~/components/Output";
import { useAsyncMemo } from '~/hooks/useAsyncMemo';
import { RootState } from '~/redux/store';
import { ExposeFunctions } from '~/types/modules';
import ArgumentsSetting from '../ArgumentsSetting';
import { EventDataList } from './EventGroup';
import s from './EventItem.module.less';
import MoveIcon from './MoveIcon';

interface Props { }

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

export interface ModuleListItem {
  type: string;
  name: string;
  uuid: string;
}

interface Props extends EventDataList {
  onChange: (data: EventDataList) => void;
  onMinus: () => void;
}

const EventItem: React.FC<Props> = ({
  onMinus,
  moduleUuid,
  dispatchedFunctions,
  onChange,
  ...props
}) => {
  const appData = useSelector((state: RootState) => state.appData);
  const [currentModuleUuid, setCurrentModuleUuid] = useState<string | undefined>(moduleUuid);

  const [form] = useForm();

  /**根据模块id来查询运行时模块清单选项 */
  const moduleList = useAsyncMemo(async () => {
    const list: ModuleListItem[] = [
      {
        name: '全局',
        uuid: 'global',
        type: 'global',
      },
    ];
    for (let index = 0; index < appData.length; index++) {
      const item = appData[index];
      // 检查可选模块是否有方法导出
      const res = await import(`../../../modules/${item.type}`);
      const { exposeFunctions } = res.default;
      if (exposeFunctions?.length) {
        list.push({
          name: item.moduleName || `'未标题'-${item.moduleId}`,
          uuid: item.moduleId,
          type: item.type,
        });
      }
    }
    return list;
  }, [appData]);

  /**根据模块id选项来查询模块下的方法 */
  const [functionList, setFunctionList] = useState<ExposeFunctions[]>([]);
  
  const getFunctionList = useCallback(async (currentModuleUuid) => {
    if (currentModuleUuid) {
      // 获取模块type
      const result: ModuleListItem | undefined = moduleList?.find(
        (item) => item.uuid === currentModuleUuid
      );
      if (!result) return;
      let exposeFunctions: ExposeFunctions[] = [];
      if (result.type !== "global") {
        const res = await import(`../../../modules/${result.type}`);
        exposeFunctions = res.default.exposeFunctions;
      } else {
        exposeFunctions = Output.exposeFunctions || [];
      }
      setFunctionList(exposeFunctions);
    }
  }, [moduleList]);

  useEffect(() => {
    if(moduleUuid) {
      getFunctionList(moduleUuid)
    }

  }, [moduleUuid, getFunctionList])
  
  const onChangeData = useCallback(
    () => {
      if (onChange instanceof Function) {
        const values = form.getFieldsValue();
        onChange(values);
      }
    },
    [form, onChange],
  )

  const onFieldsChange = useCallback((e) => {
    const { moduleUuid, dispatchedFunctions } = form.getFieldsValue();
    const { name } = e[0];
    const isDispatchedFunctions = name[0] === 'dispatchedFunctions';
    const isModuleUuid = name[0] === 'moduleUuid';

    if (isModuleUuid) {
      setCurrentModuleUuid(moduleUuid);
      getFunctionList(moduleUuid);
      form.setFieldsValue({ dispatchedFunctions: null })
    }

    if (isDispatchedFunctions) {
      const res = functionList.find(Item => Item.name === dispatchedFunctions);
      if (res?.arguments) form.setFieldsValue({arguments: res.arguments})
    }

    if (moduleUuid && dispatchedFunctions) {
      onChangeData();
    }
  }, [form, functionList, getFunctionList, onChangeData]);

  const onSaveArgs = useCallback(
    (e) => {
      setArgumentsVisible(false);
      form.setFieldsValue({ arguments: e });
      onChangeData();
    },
    [form, onChangeData],
  )

  const [argumentsVisiblet, setArgumentsVisible] = useState(false);
  const currentArguments = form.getFieldValue('arguments');
  
  return (
    <>
      <Form
        layout="inline"
        initialValues={{
          moduleUuid: currentModuleUuid,
          dispatchedFunctions,
          arguments: props.arguments || [],
        }}
        className={s.root}
        form={form}
        onFieldsChange={onFieldsChange}
        style={{marginBottom: 10}}
      >
        <Form.Item style={{ width: '2%' }}>
          <DragHandle />
        </Form.Item>
        <Form.Item style={{ width: '85%' }}>
          <Input.Group>
            <Form.Item noStyle name="moduleUuid">
              <Select
                className={s.selectmd}
                placeholder="请选择要操作的模块"
                showSearch
                filterOption={(input, option) => {
                  const str = option?.children?.join('').toLowerCase();
                  if (str?.indexOf(input) !== -1) {
                    return true;
                  }
                  return false;
                }}
              >
                {moduleList?.map((item) => (
                  <Select.Option key={item.uuid} value={item.uuid}>
                    {item.name}-{item.type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item noStyle name="dispatchedFunctions">
              <Select
                className={s.selectfn}
                placeholder="请选择方法"
              >
                {functionList?.map((item) => (
                  <Select.Option key={item.name} value={item.name}>
                    {item.description}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item noStyle name="arguments" ><Input hidden /></Form.Item>
            <Form.Item noStyle>
              <Button
                icon={<SettingOutlined />}
                onClick={() => setArgumentsVisible(true)}
                disabled={!currentArguments?.length}
                className={s.arg}
              >
                参数
              </Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item style={{ width: '2%', textAlign: 'center' }}>
          <Button
            size="small"
            icon={<MinusOutlined onClick={onMinus} />}
          />
        </Form.Item>
      </Form>
      <ArgumentsSetting
        title="参数设置"
        visible={argumentsVisiblet}
        onOk={onSaveArgs}
        argumentsData={currentArguments}
        initArgumentData={currentArguments}
        onCancel={() => setArgumentsVisible(false)}
      />
    </>
  );
};

export default SortableElement(EventItem);
