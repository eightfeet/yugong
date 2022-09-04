import React, { Suspense, lazy, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AnyObjectType } from 'types/appData';
import { RootState } from '~/redux/store';
import LazyLoading from './LazyLoading';

interface Props extends AnyObjectType {
  path: string;
}

const LazyLoader: React.FC<Props> = ({ path, ...other }) => {
  // rootFontsize当成配合windowResize更新时组件做页面更新的key值，暂无实质用途
  const rootFontsize =
    useSelector((state: RootState) => state.controller.bestFont) || 16;
  // Memo缓存组件防止反复刷新
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const LazyComponent = useMemo(
    () => lazy(() => import(`~/modules/${path}`)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path, rootFontsize],
  );
  return (
    <Suspense fallback={<LazyLoading />}>
      <LazyComponent {...other} />
    </Suspense>
  );
};

export default LazyLoader;
