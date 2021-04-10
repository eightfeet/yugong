import React, { useCallback, useEffect, useState } from "react";
import { AnyObjectType, AppDataElementsTypes } from "types/appData";
import description from "~/compiler/description";
import s from "./Tabs.module.scss";

interface Props extends AppDataElementsTypes {
  onClick?: (data: string) => void;
}

const Tabs: React.FC<Props> = (props) => {

  const [menu, setmenu] = useState<any[]>();
  const [select, setselect] = useState()
  useEffect(() => {
    const handleObj = (Obj: AnyObjectType) => {
      const temp: any = [];
      if (Object.prototype.toString.call(Obj) === "[object Object]") {
        Object.keys(Obj).forEach((key, i) => {
          const element = Obj[key];
          const checktype = Object.prototype.toString.call(element);
          if (
            checktype === "[object Object]" ||
            checktype === "[object Array]"
          ) {
            temp.push(key);
          }
        });
      }
      return temp;
    };

    const data = handleObj(description());
    setmenu(data);
  }, []);

  const clickItem = useCallback((item) => () => {
    setselect(item)
    if (props.onClick instanceof Function) {
      props.onClick(item)
    }
  }, [props]);

  return <div className={s[`stage${0}`]}>
    {menu?.map((item, i) => <div className={item === select? s.selected : ''} key={i} onClick={clickItem(item)}>{item}</div>)}
  </div>;
};

export default Tabs;
