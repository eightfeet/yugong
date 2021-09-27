/**
 * @eightfeet/modal
 * 与react结合最佳实践
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as CSS from 'csstype';
import MD, { ModalParameters } from '@eightfeet/modal';
import ReactDOM from 'react-dom';
import { content, close, submit } from './../theme/publicTheme';
import s from './Modal.module.scss';
import classNames from 'classnames';

interface Props {
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

const Modal: React.FC<Props> = ({
    visible,
    children,
    overlayStyle,
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
    title,
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
    
    // 变更弹窗ID
    useEffect(() => {
        MDRef.current.state.id = other.id
    }, [other.id])

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
                    header: title,
                    article: '',
                });
            const dom = document.getElementById(dialogBox.state.id || '');

            if (className && dom) dom.className = className;
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
    }, [className, visible, shouldCloseOnOverlayClick, title]);

    useEffect(() => {
        const dialogBox = MDRef.current;
        return () => {
            if (dialogBox) dialogBox.hide(false);
        };
    }, []);

    return created && MDRef.current.state.contentDom
        ? ReactDOM.createPortal(
              <>
                  <div className={s.content}>{children}</div>
                  <div className={classNames(s.footer, `${other.id}_footer`)}>
                      <button
                          style={submit}
                          onClick={onOk instanceof Function ? onOk : () => {}}
                      >
                          {okText}
                      </button>
                  </div>
              </>,
              MDRef.current.state.contentDom?.querySelector(
                  `.${MDRef.current.state.id}_modules`,
              ) as Element,
          )
        : null;
};

export default Modal;
