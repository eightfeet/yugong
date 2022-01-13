import * as immer from "immer"
import { cloneDeep } from "lodash";
import { store } from "~/redux/store";

type Producer<T> = (draft: immer.Draft<T>) => void;
interface Tag {
  /**变更标签 */
  name: string;
  /**变更描述 */
  desc: string;
}


function saveRecord(name: string) {
    const { runningTimes, appData, pageData } = store.getState();
    store.dispatch.record.setRecord({
      desc: name,
      runningTimes: cloneDeep(runningTimes),
      appData: cloneDeep(appData),
      pageData: cloneDeep(pageData),
    })
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
  if (tag) {
    setTimeout(() => {
      const name = `${tag.name}-${tag.desc}`;
      saveRecord(name)
    }, 1000);
  };
  
  return data
}

export default produce
