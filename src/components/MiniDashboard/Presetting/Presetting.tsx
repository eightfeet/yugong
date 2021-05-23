import { Col, Input, PageHeader, Row, Tooltip } from "antd";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { ExposeFunctions, Modules } from "~/types/modules";
import ArrayArguments from "../ArgumentsSetting/ArrayArguments";
import BooleanArguments from "../ArgumentsSetting/BooleanArguments";
import HtmlSuffix from "../ArgumentsSetting/HtmlSuffix";
import MixedArguments from "../ArgumentsSetting/MixedArguments";
import ObjectArguments from "../ArgumentsSetting/ObjectArguments";
import s from "./Presetting.module.less";

interface Props {}
/**
 * 所有预设事件将在挂载时运行，
 * 其根本还是EventEmitter对事件流控制，
 * 作为预设模块只操作组件自己的内置方法
 * */

const Presetting: React.FC<Props> = ({}) => {
  // 获取当前激活组件信息
  const { events, type, moduleId } = useSelector(
    (state: RootState) => state.activationItem
  );

  const module: Modules<any> = useMemo(
    () => (!!type ? require(`~/modules/${type}`).default : {}),
    [type]
  );

  const onChange = useCallback((index: number, type: string, value: any) => {
    console.log(index, type, value);
  }, []);

  // 获取当前运行时模块已配置的内置方法
  const setFunctions = events?.mount || [];

  // 获取当前模块类导出的内置方法，
  const exposeFunctions: ExposeFunctions[] = module.exposeFunctions || [];

  /**
   * 合并三块数据、组件内部，运行时、以及编辑后的数据
   * 组件内部数据是最全面的预设编辑数据，所以以他为预设的配置显示基准
   * 而最完整的预设编辑数据的初始值包含内组件部默认数据，运行时mount事件中包含的数据，而运行时数据需要剔除非组件内部属性数据，
   * 编辑完成后再剔除未配置的数据把配置好的数据返回到运行时数据中
   */

  // step1、设置编辑前数据
  // 运行时mount数据剔除非当前模块数据
  // todo检查元素参数为何为空！！！
  const getData = useCallback(
      () => {
        const result: ExposeFunctions[] = [...exposeFunctions].map((item => {
            console.log(item);
            setFunctions.some(setItem => {
                const [, fun] = setItem.name.split('/');
                if (fun === item.name && item.arguments?.length) {
                    item.arguments = setItem.arguments;
                    return true;
                }
                return false;
            })
            return item;
        })) || [];
        return result;
      },
      [exposeFunctions, setFunctions],
  )

  const runningData = getData();

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
                        onChange(index, argItem.type, {...argItem, data: e.target.value})
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
                      onChange={(value) => onChange(index, argItem.type, value)}
                    />
                  ) : null}
                  {argItem.type === "boolean" ? (
                    <BooleanArguments
                      typeArguments={argItem}
                      flexible={false}
                      onChange={(value) => onChange(index, argItem.type, value)}
                    />
                  ) : null}
                  {argItem.type === "object" ? (
                    <ObjectArguments
                      describe={argItem.describe}
                      htmlInput={!!argItem.html}
                      onChange={(value) => onChange(index, argItem.type, value)}
                      typeArguments={argItem}
                      flexible={false}
                    />
                  ) : null}
                  {argItem.type === "mixed" ? (
                    <MixedArguments
                      onChange={(value) => onChange(index, argItem.type, value)}
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
