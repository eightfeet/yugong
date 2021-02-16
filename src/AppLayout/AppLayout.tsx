/**
 * AppLayout，应用端通过懒加按需加载模块以保证性能，
 * 在编辑模式下是需要通信appData到Dashboard，确保编辑端与应用端数据保持一致
 */
import React, { useCallback, useMemo, useRef } from "react";
import GridLayout, { Layout as LayoutDataType } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import s from "./AppLayout.module.scss";
import GridLine from "~/components/GridLine";
import Elements from "~/components/Elements";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "~/redux/store";
import useLocalStorage from "~/hooks/useLocalStorage";

interface LayoutProps {
  /**
   * 单行高度
   * @type {number}
   * @memberof LayoutProps
   */
  rowHeight: number;
  /**
   * 布局列数
   * @type {number}
   * @memberof LayoutProps
   */
  cols: number;
}

/**
 * 编辑器
 *
 * @param {LayoutProps} { isEditing, rowHeight, cols, width, height, data}
 * @return {*}
 */
const AppLayout: React.FC<LayoutProps> = ({
  rowHeight,
  cols,
}) => {
  const getAppDatd = useDispatch<Dispatch>().appData.getAppData;
  const appData = useSelector((state: RootState) => state.appData);
  const updateAppData = useDispatch<Dispatch>().appData.updateAppData;
  const isEditing = useSelector((state: RootState) => state.controller.isEditing)
  
  const [localStoreData, setLocalStorage] = useLocalStorage("appData", null);
    
  const ref = useRef(null);

  // 数据初始化，
  useMemo(() => {
    getAppDatd(localStoreData);
  }, [getAppDatd, localStoreData]);

  // 更新GridLine布局数据
  const onLayoutChange = useCallback((layout: LayoutDataType[]) => {
    appData.forEach(item => {
        layout.forEach(element => {
            if(item.moduleId === element.i) {
                item.layout = element
            }
        })
    })
    updateAppData(appData);
    setLocalStorage(appData)
  }, [appData, setLocalStorage, updateAppData]);

  return (
    <div className={s.layout} ref={ref}>
      {isEditing ? (
        <GridLine
          width={window.innerWidth}
          cols={cols}
          rowHeight={rowHeight}
          height={document.body.scrollHeight}
          space={10}
        />
      ) : null}
      <GridLayout
        onLayoutChange={onLayoutChange}
        cols={cols}
        rowHeight={rowHeight}
        width={document.body.scrollWidth}
        autoSize
      >
        {appData.map((item) => (
          <div
            id={`wrap-${item.layout.i}`}
            className={classNames(s.block, isEditing === false ? null : s.modify)}
            key={item.layout.i}
            data-grid={{
              ...item.layout,
              // 编辑模式或预览模式定义为不可编辑
              static: isEditing !== undefined && isEditing !== false,
            }}
          >
            <Elements id={item.layout.i} {...item} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default AppLayout;
