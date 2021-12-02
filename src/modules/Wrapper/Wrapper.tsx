import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { Dispatch, RootState } from '~/redux/store';
import { AnyObjectType, AppDataElementsTypes } from '~/types/appData';
import styleCompiler from '~/compiler';
import s from './Wrapper.module.less';
import usePostMessage from '~/hooks/usePostMessage';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';

interface Props extends AppDataElementsTypes {
  maxWidth?: boolean;
  maxHeight?: boolean;
  itemAlign?: 'top' | 'center' | 'bottom';
}

const Wrapper: React.FC<Props> = ({
  style,
  children,
  layout,
  maxWidth,
  maxHeight,
  moduleId,
  itemAlign = 'center',
}) => {
  /**
   * Wrapper 自身的样式
   */
  const [basicStyle, setBasicStyle] = useState<{ [keys: string]: any }>({});
  const actId = useSelector((state: RootState) => state.controller.editingId);
  const [wrapSize, setWrapSize] = useState<{ width: string; height: string }>();
  const setEditingId = useDispatch<Dispatch>().controller.setEditingId;
  const currentLayout = useSelector((state: RootState) => state.appData).filter(
    (item) => item.moduleId === actId,
  )?.[0]?.layout;

  const refWrap = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 1,
  });
  const isEditing = useSelector(
    (state: RootState) => state.controller.isEditing,
  );

  const sendMessage = usePostMessage(() => {});

  useEffect(() => {
    // base元素的动画控制
    const { basic } = style;
    const optStyle = cloneDeep(basic);
    optStyle.animation!.animationPlayState = 'paused';
    if (!inView) {delete optStyle.animation};
    setBasicStyle(styleCompiler(optStyle));
    if (optStyle.display?.zIndex !== undefined) {
      document.getElementById(
        `wrap-${moduleId}`,
      )!.style.zIndex = `${optStyle.display.zIndex}`;
    }
  }, [moduleId, style, inView]);

  useEffect(() => {
    if (refWrap.current) {
      setWrapSize({
        width: `${refWrap.current.offsetWidth}px`,
        height: `${refWrap.current.offsetHeight}px`,
      });
    }
  }, [refWrap, currentLayout?.w, currentLayout?.h]);

  /**
   * 图层被触发
   */
  const onLayoutClick = useCallback(() => {
    if (!isEditing) return;
    setEditingId(moduleId);
    // 向父级窗口通知当前激活Id
    sendMessage({ tag: 'id', value: moduleId }, window.top);
  }, [isEditing, moduleId, sendMessage, setEditingId]);
  /**设置预览状态下不接受编辑事件 */
  const pointerEvents: React.CSSProperties = {};
  if (isEditing) {
    pointerEvents.pointerEvents = 'none';
  } else {
    delete pointerEvents.pointerEvents;
  }
  /*设置最大尺寸*/
  const defaultSize: AnyObjectType = {};
  if (maxWidth && wrapSize?.width) {
    defaultSize.width = wrapSize?.width;
  }
  if (maxHeight && wrapSize?.height) {
    defaultSize.height = wrapSize?.height;
  }
  /*是否为隐藏模块*/
  const isHide = layout?.w === 0 || layout?.h === 0;
  if (isHide) {
    defaultSize.width = defaultSize.height = 'auto';
  }
  return (
    <div
      className={classNames(s.touchwrap, {
        [s.aligncenter]: itemAlign === 'center',
        [s.aligntop]: itemAlign === 'top',
        [s.alignbottom]: itemAlign === 'bottom',
      })}
      onTouchStart={onLayoutClick}
      onMouseDown={onLayoutClick}
      ref={refWrap}
    >
      <div ref={ref}>
        {actId === moduleId ? (
          <div
            className={classNames(s.actwrap, {
              [s.isedit]: isEditing,
              [s.iswiew]: !isEditing,
            })}
          />
        ) : null}
        <div
          id={moduleId}
          className={s.secondwrap}
          style={{ ...defaultSize, ...basicStyle.style, ...pointerEvents }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
