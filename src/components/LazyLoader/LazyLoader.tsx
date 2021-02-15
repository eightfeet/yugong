import React, { Suspense, lazy, useMemo } from "react";
import { AnyObjectType } from "types/appData";

interface Props extends AnyObjectType {
  path: string;
}

const LazyLoader: React.FC<Props> = ({ path, ...other }) => {
  // Memo缓存组件防止反复刷新
  const LazyComponent = useMemo(() => lazy(() => import(`~/${path}`)), [path]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...other} />
    </Suspense>
  );
};

export default LazyLoader;
