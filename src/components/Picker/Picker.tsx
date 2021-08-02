import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pic, { Option } from '@eightfeet/picker';
import ReactDOM from 'react-dom';

interface Props {
    id?: Option["id"];
    parentId?: Option["parentId"];
    title?: Option["title"];
    wheels: Option["wheels"];
    keyMap?: Option["keyMap"];
    defaultValue?: Option["defaultValue"];
    style?: Option["style"];
    cancelBtnText?: string;
    confirmBtnText?: string;
    onConfirm?: Option["onConfirm"];
    onCancel?: Option["onCancel"];
    transitionEnd?: Option["transitionEnd"];
    onShow?: Option["onShow"];
    onHide?: Option["onHide"];
    onChange?: Option["onChange"];
    children?: React.ReactNode;
}

const Picker:React.FC<Props> = ({
    children,
    ...other
}) => {
    const triggerRef = useRef<HTMLDivElement>(null)
    // 创建初始化
    const PicRef = useRef<Pic>();

    useEffect(() => {
        if(triggerRef.current) {
            console.log('triggerRef.current', triggerRef.current);
            
            PicRef.current = new Pic({
                ...other,
                trigger: '#trigger'
            })
        }
    }, [other])

    const showPicker = useCallback(
        () => {
            if (PicRef.current) {
                PicRef.current?.showPicker(['周二', '10：00'])
            }
        },
        [],
    )

    const [created, setcreated] = useState<boolean>();
    return <div ref={triggerRef} id="trigger" onClick={showPicker}>null</div>;
}

export default Picker