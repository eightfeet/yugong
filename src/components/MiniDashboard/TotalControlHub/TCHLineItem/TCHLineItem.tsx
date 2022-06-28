import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Output from '~/components/Output';
import { RootState } from '~/redux/store';
import { ExposeFunctions } from '~/types/modules';
import { TCHProcessItemType } from '~/types/pageData';
import {
  EventEmitterExpose,
  ModuleListItem,
} from '../../EventsSetting/EventItem';
import s from './TCHLineItem.module.scss';

interface Props {
  /**TCH */
  points: any[];
  process: TCHProcessItemType;
  line: string;
  onSetArg: () => void;
  onChange: (data: any) => void;
}

const TCHLineItem: React.FC<Props> = ({ points, process, line, onSetArg, onChange }) => {
  const [selectItem, setSelectItem] = useState<any[]>([]);
  /**
   * 运行时可选模块清单
   */
  const [moduleList, setModuleList] = useState<ModuleListItem[]>([]);
  /**
   * 运行时可选方法清单
   */
  const [functionList, setFunctionList] = useState<ExposeFunctions[]>([]);

  const [status, setStatus] = useState();
  const [point, setPoint] = useState();


  const appData = useSelector((state: RootState) => state.appData);

  const [module, setModule] = useState<string>();
  const [dispatch, setDispatch] = useState<string>();

  console.log('process====', process);

  useEffect(() => {
    if (process.arguments) {}
    if (process.status) {}
    if (process.dispatch) {
      const [ module, dispatch ] = process.dispatch.split('/') || [];
      if (module) {
        setModule(module)
      }

      if (dispatch) {
        setDispatch(dispatch)
      }
    }
  }, [process])
  
  

  /**
   * 通过所有运行时模块id
   * 找出包含有方法导出的模块
   * 保存到可选模块清单
   */
  const getFunctionOptionsList = useCallback(
    // 根据被选模块获取模块方法清单
    (moduleUuid: string) => {
      // 获取模块type
      const result: ModuleListItem | undefined = moduleList.find(
        (item) => item.uuid === moduleUuid,
      );
      if (!result) return;
      let exposeFunctions: EventEmitterExpose[] = [];
      if (result.type !== 'global') {
        exposeFunctions = require(`~/modules/${result.type}`).default
          .exposeFunctions;
      } else {
        exposeFunctions = Output.exposeFunctions || [];
      }
      setFunctionList(exposeFunctions);
    },
    [moduleList],
  );

  /**
   * 模块被修改时，模块对应的方法要做同步修改
   */
  const onChangemoduleUuid = useCallback(
    (data: string) => {
      // 修改被选数据
      const operateData = [...selectItem];
      operateData[0] = data;
      operateData[1] = '';
      setSelectItem(operateData);
      // 获取被选模块的方法清单
      getFunctionOptionsList(data);
      console.log('data', data);
      
      // 数据变更
      if (onChange instanceof Function) {
        onChange(operateData);
      }
    },
    [selectItem, getFunctionOptionsList, onChange],
  );

  /**
   * 修改方法
   */
   const onChangeDispatchedFunctions = useCallback(
    (data: string) => {
      const operateData = [...selectItem];
      operateData[1] = data;
      setSelectItem(operateData);
      if (onChange instanceof Function) {
        onChange(operateData);
      }
    },
    [onChange, selectItem]
  );

  const onChangeStatus = useCallback(
    (e) => {
      setStatus(e)
    },
    [],
  )


  const onChangePoint = useCallback(
    (e) => {
      setPoint(e)
    },
    [],
  )
  
  

  /**
   * 初始化运行时模块清单，
   * 仅包含有方法导出的模块
   */
  useEffect(() => {
    // 处理全局方法
    const data: ModuleListItem[] = [
      {
        name: '全局',
        uuid: 'global',
        type: 'global',
      },
    ];
    for (let index = 0; index < appData.length; index++) {
      const item = appData[index];
      // 检查可选模块是否有方法导出
      const exposeFunctions: EventEmitterExpose[] =
        require(`~/modules/${item.type}`).default.exposeFunctions;
      if (exposeFunctions && exposeFunctions.length > 0) {
        data.push({
          name: item.moduleName || `'未标题'-${item.moduleId}`,
          uuid: item.moduleId,
          type: item.type,
        });
      }
    }
    setModuleList(data);
  }, [appData]);

  const renderModuleSelect = useCallback(() => {
    return (
      <Select
        value={selectItem[0] || null}
        style={{ width: '40%' }}
        showSearch
        placeholder="请选择"
        onChange={onChangemoduleUuid}
        filterOption={(input, option) => {
          const str = option?.children?.join('').toLowerCase();
          if (str?.indexOf(input) !== -1) {
            return true;
          }
          return false;
        }}
      >
        {moduleList.map((item) => (
          <Select.Option key={item.uuid} value={item.uuid}>
            {item.name}-{item.type}
          </Select.Option>
        ))}
      </Select>
    );
  }, [moduleList, onChangemoduleUuid, selectItem]);

  return (
    <div className={s.block}>
      <CloseOutlined className={s.minus} />
      <Form.Item label={<div className={s.label}>如果节点</div>} className={s.lineItem}>
        <Input.Group compact>
          <Form.Item noStyle>
            <Select
              style={{ width: '46%' }}
              showSearch
              placeholder="请选择"
              suffixIcon={<div style={{ fontSize: 14 }}>节点</div>}
              value={point}
              onChange={onChangePoint}
            >
              {points.map((item) => (
                <Select.Option key={item.point} value={item.point}>
                  {item.point}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div className={s.bridge}>=</div>
          <Form.Item noStyle>
            <Select
              style={{ width: '45%' }}
              placeholder="初始状态"
              value={status}
              suffixIcon={<div style={{ fontSize: 14 }}>时</div>}
              onChange={onChangeStatus}
            >
              <Select.Option value="locked">被锁定</Select.Option>
              <Select.Option value="unlocked">被解锁</Select.Option>
            </Select>
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item label={<div className={s.label}>执行</div>} className={s.lineItem}>
        <Input.Group compact>
          <Form.Item noStyle>{renderModuleSelect()}</Form.Item>
          <Form.Item noStyle>
            <Select
              value={selectItem[1] || null}
              className={s.selecter}
              placeholder="请选择方法"
              onChange={onChangeDispatchedFunctions}
            >
              {functionList.map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.description}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item noStyle>
            {/** 未选择方法时不可以编辑参数 */}
            <Button
              icon={<SettingOutlined />}
              onClick={onSetArg}
            >
              参数
            </Button>
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </div>
  );
};

export default TCHLineItem;
