/**
 * 完美弹窗组件
 */
import React, { useEffect, useRef, useState } from 'react';
import * as CSS from 'csstype';
import MD, { ModalParameters } from "@eightfeet/modal";
import ReactDOM from 'react-dom';

interface Props {
    id?: ModalParameters['id'];
    animation?: ModalParameters['animation'];
    shouldCloseOnOverlayClick?: ModalParameters['shouldCloseOnOverlayClick'];
    parentId?: ModalParameters['parentId'];
    zIndex?: ModalParameters['zIndex'];
    closable?: ModalParameters['closable'];
    overlayStyle?: CSS.Properties;
    contentStyle?: CSS.Properties;
    modifyStyle?: CSS.Properties[];
    closeStyle?: CSS.Properties;
    visible?: boolean;
    children?: React.ReactNode;
    /**
     * 关闭
     */
     onCancel?: () => void;
     /**
     * 自定义修饰层层级
     */
    customModifyZIndex?: boolean;
    /**
     * 暴露模块
     */
    innerRef?: (modal?: MD) => void;
    onShow?: (modal?: MD) => void; 
}

const Modal:React.FC<Props> = ({
    visible,
    children,
    overlayStyle,
    contentStyle,
    modifyStyle,
    closeStyle,
    innerRef,
    ...other
}) => {
    const MDRef = useRef<MD>(new MD({
        ...other,
        style: {
            overlay: overlayStyle,
            content: contentStyle,
            modify: modifyStyle,
            close: closeStyle,
        }
    }));

    const [created, setCreated] = useState(false);

    useEffect(() => {
        if (typeof innerRef === 'function') {
            innerRef(MDRef.current)
        }
        return () => {
            if (typeof innerRef === 'function') {
                innerRef()
            }
        }
    }, [innerRef])
    
    useEffect(() => {
        const dialogBox = MDRef.current;
        // effect
        return () => {
            // cleanup
            if (dialogBox.state.display) {
                dialogBox.hide(false)
            }
        }
    }, [visible]);

    useEffect(() => {
        const dialogBox = MDRef.current;
        if (visible) {
            !dialogBox.state.display && dialogBox.create({
                article: ''
            });
            setTimeout(() => setCreated(true));
        } else {
            dialogBox.state.display && dialogBox.hide(false);
            setTimeout(() => setCreated(false));
        }
    }, [visible]);
    
    return created ? ReactDOM.createPortal(
        <>{children}</>,
        MDRef.current.state.contentDom?.children[0] as Element
    ) : null
}

export default Modal