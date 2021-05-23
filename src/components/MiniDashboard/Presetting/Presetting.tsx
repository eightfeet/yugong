import { Col, Input, PageHeader, Row, Tooltip } from "antd";
import deepEqual from "deep-equal";
import { cloneDeep } from "lodash";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "~/hooks/useLocalStorage";
import usePostMessage from "~/hooks/usePostMessage";
import { Dispatch, RootState } from "~/redux/store";
import { AppDataLayoutItemTypes } from "~/types/appData";
import { EventsTypeItem, ExposeEvents, ExposeFunctions, Modules } from "~/types/modules";
import ArrayArguments from "../ArgumentsSetting/ArrayArguments";
import BooleanArguments from "../ArgumentsSetting/BooleanArguments";
import HtmlSuffix from "../ArgumentsSetting/HtmlSuffix";
import MixedArguments from "../ArgumentsSetting/MixedArguments";
import ObjectArguments from "../ArgumentsSetting/ObjectArguments";
import s from "./Presetting.module.less";

interface Props {}
interface OnChangeProps {
  /** 数据索引值 */ 
  index: number;
  /** 参数索引 */
  argIndex: number;
  /** 参数索引对应的参数值 */ 
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

  const appData = useSelector((state: RootState) => state.appData);
  const [, setLocalStorage] = useLocalStorage("appData", null);

  const { events, type, moduleId } = activationItem;

  const module: Modules<any> = useMemo(
    () => (!!type ? require(`~/modules/${type}`).default : {}),
    [type]
  );

  const dispatch = useDispatch<Dispatch>();
  const sendMessage = usePostMessage(() => {});

  // 获取当前运行时模块已配置的内置方法
  const setFunctions = useMemo(() => events?.mount || [], [events?.mount]);

  // 获取当前模块类导出的内置方法，
  const exposeFunctions: ExposeFunctions[] = useMemo(() => module.exposeFunctions || [], [module.exposeFunctions]);
  // 事件更新
  const onPlay = useCallback(
    (data: EventsTypeItem[]) => {
      const win = (document.getElementById('wrapiframe') as HTMLIFrameElement)
            .contentWindow;
      sendMessage(
        {
            tag: 'playEventEmit',
            value: {
              event: {name: "mount", description: "初始化"},
              args: data
            },
        },
        win
    );
    },
    [sendMessage],
  )
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
        dispatch.appData.updateAppData(operateData);
        setLocalStorage(operateData);
    },
    [appData, dispatch.activationItem, dispatch.appData, setLocalStorage],
  )
  

  /**
   * 合并三块数据、组件内部，运行时、以及编辑后的数据
   * 组件内部数据是最全面的预设编辑数据，所以以他为预设的配置显示基准
   * 而最完整的预设编辑数据的初始值包含内组件部默认数据，运行时mount事件中包含的数据，而运行时数据需要剔除非组件内部属性数据，
   * 编辑完成后再剔除未配置的数据把配置好的数据返回到运行时数据中
   */

  // step1、设置编辑前数据
  // 运行时mount数据剔除非当前模块数据
  // todo检查元素参数为何为空！！！
  const getData = useCallback(() => {
    const copyData =  cloneDeep(exposeFunctions);
    const result: ExposeFunctions[] =
    copyData.map((item) => {
        setFunctions.some((setItem) => {
          const [, fun] = setItem.name.split("/");
          if (fun === item.name && setItem.arguments?.length) {
            item.arguments = setItem.arguments;
            return true;
          }
          return false;
        });
        return item;
      }) || [];

    return result;
  }, [exposeFunctions, setFunctions]);

  const runningData = getData();
  const onChange = useCallback(
    ({index, argIndex, value}: OnChangeProps) => {
      let data = [...runningData];
      
      if (data[index].arguments) {
        data[index].arguments![argIndex] = value;
      }
      // 从编辑器预设面板获取当前已设置的值data；
      // 将预设值回填给运行时运行时mount数据；
      // 第一步判断预设值有没有被编辑过；
      data = data.filter((item, index) => !deepEqual(item.arguments, exposeFunctions[index].arguments))  || [];
      
      // 得到需要更新的data数据，将他合并到运行时mount数据；
      let operateData = cloneDeep(setFunctions).reverse();
      if (operateData.length) {
        operateData.forEach(({name}, operateIndex) => {
          const [id, fn] = name.split('/');
          let gotIt = false;
          if (id === moduleId) {
            data.forEach((dataItem) => {
              if (fn === dataItem.name) {
                operateData[operateIndex].arguments = dataItem.arguments || []
                gotIt = true;
              }
            })
          }
          if (gotIt) return true;
        });
      } else if (data.length) {
        data.forEach(item => {
          operateData.push({
            name: `${moduleId}/${item.name}`,
            arguments: item.arguments || []
          });
        });
      }
      operateData = operateData.reverse();

      const operateActData = cloneDeep(activationItem);
      operateActData.events!.mount = operateData;
      updateActDataToAll(operateActData);
      
      onPlay(operateData);
    },
    [activationItem, exposeFunctions, moduleId, onPlay, runningData, setFunctions, updateActDataToAll]
  );

  if (!moduleId) {
    return null;
  }

  return (
    <div>
      {runningData.map((item, index) =>
        !!item.arguments?.length ? (
          <div key={index} className={s.item}>
            <PageHeader title={item.description} />
            {item.arguments?.map((argItem, argIndex) => (
              <Row className={s.row} key={argIndex} gutter={10}>
                <Col span={5} className={s.label}>
                  <Tooltip placement="topRight" title={argItem.describe}>
                    {argItem.name}
                  </Tooltip>
                </Col>
                <Col span={19}>
                  {argItem.type === "number" ||
                  argItem.type === "string" ||
                  argItem.type === "runningTime" ? (
                    <Input
                      onChange={(e) =>
                        onChange({
                          index, // 数据索引值
                          argIndex, // 参数索引
                          value: { // 参数索引对应的参数值
                            ...argItem,
                            data: e.target.value} 
                        })
                      }
                      placeholder={`请输入值,${argItem.describe || ""}`}
                      value={argItem.data}
                      type="text"
                      suffix={!!argItem.html ? <HtmlSuffix /> : null}
                    />
                  ) : null}
                  {argItem.type === "array" ? (
                    <ArrayArguments
                      typeArguments={argItem}
                      flexible
                      htmlInput={!!argItem.html}
                      onChange={(value) => onChange({index, argIndex, value})}
                    />
                  ) : null}
                  {argItem.type === "boolean" ? (
                    <BooleanArguments
                      typeArguments={argItem}
                      flexible={false}
                      onChange={(value) => onChange({index, argIndex, value})}
                    />
                  ) : null}
                  {argItem.type === "object" ? (
                    <ObjectArguments
                      describe={argItem.describe}
                      htmlInput={!!argItem.html}
                      onChange={(value) => onChange({index, argIndex, value})}
                      typeArguments={argItem}
                      flexible={false}
                    />
                  ) : null}
                  {argItem.type === "mixed" ? (
                    <MixedArguments
                      onChange={(value) => onChange({index, argIndex, value})}
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


