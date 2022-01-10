import * as immer from "immer"

type Producer<T> = (draft: immer.Draft<T>) => void;
interface Tag {
  /**变更标签 */
  name: string;
  /**变更描述 */
  desc: string;
}

/**
 * produce: a wraper of immer produce
 * @param baseState 
 * @param producer 
 * @param tag 记录标签
 * @returns 
 */
function produce<T>(baseState: Readonly<T>, producer?: Producer<T>, tag?: Tag): any {
  let data = baseState;
  if (producer) data = immer.produce(baseState, producer);
  if (tag) console.log(`${tag.name}-${tag.desc}`);
  
  return data
}

export default produce
