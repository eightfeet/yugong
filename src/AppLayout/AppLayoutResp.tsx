/**
 * AppLayout，应用端通过懒加按需加载模块以保证性能，
 * 在编辑模式下是需要通信appData到Dashboard，确保编辑端与应用端数据保持一致
 */
 import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
 import "react-grid-layout/css/styles.css";
 import "react-resizable/css/styles.css";
 
 import { WidthProvider, Responsive, Layout as LayoutDataType } from "react-grid-layout";
 
 import s from "./AppLayout.module.scss";
 import GridLine from "~/components/GridLine";
 import Elements from "~/components/Elements";
 import classNames from "classnames";
 import { useDispatch, useSelector } from "react-redux";
 import { RootState, Dispatch } from "~/redux/store";
 import useLocalStorage from "~/hooks/useLocalStorage";
 import usePostMessage from "~/hooks/usePostMessage";
 import EventEmitter from "~/core/EventEmitter";
 
 const ResponsiveReactGridLayout = WidthProvider(Responsive);
 
 // 当前是否被ifream引用
 const visualSense = (window.self === window.top);
 
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
 const AppLayout: React.FC<LayoutProps> = ({ rowHeight, cols }) => {
   const getAppData = useDispatch<Dispatch>().appData.getAppData;
   const updateAppData = useDispatch<Dispatch>().appData.updateAppData;
   const setEditingId = useDispatch<Dispatch>().controller.setEditingId;
   const appData = useSelector((state: RootState) => state.appData);
   const runningTimes = useSelector((state: RootState) => state.runningTimes);
   const ref = useRef(null);
   const setIsEditing = useDispatch<Dispatch>().controller.setIsEditing;
   const isEditing = useSelector(
     (state: RootState) => state.controller.isEditing
   );
 
   const [, setLocalStorage] = useLocalStorage("appData", null);
   // 接收与处理message
   const sendMessage = usePostMessage((data) => {
     const { tag, value } = data;
     switch (tag) {
       case "setIsEditing":
         setIsEditing(value);
         break;
       case "updateAppData":
         updateAppData(value);
         break;
       case "id":
         setEditingId(value)
         break;
       default:
         break;
     }
   });
 
   // 数据初始化，获取页面数据
   const [localStoreData] = useLocalStorage("appData", null);
   useMemo(() => {
     getAppData(localStoreData).then((res) => {
       // 获取数据后 发送一份到父级窗口作为编辑数据
       sendMessage(
         {
           tag: "updateAppData",
           value: res,
         },
         window.top
       );
     });
   }, [getAppData, localStoreData, sendMessage]);
 
   // 更新GridLine布局数据
   const onLayoutChange = useCallback(
     (layout: LayoutDataType[]) => {
       appData.forEach((item) => {
         layout.forEach((element) => {
           if (item.moduleId === element.i) {
             item.layout = element;
           }
         });
       });
       // 通知父级窗口变更数据
       sendMessage(
         {
           tag: "updateAppData",
           value: appData,
         },
         window.top
       );
       setLocalStorage(appData);
     },
     [appData, sendMessage, setLocalStorage]
   );
 
   const eventEmitter = useMemo(() => {
     return new EventEmitter()
   }, [appData]);
 
   (window.top as any).eventEmitter = (window as any).eventEmitter = eventEmitter;
 
   // 同步runningTimeData
   useEffect(() => {
     sendMessage(
       {
         tag: "updateRunningTimes",
         value: runningTimes,
       },
       window.top
     );
   }, [runningTimes, sendMessage]);
 
   const [defaultLy, setDefaultLy] = useState({
     cols: 12,
     rowHeight: 100,
   })
   
 
   const onBreakpointChange = useCallback(
     (breakpoint, cols) => {
       setDefaultLy({
         ...defaultLy,
         cols: 12,
       })
     },
     [defaultLy],
   )
 
   const renderGridLayout = () => (<ResponsiveReactGridLayout
     onLayoutChange={onLayoutChange}
     onBreakpointChange={onBreakpointChange}
     rowHeight={rowHeight}
     width={document.body.scrollWidth}
     autoSize
   >
     {appData.map((item) => {
       const itemMerge = {eventEmitter: eventEmitter.bind(item.moduleId), ...item};
       return (
         <div
           id={`wrap-${item.layout?.i}`}
           className={classNames(
             s.block,
             isEditing === false ? null : s.modify
           )}
           key={item.layout?.i}
           data-grid={{
             ...item.layout,
             // 编辑模式或预览模式定义为不可编辑
             // GridLayout data-grid未能热更新，这里用visualSense来确定当前是否在编辑模式下
             static: visualSense,
           }}
         >
           <Elements id={item.layout?.i} {...itemMerge} />
         </div>
       )
     })}
   </ResponsiveReactGridLayout>)
 
   return (
     <div className={s.layout} ref={ref}>
       {isEditing ? (
         <GridLine
           width={window.innerWidth}
           cols={defaultLy.cols}
           rowHeight={rowHeight}
           height={document.body.scrollHeight}
           space={10}
         />
       ) : null}
       {isEditing ? renderGridLayout() : renderGridLayout()}
     </div>
   );
 };
 
 export default AppLayout;
 