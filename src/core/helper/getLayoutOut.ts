import { Layout } from "react-grid-layout";
import { runningTimeToResult } from "~/core/getDataFromRunningTime";
import { PageData } from "~/redux/pageData";
import {
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_ROWHEIGHT,
  GRID_DEFAULT_SPACE,
} from "../constants";

// 高度需要实时变化，将他处理为内链样式
const getLayoutSize = (layout?: Layout, pageData?: PageData) => {
  if (!layout) {
    return {};
  }

  const {
    space,
    cols,
    rowHeight,
  } = pageData || {};

  const lw =
    (window.innerWidth - runningTimeToResult(space || GRID_DEFAULT_SPACE, 0)) /
    runningTimeToResult(cols || GRID_DEFAULT_COLS, 1);
  const width = (layout?.w || 1) * lw - runningTimeToResult(space || GRID_DEFAULT_SPACE, 0);
  const height =
    (layout?.h || 1) * runningTimeToResult(rowHeight || GRID_DEFAULT_ROWHEIGHT, 1) +
    (layout?.h - 1 || 1) * runningTimeToResult(space || GRID_DEFAULT_SPACE, 0);
  return { width, height };
};

export default getLayoutSize;
