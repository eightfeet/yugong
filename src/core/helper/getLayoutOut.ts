import { Layout } from "react-grid-layout";
import { store } from "~/redux/store";

const pageData = store.getState().pageData;
// 高度需要实时变化，将他处理为内链样式
const getLayoutSize = (layout?: Layout) => {
    if (!layout) {
        return {}
    }
    const lw =
        (window.innerWidth - (pageData?.space || 0)) /
        (pageData?.cols || 1);
    const width = (layout?.w || 1) * lw - (pageData?.space || 0);
    const height =
        (layout?.h || 1) * (pageData?.rowHeight || 1) +
        (layout?.h - 1 || 1) * (pageData?.space || 1) -
        layout?.h;
    return { width: `${width}px`, height: `${height}px` };
}

export default getLayoutSize