import { useMemo } from "react";
import { Collapse } from "antd";
import ApiSetting from "../ApiSetting";
import EventsSetting from "../EventsSetting";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { Modules } from "~/types/modules";
import Presetting from "../Presetting";
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

const module:Modules<any> = useMemo(() => !!type ? require(`~/modules/${type}`).default : {}, [type])

  return (
    <Collapse accordion bordered={false} defaultActiveKey={module.exposeFunctions?.length ? ["0"] : ["1"]}>
      {module.exposeFunctions?.length? <Panel header="预设" key="0">
        <Presetting />
      </Panel> : null}
      <Panel header="事件" key="1">
        <EventsSetting />
      </Panel>
      {module.exposeApi?.length ? <Panel header="Api" key="2">
        <ApiSetting />
      </Panel> : null}
    </Collapse>
  );
};

export default ConfigurationController;
