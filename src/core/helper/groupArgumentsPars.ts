
/**组参数转换为参数 */
export default function groupArgumentsPars<K>(arr: {[keys in keyof K]: any}[]): {[keys in keyof K]: (string | undefined)[]}{
  const data: any  = {}
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

/**
 * 将对象数组转换为数组对象
 * {
 *  a:[1,2,3],b:[4,5,6]
 * }
 * to 
 * [{a:1,b:4},{a:2,b:5},{a:3,b:6}]
*/
export function getGroupArgumentsValues<K>(data:{ [keys in keyof K]: any[]; }) {
  const maxLengthOfDataKey = Object.keys(data).sort((a, b)=> data[b].length - data[a].length)[0];
  const loopData = data[maxLengthOfDataKey] as any[];
  const arrRes: { [keys in keyof K]?: any }[] = loopData.map((item: any, eachindex: string | number) => {
    const line = {};
    Object.keys(data).forEach(key => {
      line[key] = data[key]?.[eachindex] || undefined
    })
    return line
  });
  return arrRes
}


