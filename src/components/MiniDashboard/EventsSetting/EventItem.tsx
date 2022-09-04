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
  arguments: injectArgs,
  onChange,
}) => {
  const appData = useSelector((state: RootState) => state.appData);
  const [currentModuleUuid, setCurrentModuleUuid] = useState<string>(moduleUuid);
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
      const res = await import(`../../../modules/${item.type}/index.ts`);
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
  }, [currentModuleUuid]);

  /**根据模块id选项来查询模块下的方法 */
  const [functionList, setFunctionList] = useState<ExposeFunctions[]>([])
  const getFunctionList = useCallback(async (currentModuleUuid) => {
    if (currentModuleUuid) {
      // 获取模块type
      const result: ModuleListItem | undefined = moduleList?.find(
        (item) => item.uuid === currentModuleUuid
      );
      if (!result) return;
      let exposeFunctions: ExposeFunctions[] = [];
      if (result.type !== "global") {
        const res = await import(`../../../modules/${result.type}/index.ts`);
        exposeFunctions = res.default.exposeFunctions;
      } else {
        exposeFunctions = Output.exposeFunctions || [];
      }
      setFunctionList(exposeFunctions);
    }
  }, [moduleList]);

  useEffect(() => {
    getFunctionList(currentModuleUuid);
  }, [getFunctionList, currentModuleUuid]);

  const [currentDispatchedFunctions, setCurrentDispatchedFunctions] = useState<string>();
  const onFieldsChange = useCallback(() => {
    const { moduleUuid } = form.getFieldsValue();
    if (currentModuleUuid !== moduleUuid) {
      form.setFieldsValue({ dispatchedFunctions: null })
    }
    const { dispatchedFunctions } = form.getFieldsValue();
    setCurrentDispatchedFunctions(dispatchedFunctions);
    setCurrentModuleUuid(moduleUuid);
  }, [currentModuleUuid, form]);

  const onSaveArgs = useCallback(
    (e) => {
      setArgumentsVisible(false)
      form.setFieldsValue({ arguments: e })
      if (onChange instanceof Function) {
        const values = form.getFieldsValue();
        onChange(values);
      }
    },
    [form, onChange],
  )

  const [argumentsVisiblet, setArgumentsVisible] = useState(false);
  const { arguments: args } = functionList.find(Item => Item.name === currentDispatchedFunctions || dispatchedFunctions) || {};

  useEffect(() => {
    if (currentDispatchedFunctions && currentModuleUuid && !args?.length) {
      onChange({
        moduleUuid: currentModuleUuid,
        dispatchedFunctions: currentDispatchedFunctions
      })
    }
  }, [currentModuleUuid, currentDispatchedFunctions, onChange, args?.length])
    
  return (
    <>
      <Form
        layout="inline"
        initialValues={{
          moduleUuid: currentModuleUuid,
          dispatchedFunctions,
          arguments: injectArgs,
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
            <Form.Item noStyle>
              <Button
                icon={<SettingOutlined />}
                onClick={() => setArgumentsVisible(true)}
                disabled={!args?.length}
                className={s.arg}
              >
                参数
              </Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item noStyle name="arguments" ><Input hidden /></Form.Item>
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
        argumentsData={injectArgs}
        initArgumentData={injectArgs?.length ? injectArgs : args}
        onCancel={() => setArgumentsVisible(false)}
      />
    </>
  );
};

export default SortableElement(EventItem);
