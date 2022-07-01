import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Output from '~/components/Output';
import { RootState } from '~/redux/store';
import { ArgumentsItem } from '~/types/appData';
import { ExposeFunctions } from '~/types/modules';
import { TCHProcessItemType } from '~/types/pageData';
import ArgumentsSetting from '../../ArgumentsSetting';
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
  onChange: (data: any) => void;
  onRemove?: () => void;
}

const TCHLineItem: React.FC<Props> = ({ points, process, line, onChange, onRemove=()=>{} }) => {
  const appData = useSelector((state: RootState) => state.appData);
  // 运行时可选模块清单
  const [moduleList, setModuleList] = useState<ModuleListItem[]>([]);
  // 运行时可选方法清单
  const [functionList, setFunctionList] = useState<ExposeFunctions[]>([]);
  // 节点状态
  const [status, setStatus] = useState<'locked' | 'unlocked'>();
  // 节点名称
  const [point, setPoint] = useState<string>();
  // 模块名
  const [module, setModule] = useState<string>();
  // 模块方法
  const [dispatch, setDispatch] = useState<string>();

  // 参数
  const [argumentsVisible, setArgumentsVisible] = useState(false);
  const [currentFunctionArguments, setCurrentFunctionArguments] =
    useState<ArgumentsItem[]>();
  const [currentFunctionStaticArguments, setCurrentFunctionStaticArguments] =
    useState<ArgumentsItem[]>();

  // 操作数据
  const handleChange = useCallback(
    (data: TCHProcessItemType) => {
      const res = {
        status,
        dispatch: `${module}/${dispatch}`,
        point,
        arguments: currentFunctionArguments,
        ...data
      };

      if (onChange instanceof Function) {
        onChange(res);
      }
    },
    [currentFunctionArguments, dispatch, module, onChange, point, status],
  )

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

  /**首次数据回填 */
  useEffect(() => {
    if (process.arguments) {
    }
    if (process.status) {
      setStatus(process.status);
    }
    if (process.dispatch) {
      const [module, dispatch] = process.dispatch.split('/') || [];
      if (module) {
        setModule(module);
        // 获取被选模块的方法清单
        getFunctionOptionsList(module);
      }

      if (dispatch) {
        setDispatch(dispatch);
      }

      if (process.arguments) {
        setCurrentFunctionArguments(process.arguments);
      }
    }

    if (process.point) {
      setPoint(process.point);
    }
  }, [getFunctionOptionsList, process]);

  /**
   * 模块被修改时，模块对应的方法要做同步修改
   */
  const onChangemoduleUuid = useCallback(
    (module: string) => {
      // 修改被选数据
      setModule(module);
      // 清理历史数据
      setCurrentFunctionStaticArguments(undefined);
      setDispatch(undefined);

      // 获取被选模块的方法清单
      getFunctionOptionsList(module);
      // 数据变更
      if (onChange instanceof Function) {
        // onChange(operateData);
      }
    },
    [getFunctionOptionsList, onChange],
  );

  /**
   * 修改方法
   */
  const onChangeDispatchedFunctions = useCallback(
    (dispatch: string) => {
      setDispatch(dispatch);
      const currentArgs = functionList.find(item => item.name === dispatch)?.arguments;
      if (currentArgs) setCurrentFunctionArguments(currentArgs);
      
      handleChange({
        dispatch,
        arguments: currentArgs
      })
    },
    [functionList, handleChange],
  );

  const onChangeStatus = useCallback((e) => {
    setStatus(e);
    handleChange({
      status: e
    })
  }, [handleChange]);

  const onChangePoint = useCallback((e) => {
    setPoint(e);
    handleChange({
      point: e
    })
  }, [handleChange]);

  const onSaveArgs = useCallback((args: ArgumentsItem[]) => {
    handleChange({
      arguments: args
    });
    setArgumentsVisible(false);
  }, [handleChange]);

  const onSetArg = useCallback(() => {
    setArgumentsVisible(true);
  }, []);

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
        value={module || null}
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
  }, [module, moduleList, onChangemoduleUuid]);

  return (
    <div className={s.block}>
      <CloseOutlined className={s.minus} onClick={onRemove} />
      <Form.Item
        label={<div className={s.label}>如果节点</div>}
        className={s.lineItem}
      >
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
      <Form.Item
        label={<div className={s.label}>执行</div>}
        className={s.lineItem}
      >
        <Input.Group compact>
          <Form.Item noStyle>{renderModuleSelect()}</Form.Item>
          <Form.Item noStyle>
            <Select
              value={dispatch || null}
              className={s.selecter}
              placeholder="请选择方法"
              onChange={onChangeDispatchedFunctions}
              disabled={!module}
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
            <Button icon={<SettingOutlined />} disabled={!module || !dispatch} onClick={onSetArg}>
              参数
            </Button>
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <ArgumentsSetting
        title="参数设置"
        visible={argumentsVisible}
        onOk={onSaveArgs}
        argumentsData={currentFunctionArguments}
        initArgumentData={currentFunctionStaticArguments}
        onCancel={() => setArgumentsVisible(false)}
      />
    </div>
  );
};

export default TCHLineItem;
