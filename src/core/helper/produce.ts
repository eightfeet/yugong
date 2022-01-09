import * as immer from "immer"

type Producer<T> = (draft: immer.Draft<T>) => void

/**
 * produce: a wraper of immer produce
 * @param baseState 
 * @param producer 
 * @param trackable 是否记录
 * @returns 
 */
function produce<T>(baseState: Readonly<T>, producer?: Producer<T>, trackable: boolean = false): any {
  let data = baseState;
  if (producer) data = immer.produce(baseState, producer);
  return data
}

export default produce
