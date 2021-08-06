import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pic, { Option, Wheels } from '@eightfeet/picker';
import classNames from 'classnames';
import s from './Picker.module.less';

interface Props {
    id?: Option["id"];
    parentId?: Option["parentId"];
    title?: Option["title"];
    wheels: Wheels;
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
    className?: string;
    delimiter?: string;
}

const Picker:React.FC<Props> = ({
    children,
    onConfirm,
    className,
    delimiter,
    defaultValue,
    keyMap,
    ...other
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const triggerId = useRef(`picktrigger${new Date().getTime()}${window.Math.floor(
        window.Math.random() * 100
    )}`)
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

    const getDefaultvalue = useCallback(
        () => {
            let value: any[] = [];
            selected?.forEach((item) => {
                if (typeof item === 'string') {
                    value.push(item);
                } else {
                    let key = 'value';
                    if (keyMap) key = keyMap[key];
                    value.push(item[key])
                }
            });
            return value;
        },
        [keyMap, selected],
    )

    useEffect(() => {
        if(triggerRef.current && other.wheels.length) {
            PicRef.current?.destroy();
            setTimeout(() => {
                const { id } = (PicRef.current as any) || {}
                const Node = document.getElementById(id);
                if(Node) document.body.removeChild(Node);
                PicRef.current = new Pic({
                    keyMap,
                    ...other,
                    onConfirm: handleOnConfirm,
                    trigger: `#${triggerId.current}`,
                    defaultValue: getDefaultvalue() || defaultValue || [],
                });
            }, 20);
        }
    }, [defaultValue, getDefaultvalue, handleOnConfirm, keyMap, other, selected])

    useEffect(() => {
        return () => {
            PicRef.current?.destroy();
        }
    }, []);

    const renderSelected = useCallback(
        () => {
            let str: string[] = [];
            selected?.forEach((item) => {
                if (typeof item === 'string') {
                    str.push(item);
                } else {
                    let key = 'display';
                    if (keyMap) key = keyMap[key];
                    str.push(item[key])
                }
            });
            return str.join(delimiter || '')
        },
        [delimiter, keyMap, selected],
    )

    return <div ref={triggerRef} className={classNames(s.wrap, className)} id={triggerId.current}>
        {selected?.length ? renderSelected() : children}
    </div>;
}

export default Picker