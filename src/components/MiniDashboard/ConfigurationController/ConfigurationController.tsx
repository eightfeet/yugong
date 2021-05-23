import React, { useCallback } from "react";
import { Collapse } from "antd";
import ApiSetting from "../ApiSetting";
import EventsSetting from "../EventsSetting";
import { cloneDeep } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { ExposeApi } from "~/types/modules";
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
const getExposeApiData = useCallback((): ExposeApi[] => {
    let data = !!type ? require(`~/modules/${type}`).default?.exposeApi : [];
    data = cloneDeep(data);
    return data;
}, [type]);

  return (
    <Collapse accordion bordered={false} defaultActiveKey={["0"]}>
      <Panel header="预设" key="0">
        <Presetting />
      </Panel>
      <Panel header="事件" key="1">
        <EventsSetting />
      </Panel>
      {getExposeApiData()?.length ? <Panel header="Api" key="2">
        <ApiSetting />
      </Panel> : null}
    </Collapse>
  );
};

export default ConfigurationController;
