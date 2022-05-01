import { Col, Input, PageHeader, Row, Select, Tooltip } from 'antd';
import deepEqual from 'deep-equal';
import parse from 'html-react-parser';
import { cloneDeep } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDesc } from '~/core/constants';
import produce from '~/core/helper/produce';
import useLocalStorage from '~/hooks/useLocalStorage';
import usePostMessage from '~/hooks/usePostMessage';
import { Dispatch, RootState } from '~/redux/store';
import { AppDataLayoutItemTypes, ArgumentsNumber, ArgumentsString } from '~/types/appData';
import { EventsTypeItem, ExposeFunctions, Modules } from '~/types/modules';
import ArrayArguments from '../ArgumentsSetting/ArrayArguments';
import BooleanArguments from '../ArgumentsSetting/BooleanArguments';
import HtmlSuffix from '../ArgumentsSetting/HtmlSuffix';
import MixedArguments from '../ArgumentsSetting/MixedArguments';
import ObjectArguments from '../ArgumentsSetting/ObjectArguments';
import s from './Presetting.module.less';

interface Props { }
interface OnChangeProps {
  /* 数据索引值 */
  index: number;
  /* 参数索引 */
  argIndex: number;
  /* 参数索引对应的参数值 */
  value: any;
}
/**
 * 所有预设事件将在挂载时运行，
 * 其根本还是EventEmitter对事件流控制，
 * 作为预设模块只操作组件自己的内置方法
 * */

