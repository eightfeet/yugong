
/**组参数转换为参数 */
export function groupArgumentsPars<K>(arr: {[keys in keyof K]: any}[]): {[keys in keyof K]: (string | undefined)[]}{
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


