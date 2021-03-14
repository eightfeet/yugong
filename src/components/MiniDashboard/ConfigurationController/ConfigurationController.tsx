import React from "react";
import { Collapse } from "antd";
import ApiSetting from "../ApiSetting";
import EventsSetting from "../EventsSetting";
const { Panel } = Collapse;

const ConfigurationController = () => {
  return (
    <Collapse bordered={false} defaultActiveKey={["1"]}>
      <Panel header="事件" key="1">
        <EventsSetting />
      </Panel>
      <Panel header="Api" key="2">
        <ApiSetting />
      </Panel>
    </Collapse>
  );
};

export default ConfigurationController;