const Presetting: React.FC<Props> = () => {
  // 获取当前激活组件信息
  const activationItem = useSelector(
    (state: RootState) => state.activationItem
  );
  const { events, type, moduleId } = activationItem;

  // 获取当前appdata数据准备数据更新方法
  const appData = useSelector((state: RootState) => state.appData);
  const [, setLocalStorage] = useLocalStorage('appData', null);
  const dispatch = useDispatch<Dispatch>();

  // 获取runningtime的属性集合
  const runningTimes = useSelector((state: RootState) => state.runningTimes);

  // 数据更新
  const updateActDataToAll = useCallback(
    (actData: AppDataLayoutItemTypes) => {
      dispatch.activationItem.updateActivationItem(actData);
      const operateData = [...appData].map((item) => {
        if (item.moduleId === actData.moduleId) {
          return actData;
        }
        return item;
      });
      dispatch.appData.updateAppData(produce(operateData, undefined, createDesc('修改组件', `${actData.moduleName || actData.moduleId} 预设`)));
      setLocalStorage(operateData);
    },
    [appData, dispatch.activationItem, dispatch.appData, setLocalStorage]
  );

  // 获取当前模块
  const module: Modules<any> = useMemo(
    () => (!!type ? require(`~/modules/${type}`).default : {}),
    [type]
  );
  // 获取当前运行时模块已配置的内置方法
  const setFunctions = useMemo(() => events?.mount || [], [events?.mount]);
  // 获取当前模块类导出的内置方法，
  const exposeFunctions: ExposeFunctions[] = useMemo(
    () => module.exposeFunctions || [],
    [module.exposeFunctions]
  );

  // 执行事件
  const sendMessage = usePostMessage(() => { });
  const onPlay = useCallback(
    (data: EventsTypeItem[]) => {
      const win = (
        document.getElementById('wrapiframe') as HTMLIFrameElement
      ).contentWindow;
      sendMessage(
        {
          tag: 'playEventEmit',
          value: {
            event: { name: 'mount', description: '初始化' },
            args: data,
          },
        },
        win
      );
    },
    [sendMessage]
  );

  /**
   * 处理业务逻辑
   * 合并三块数据、组件内部，运行时、以及编辑后的数据
   * 组件内部数据是最全面的预设编辑数据，所以以他为预设的配置显示基准
   * 而最完整的预设编辑数据的初始值包含内组件部默认数据，运行时mount事件中包含的数据，而运行时数据需要剔除非组件内部属性数据，
   * 编辑完成后再剔除未配置的数据把配置好的数据返回到运行时数据中
   */

  // step1、设置预设编辑数据
  // 运行时mount数据剔除非当前模块数据
  const getData = useCallback(() => {
    // 深拷一份组件内部可预设数据 和组件运行时数据
    const copyExposeFunctions = cloneDeep(exposeFunctions).filter(
      (item) => item.presettable !== false
    );
    const copySetFunctions = cloneDeep(setFunctions);

    const result: ExposeFunctions[] =
      copyExposeFunctions.map((staticItem) => {
        // copyExposeFunctions是用于即将预设的静态方法
        // 断言运行时方法是否有维护当前方法关联的数据，这里使用倒序从后至依次断言，如果有数据，将最后一条数据收集给预设数据
        copySetFunctions.reverse().some((setItem) => {
          const [, funName] = setItem.name.split('/');
          if (
            funName === staticItem.name &&
            Array.isArray(setItem.arguments)
          ) {
            staticItem.arguments = setItem.arguments;
            return true;
          }
          return false;
        });
        return staticItem;
      }) || [];

    return result;
  }, [exposeFunctions, setFunctions]);

  // step2、获取预设数据 保存预设面板数据，用于页面render
  const runningData = getData();

  // step3、数据变更
  const onChange = useCallback(
    ({ index, argIndex, value }: OnChangeProps) => {

      let copyRunningData = cloneDeep(runningData);

      // 当前编辑数据赋值
      if (copyRunningData[index].arguments) {
        copyRunningData[index].arguments![argIndex] = value;
      }

      // 从编辑器预设面板获取当前已设置的值copyRunningData；
      // 将预设值回填给运行时运行时mount数据；
      // step1、判断预设数据值有没有被编辑过，抽取被编辑过的数据
      // (判断依据：预设数据和组件静态数据是否保持一至)；
      const readyToSetting: EventsTypeItem[] = [];
      copyRunningData.forEach((item, index) => {
        if (
          !deepEqual(
            item.arguments,
            exposeFunctions[index].arguments
          ) ||
          !item.arguments?.[index]?.data
        ) {
          readyToSetting.push({
            name: `${moduleId}/${item.name}`,
            arguments: item.arguments || [],
          });
        }
      });


      // step2、将抽取的数据更新到运行时mount数据；
      // 深拷一份当前组件运行时数据 activationItem
      const copyModuleData = cloneDeep(activationItem);

      // 没有初始化事件时
      if (!copyModuleData.events?.mount) {
        // 还未定义mount事件
        if (!copyModuleData.events) {
          copyModuleData.events = {};
        }
        // 给运行时追加准备数据
        copyModuleData.events.mount = readyToSetting;
      } else {
        // 有初始化事件
        // 倒序是为了匹配最末一条
        const mount = [...copyModuleData.events.mount].reverse();
        // 需要从mount中替换当前最新值
        const currentName = `${moduleId}/${exposeFunctions[index].name}`;
        mount.some(item => {
          if (item.name === currentName) {
            item.arguments.forEach((itemarg, itemargindex) => {
              if (itemarg.fieldName === value.fieldName) {
                item.arguments[itemargindex] = value;
              }
            })
            return true
          }
          return false
        })
        // 遍历ready数据
        readyToSetting.forEach((readyItem) => {
          // 是否数据覆盖
          let isCove: boolean = false;
          mount.some((mountItem) => {
            if (mountItem.name === readyItem.name) {
              mountItem.arguments = readyItem.arguments;
              // 覆盖旧值
              isCove = true;
              return true;
            }
            return false;
          });
          // 如果没有覆盖旧值则追加到mount数据上
          if (!isCove) {
            mount.unshift(readyItem);
          }
        });

        copyModuleData.events.mount = mount.reverse();
      }

      // 更新且播放所有内部事件
      updateActDataToAll(copyModuleData);
      onPlay(copyModuleData.events.mount);
    },
    [
      activationItem,
      exposeFunctions,
      moduleId,
      onPlay,
      runningData,
      updateActDataToAll,
    ]
  );

  if (!moduleId) {
    return null;
  }

  const renderNumberString = (
    index: number,
    argItem: ArgumentsString | ArgumentsNumber,
    argIndex: number,
  ) => {
    // 下拉选择形式
    if (argItem?.select) {
      const { select } = argItem;
      const keys = Object.keys(select);
      return <Select
        onChange={
          (e) =>
            onChange({
              index, // 数据索引值
              argIndex, // 参数索引
              value: {
                // 参数索引对应的参数值
                ...argItem,
                data: e,
              },
            })
        }
        value={argItem.data}
        className={s.select}
        placeholder={`请输入值,${argItem.describe || ''}`}
      >
        {
          keys.map((value) => <Select.Option key={value} value={value}>{
            select[value]
          }</Select.Option>)
        }
      </Select>
    }
    // 输入框形式
    return <Input
      onChange={(e) =>
        onChange({
          index, // 数据索引值
          argIndex, // 参数索引
          value: {
            // 参数索引对应的参数值
            ...argItem,
            data: e.target.value,
          },
        })
      }
      placeholder={`请输入值,${argItem.describe || ''
        }`}
      value={argItem.data}
      type="text"
      suffix={
        !!argItem.html ? (
          <HtmlSuffix />
        ) : null
      }
    />
  };

  return (
    <div>
      {runningData.map((item, index) =>
        !!item.arguments?.length && item.presettable !== false ? (
          <div key={index} className={s.item}>
            <PageHeader title={item.description} />
            {item.arguments?.map((argItem, argIndex) => (
              <Row className={s.row} key={argIndex} gutter={10}>
                <Col span={5} className={s.label}>
                  <Tooltip
                    placement="topRight"
                    title={parse(argItem.describe || '')}
                  >
                    {argItem.name}
                  </Tooltip>
                </Col>
                
                  <Col span={19}>
                    {argItem.type === 'number' ||
                      argItem.type === 'string' ? renderNumberString(index, argItem, argIndex) : null}

                    {argItem.type === 'runningTime' ? (
                      <Select
                        className={s.select}
                        placeholder="请选择"
                        showSearch
                        value={argItem.data}
                        optionFilterProp="children"
                        filterOption={
                          (input, option) => {
                            const childrens = (Array.isArray(option?.children) ? option?.children.join('') : option?.children)?.toLowerCase();
                            if (childrens?.indexOf(input) !== -1) {
                              return true;
                            }
                            return false;
                          }
                          // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(e) =>
                          onChange({
                            index, // 数据索引值
                            argIndex, // 参数索引
                            value: {
                              // 参数索引对应的参数值
                              ...argItem,
                              data: e,
                            },
                          })
                        }
                      >
                        {Object.keys(runningTimes)?.map(
                          (item, index) => (
                            <Select.Option key={index} value={item}>
                              {item}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    ) : null}

                    {argItem.type === 'array' ? (
                      <ArrayArguments
                        typeArguments={argItem}
                        flexible
                        htmlInput={!!argItem.html}
                        onChange={(value) =>
                          onChange({
                            index,
                            argIndex,
                            value,
                          })
                        }
                      />
                    ) : null}
                    {argItem.type === 'boolean' ? (
                      <BooleanArguments
                        typeArguments={argItem}
                        flexible={false}
                        onChange={(value) =>
                          onChange({
                            index,
                            argIndex,
                            value,
                          })
                        }
                      />
                    ) : null}
                    {argItem.type === 'object' ? (
                      <ObjectArguments
                        describe={argItem.describe}
                        htmlInput={!!argItem.html}
                        onChange={(value) =>
                          onChange({
                            index,
                            argIndex,
                            value,
                          })
                        }
                        typeArguments={argItem}
                        flexible={false}
                      />
                    ) : null}
                    {argItem.type === 'mixed' ? (
                      <MixedArguments
                        onChange={(value) =>
                          onChange({
                            index,
                            argIndex,
                            value,
                          })
                        }
                        typeArguments={argItem}
                        flexible={false}
                      />
                    ) : null}
                  </Col>
              </Row>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
};

export default Presetting;
