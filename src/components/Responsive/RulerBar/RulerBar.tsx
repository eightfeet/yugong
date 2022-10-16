import React, { useCallback, useEffect, useState } from 'react';
import s from './RulerBar.module.scss';

type Item = { name: string; width: number; height: number };

interface Props {
  data: Item[];
  current?: Item;
  onChange: (item: Item) => void;
}


const RulerBar: React.FC<Props> = ({ data, current, onChange }) => {
  const [display, setDisplay] = useState<Item>();

  useEffect(() => {
    if (current) {
      setDisplay(current)
    }
  }, [current])

  const handleHover = useCallback(
    (e: any, item?: Item) => {
      setDisplay(item);
      e.target.classList.add(s.hoverbg)
    },
    [],
  )
  
  const handleOut = useCallback(
    (e: any, item?: Item) => {
      if (!item) return;
      setDisplay(item);
      e.target.classList.remove(s.hoverbg)
    },
    [],
  )

  return (
    <div className={s.root}>
      <>
        {
          data.concat([{name: '全屏', width: -1, height: -1}]).map((item, index) => <div
          key={item.width}
            onMouseOver={e => handleHover(e, item)}
            onMouseOut={e => handleOut(e, current)}
            onClick={() => onChange(item)}
            className={s.item}
            style={{ width: item.width === -1 ? '100%' : item.width, zIndex: data.length - index }} />)
        }
      </>
      <div className={s.size}>
        {display?.name}-{display?.width === -1 ?  '100%' : `${display?.width}px`}
      </div>
    </div>
  )
}

export default RulerBar;