import { useMemo } from "react";
import { Collapse, Tooltip } from "antd";
import ApiSetting from "../ApiSetting";
import EventsSetting from "../EventsSetting";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { Modules } from "~/types/modules";
import Presetting from "../Presetting";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const ConfigurationController = () => {
  /**
   * 获取当前被选择项的api数据
   */
  const activationItem = useSelector(
    (state: RootState) => state.activationItem
  );

  const { type } = activationItem;

  /**
   * 获取当前被选组件导出的（自定义）默认Api数据
   */

  const module: Modules<any> = useMemo(
    () => (!!type ? require(`~/modules/${type}`).default : {}),
    [type]
  );

  return (
    <Collapse
      accordion
      bordered={false}
      defaultActiveKey={module.exposeFunctions?.length ? ["0"] : ["1"]}
    >
      {module.exposeFunctions?.length ? (
        <Panel header="预设" key="0">
          <Presetting />
        </Panel>
      ) : null}
      <Panel header="事件" key="1">
        <EventsSetting />
      </Panel>
      {module.exposeApi?.length ? (
        <Panel
          header="Api"
          key="2"
          extra={<Tooltip
            title={
              <div>
                返回数据结构
                <br />
                [data]: 原始数据, <br />
                [target]: 转换/映射数据
                <br />
                {`{ `}
                <br />
                data: any, <br />
                [target1]: any, <br />
                [target2]: any, <br />
                [target...n]: any <br />
                {`}`}
              </div>
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
          }
        >
          <ApiSetting />
        </Panel>
      ) : null}
    </Collapse>
  );
};

export default ConfigurationController;
