/**
 * @eightfeet/modal
 * 与react结合最佳实践
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as CSS from 'csstype';
import MD, { ModalParameters } from '@eightfeet/modal';
import ReactDOM from 'react-dom';
import { content, close, overlay } from './defaultTheme';
import classNames from 'classnames';
import s from './Modal.module.scss';

type SubProps = React.FC<
  { align?: 'spaceBetween' | 'center' } & React.HTMLAttributes<HTMLDivElement>
>;

const subClassName = (
  className?: string,
  align?: 'spaceBetween' | 'center',
) => {
  return classNames(
    {
      [s['jc-space-between']]: align === 'spaceBetween',
      [s['jc-center']]: align === 'center',
    },
    className,
  );
};

/**
 * 标准头部
 * @param align spaceBetween 两端对齐；center 居中对齐
 * @returns
 */
const Header: SubProps = ({ children, className, align, ...other }) => {
  return (
    <header className={subClassName(className, align)} {...other}>
      {children}
    </header>
  );
};

Header.displayName = 'ModalHeader';
/**
 * 标准底部
 * @param align spaceBetween 两端对齐；center 居中对齐
 * @returns
 */
const Footer: SubProps = ({ children, className, align, ...other }) => {
  return (
    <footer className={subClassName(className, align)} {...other}>
      {children}
    </footer>
  );
};
Footer.displayName = 'ModalFooter';

export interface ModalProps {
  id?: ModalParameters['id'];
  animation?: ModalParameters['animation'];
  shouldCloseOnOverlayClick?: ModalParameters['shouldCloseOnOverlayClick'];
  parentId?: ModalParameters['parentId'];
  zIndex?: ModalParameters['zIndex'];
  closable?: ModalParameters['closable'];
  overlayStyle?: CSS.Properties;
  wrapStyle?: CSS.Properties;
  contentStyle?: CSS.Properties;
  modifyStyle?: CSS.Properties[];
  closeStyle?: CSS.Properties;
  visible?: boolean;
  children?: React.ReactNode;
  okText?: string;
  /**
   * 关闭
   */
  onCancel?: () => void;
  onOk?: () => void;
  /**
   * 自定义修饰层层级
   */
  customModifyZIndex?: boolean;
  /**
   * 暴露模块
   */
  getModal?: (modal?: MD) => void;
  className?: string;
  /**
   * 标题,允许写入html标签
   */
  title?: string;
}

interface StaticType extends React.FC<ModalProps> {
  Header: typeof Header;
  Footer: typeof Footer;
}

const Modal: StaticType = ({
  visible,
  children,
  overlayStyle = overlay as any,
  wrapStyle,
  contentStyle = content as any,
  modifyStyle,
  closeStyle = close as any,
  okText = '确定',
  getModal,
  onCancel,
  onOk,
  shouldCloseOnOverlayClick,
  className,
  ...other
}) => {
  // 创建初始化
  const MDRef = useRef<MD>(
    new MD({
      ...other,
      style: {
        overlay: overlayStyle,
        wrap: wrapStyle,
        content: contentStyle,
        modify: modifyStyle,
        close: closeStyle,
      },
    }),
  );

  (window as any).MD = MDRef.current;

  // 变更弹窗ID,保证弹窗可识别这里定义一个上下文刻读id
  useEffect(() => {
    MDRef.current.state.id =
      other.id ||
      `modal${new Date().getTime()}-${window.Math.floor(
        window.Math.random() * 100,
      )}`;
  }, [other.id]);

  const checkVisible = useRef<boolean>();
  useEffect(() => {
    checkVisible.current = !!visible;
  }, [visible]);

  // 弹窗是否创建窗口
  const [created, setCreated] = useState(false);

  // 处理外部获取弹窗实例
  useEffect(() => {
    if (typeof getModal === 'function') getModal(MDRef.current);
    return () => {
      if (typeof getModal === 'function') getModal();
    };
  }, [getModal]);

  const handleSyncError = useCallback(() => {
    if (checkVisible.current) {
      console.error(
        'The props ‘visible’ is out of sync when the ‘Modal’ component turns off automatically, please ensure that you have synchronized ‘visible = false’ by props ‘onCancel‘',
      );
    }
  }, []);

  useEffect(() => {
    // 处理关闭状态
    MDRef.current.state.onCancel = () => {
      if (typeof onCancel === 'function') {
        onCancel();
        setCreated(false);
        setTimeout(handleSyncError);
      } else {
        handleSyncError();
      }
    };
  }, [handleSyncError, onCancel, visible]);

  // 弹窗创建窗口处理
  useEffect(() => {
    const dialogBox = MDRef.current;
    if (visible) {
      !dialogBox.state.display &&
        dialogBox.create({
          article: `<div class="${classNames(s.root, className)}"></div>`,
        });
      const dom = document.getElementById(dialogBox.state.id || '');

      if (shouldCloseOnOverlayClick && dom) {
        const overDom: any = dom.querySelector(
          `.${dialogBox.state.id}_overlay`,
        );
        if (overDom) {
          overDom.onclick = () => {
            dialogBox.hide(false);
          };
        }
      }
      setTimeout(() => {
        setCreated(true);
      }, 100);
    } else {
      dialogBox.state.display && dialogBox.hide(false);
    }
  }, [className, visible, shouldCloseOnOverlayClick]);

  useEffect(() => {
    const dialogBox = MDRef.current;
    return () => {
      if (dialogBox && dialogBox.state.display) dialogBox.hide(false);
    };
  }, []);

  const renderContent = () => {
    let childrenHeader: null | React.ReactNode,
      childrenFooter: null | React.ReactNode = null;
    const childrenContent = React.Children.map(children, (child) => {
      if ((child as any)?.type?.displayName === 'ModalHeader') {
        childrenHeader = child;
      } else if ((child as any)?.type?.displayName === 'ModalFooter') {
        childrenFooter = child;
      } else {
        return child;
      }
    });
    return (
      <>
        {childrenHeader}
        <section
          className={classNames({
            [s['message']]: true,
            [s['offsetbottom']]: !childrenFooter,
          })}
        >
          {childrenContent}
        </section>
        {childrenFooter}
      </>
    );
  };

  return created && MDRef.current.state.contentDom
    ? ReactDOM.createPortal(
        renderContent(),
        MDRef.current.state.contentDom?.querySelector(`.${s.root}`) as Element,
      )
    : null;
};

Modal.Header = Header;
Modal.Footer = Footer;

export default Modal;
