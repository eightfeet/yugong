import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "~/redux/store";
import queryString from "query-string";
import AppLayout from "~/AppLayout";
import MiniDashboard from '~/components/MiniDashboard';
import "./App.less";

interface Props {}

const search = queryString.parse(window.location.search);
const isEditing = search.isEditing === "true";

const App: React.FC<Props> = () => {
  const showEditor = useSelector((state: RootState) => state.controller.isEditing)
  const activationItem = useSelector((state: RootState) => state.activationItem)
  const setIsEditing = useDispatch<Dispatch>().controller.setIsEditing;

  useEffect(() => { 
    if (isEditing) {
      setIsEditing(true);
    }
  }, [setIsEditing])

  return (
    <>
    <div className="App">
      <AppLayout
        rowHeight={parseInt(process.env.REACT_APP_APPLAYOUT_ROWHEIGHT || '0')}
        cols={parseInt(process.env.REACT_APP_APPLAYOUT_COLS || '0')}
      />
    </div>
    {showEditor && activationItem.moduleId ? <div style={{height: '400px'}}><MiniDashboard /></div> : null}
    </>
  );
};

export default App;
