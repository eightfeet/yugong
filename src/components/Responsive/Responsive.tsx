/**
 * 包含模式设置、响应式编辑通信iframe、与样式编辑面板MiniDashboard
 *
 */

import React, { useState } from "react";
import MiniDashboard from "../MiniDashboard";

interface Props {}
const Responsive: React.FC<Props> = () => {
  const [designModal, setDesignModal] = useState(false);
  return (
    <>
      <span>
        视图模式：{designModal ? "设计模式" : "预览模式"}
        视图
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => setDesignModal(!designModal)}>
        {designModal ? "预览模式" : "设计模式"}
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button>保存</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button
        onClick={() => {
          window.localStorage.clear();
          window.location.reload();
        }}
      >
        重置
      </button>
      <iframe
        title="tms"
        src="/?isEditing=true"
        style={{
          width: "1px",
          minWidth: "100%",
          minHeight: `${window.innerHeight}px`,
        }}
      />
      <MiniDashboard />
    </>
  );
};

export default Responsive;
