/**
 * App入口，通过url的isEditing参数确定当前是否编辑模式，编辑模式下注意与dashbard的数据通信
 */
import React from "react";
import AppLayout from "~/AppLayout";
import "./App.less";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <AppLayout
      rowHeight={parseInt(process.env.REACT_APP_APPLAYOUT_ROWHEIGHT || "0")}
      cols={parseInt(process.env.REACT_APP_APPLAYOUT_COLS || "0")}
    />
  );
};

export default App;
