import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { Dispatch, RootState } from '~/redux/store';
import { AnyObjectType, AppDataElementsTypes } from '~/types/appData';
import styleCompiler from '~/compiler';
import s from './Wrapper.module.less';
import usePostMessage from '~/hooks/usePostMessage';
import classNames from 'classnames';

interface Props extends AppDataElementsTypes {
  maxWidth?: boolean;
  maxHeight?: boolean;
  itemAlign?: 'top' | 'center' | 'bottom';
  visible?: boolean
}

const Wrapper: React.FC<Props> = ({
  style,
  children,
  layout,
  maxWidth,
  maxHeight,
  moduleId,
  itemAlign = 'center',
  visible = true
}) => {
  // Wrapper 自身的样式
  const [basicStyle, setBasicStyle] = useState<{ [keys: string]: any }>({});
  const actId = useSelector((state: RootState) => state.controller.editingId);
  const [wrapSize, setWrapSize] = useState<{ width: string; height: string }>();
  const setEditingId = useDispatch<Dispatch>().controller.setEditingId;
  const currentLayout = useSelector((state: RootState) => state.appData).filter(
    (item) => item.moduleId === actId,
  )?.[0]?.layout;

  const refWrap = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const isEditing = useSelector(
    (state: RootState) => state.controller.isEditing,
  );

  const sendMessage = usePostMessage(() => {});

  // base元素的样式控制
  const { basic } = style;
  const { display, animation } = basic || {};

  useEffect(() => {
    if (display?.zIndex !== undefined && refWrap.current?.parentElement) {
      refWrap.current.parentElement.style.zIndex = `${display.zIndex}`;
    }
  }, [moduleId, display?.zIndex]);

  // 样式编译
  useEffect(() => {
    setBasicStyle(styleCompiler({ ...basic }, inView));
  }, [moduleId, basic, inView]);

  // 仅针对有延时的入场动画在延时期间做元素隐藏处理,进入动画再做呈现
  const timer = useRef<NodeJS.Timeout | null>();
  useEffect(() => {
    if (!animation?.animationDelay) return;
    refWrap.current?.classList.add(s.hide);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = setTimeout(
      () => refWrap.current?.classList.remove(s.hide),
      animation.animationDelay + 50,
    );
  }, [basic, animation, inView]);

  // 计算尺寸
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
  if (visible === false) return null;
  
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
      {actId === moduleId ? (
        <div
          className={classNames(s.actwrap, {
            [s.isedit]: isEditing,
            [s.iswiew]: !isEditing,
          })}
        />
      ) : null}
      <div ref={ref} className={s.animationwrap} style={{ ...defaultSize }}>
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
