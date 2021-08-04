import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pic, { Option } from '@eightfeet/picker';
import s from './Picker.module.less';

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
    onConfirm,
    ...other
}) => {
    const triggerRef = useRef<HTMLDivElement>(null)
    // 创建初始化
    const PicRef = useRef<Pic>();

    const [selected, setSelected] = useState<any[]>();

    const handleOnConfirm = useCallback(
        (data) => {
            console.log(data);
            setSelected(data);
            if (onConfirm instanceof Function) {
                onConfirm(data);
            }
        },
        [onConfirm],
    )

    useEffect(() => {
        if(triggerRef.current) {
            PicRef.current?.destroy();
            setTimeout(() => {
                const { id } = (PicRef.current as any) || {}
                const Node = document.getElementById(id);
                if(Node) document.body.removeChild(Node);
                PicRef.current = new Pic({
                    ...other,
                    onConfirm: handleOnConfirm,
                    trigger: `#${s.trigger}`,
                    defaultValue: selected
                });
            }, 20);
        }
    }, [handleOnConfirm, other, selected])

    useEffect(() => {
        return () => {
            PicRef.current?.destroy();
        }
    }, []);

    return <div ref={triggerRef} id={s.trigger}>
        {children}
        <div>{selected?.join()}</div>
    </div>;
}

export default Picker