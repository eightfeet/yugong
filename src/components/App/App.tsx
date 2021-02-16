import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "~/redux/store";
import queryString from "query-string";
import useLocalStorage from "~/hooks/useLocalStorage";
import AppLayout from "~/AppLayout";
import MiniDashboard from '~/components/MiniDashboard';
import "./App.less";

interface Props {}

const search = queryString.parse(window.location.search);
const isEditing = search.isEditing === "true";

const App: React.FC<Props> = () => {
  const showEditor = useSelector((state: RootState) => state.controller.isEditing)
  const activationItem = useSelector((state: RootState) => state.activationItem)
  const appData = useSelector((state: RootState) => state.appData)

  const getAppDatd = useDispatch<Dispatch>().appData.getAppData;
  const setIsEditing = useDispatch<Dispatch>().controller.setIsEditing;

  const [designModal] = useState(isEditing);
  const [localStoreData] = useLocalStorage("appData", null);
  

  useEffect(() => { 
    if (isEditing) {
      setIsEditing(true);
    }
  }, [setIsEditing])

  useMemo(() => {
    getAppDatd(localStoreData);
  }, [getAppDatd, localStoreData]);

  return (
    <>
    <div className="App">
      <AppLayout
        isEditing={showEditor}
        designModal={designModal}
        rowHeight={20}
        cols={12}
        width={window.innerWidth}
        data={appData}
      />
    </div>
    {showEditor && designModal && activationItem.moduleId ? <div style={{height: '400px'}}><MiniDashboard /></div> : null}
    </>
  );
};

export default App;
