import { keys } from "@material-ui/core/styles/createBreakpoints";

interface ObjItem {
  [keys: string]: string;
}

type Obj2arr = (arr: {
  [keys: string]: string | undefined;
}[]) => ({[keys: string]: any})


//  StateType => any
// 因为state没有设置类型，所以ts推断state的类型为any

export function obj2arr<K>(arr: {[keys: string]: any}[]){
  const data: {} = {}
  arr.forEach((subObject: any) => {
    for (const key in subObject) {
      if (Object.prototype.hasOwnProperty.call(subObject, key)) {
        const element = subObject[key];
        data[key] = [...data[key]||[], element];
      }
    }
  })
  return data;
}


