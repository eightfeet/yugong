import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { BoxShadow } from '../Shadow';
import ShadowItem from '../ShadowItem';
import s from './ShadowListHoc.module.less';

type Type = "text" | "box";

interface Props {
    data: BoxShadow[];
    type: Type;
    onMinus: (type: Type, i:number) => void;
    onToggleShow: (i: number, type: Type) => void;
    onChangeColor: (type: Type, i:number, color: any) => void;
    onChangeInset: (type: Type, i:number, value: boolean) => void;
    onChangeshiftRight: (type: Type, i:number, value:any) => void;
    onChangeshiftDown: (type: Type, i:number, value:any) => void;
    onChangeBlur: (type: Type, i:number, value:any) => void;
    onChangeSpread: (type: Type, i:number, value:any) => void;
}

const ShadowListHoc = SortableContainer(({
    data,
    type,
    onMinus,
    onToggleShow,
    onChangeColor,
    onChangeInset,
    onChangeshiftRight,
    onChangeshiftDown,
    onChangeBlur,
    onChangeSpread,
}: Props) => {
    return (
        <div className={s.wrap}>
            {data.map((item, i) => (
          <ShadowItem
            key={i}
            index={i}
            data={item}
            type={type}
            onMinus={() => onMinus(type, i)}
            onToggleShow={() => onToggleShow(i, type)}
            onChangeColor={(color: any) => onChangeColor(type, i, color)}
            onChangeInset={(value) => onChangeInset(type, i, value)}
            onChangeshiftRight={(value: any) => onChangeshiftRight(type, i, value)}
            onChangeshiftDown={(value: any) => onChangeshiftDown(type, i, value)}
            onChangeBlur={(value: any) => onChangeBlur(type, i, value)}
            onChangeSpread={(value: any) => onChangeSpread(type, i, value)}
          />
        ))}
        </div>
    )
})

export default ShadowListHoc