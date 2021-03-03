import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import get from "lodash/get";

function useRunningTime() {
  const runningTimes = useSelector((state: RootState) => state.runningTimes);

  const getDataFromRunningTime = (data: string) => {
    let result = data;
    const ruleList = data.match(/\{\{(.[\w|\d|-|/|.]+?)\}\}/gm);
    ruleList?.forEach((item) => {
      const key = item.replace(/\{\{(.[\w|\d|-|/|.]+?)\}\}/gm, "$1");
      const value = get(runningTimes, key);
      result = result.replace(item, `${value || ""}`);
    });

    return result;
  };

  return getDataFromRunningTime;
}

export default useRunningTime;
