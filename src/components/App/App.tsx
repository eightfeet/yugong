import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "~/redux/store";
import queryString from "query-string";
import { Layout as LayoutDataType } from "react-grid-layout";
import useLocalStorage from "~/hooks/useLocalStorage";
import Layout from "~/Layout";
import data from "~/mockdata/appData";
import MiniDashboard from '~/components/MiniDashboard';
import "./App.less";

type StateProps = ReturnType<typeof mapState>;
interface CompProps {}

const search = queryString.parse(window.location.search);
const isEditing = search.isEditing === "true";

const App: React.FC<StateProps & CompProps> = ({
  appData,
}) => {
  const showEditor = useSelector((state: RootState) => state.controller.isEditing)
  const activationItem = useSelector((state: RootState) => state.activationItem)
  const [designModal, setDesignModal] = useState(isEditing);
  const resultData = useRef();
  const [localStoreData, setLocalStoreData] = useLocalStorage("appData", data);
  const updateAppData = useDispatch<Dispatch>().appData.updateAppData;
  const setIsEditing = useDispatch<Dispatch>().controller.setIsEditing;

  useEffect(() => { 
    if (isEditing) {
      setIsEditing(true);
    }
  }, [setIsEditing])

  useMemo(() => {
    updateAppData(localStoreData);
  }, [localStoreData, updateAppData]);

  const onChange = useCallback(
    (data: LayoutDataType[]) => {
      const mergeData = data.map((item, index) => {
        const otherData = appData[index];
        const result = {
          ...otherData,
          layout: item,
        };
        return result;
      });
      (resultData.current as any) = mergeData;
    },
    [appData]
  );

  return (
    <>
    <div className="App">
      {isEditing ? (
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
          <button
            onClick={() =>
              resultData.current ? setLocalStoreData(resultData.current) : null
            }
          >
            保存
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            重置
          </button>
        </>
      ) : null}

      <Layout
        isEditing={showEditor}
        designModal={designModal}
        rowHeight={20}
        cols={12}
        width={window.innerWidth}
        data={appData}
        onChange={onChange}
      />
    </div>
    {showEditor && designModal && activationItem.moduleId ? <div style={{height: '400px'}}><MiniDashboard /></div> : null}
    </>
  );
};

const mapState = (state: RootState) => ({
  appData: state.appData,
});

export default connect(mapState)(App);
