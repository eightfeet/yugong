import React, { Suspense, lazy, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";


const MiniDashboard: React.FC = (props) => {
  // rootFontsize当成配合windowResize更新时组件做页面更新的key值，暂无实质用途
  const rootFontsize =
  useSelector((state: RootState) => state.controller.bestFont) || 16;
  // Memo缓存组件防止反复刷新
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const LazyComponent = useMemo(() => lazy(() => import('~/components/MiniDashboard/Dashboard')), [rootFontsize]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default MiniDashboard;

