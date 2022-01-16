import * as immer from "immer"
import { cloneDeep } from "lodash";
import { sendMessage } from "~/hooks/usePostMessage";
import { store } from "~/redux/store";

type Producer<T> = (draft: immer.Draft<T>) => void;
interface Tag {
  /**变更标签 */
  name: string;
  /**变更描述 */
  desc: string;
}

// 操作后每3s保存一次数据，频繁操作仅保存最后一次记录
let recordTimer: number | undefined = undefined;
export function saveRecord(name: string) {
  if (recordTimer) window.clearTimeout(recordTimer);
  if (!store.getState().record.isRecordReady) return;
  recordTimer = window.setTimeout(() => {
    const { runningTimes, appData, pageData } = store.getState();
    store.dispatch.record.setRecord({
      desc: name,
      runningTimes: cloneDeep(runningTimes),
      appData: cloneDeep(appData),
      pageData: cloneDeep(pageData),
    })
  }, 3000);
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
    const name = `${tag.name}-${tag.desc}`;
    const path = window.location.pathname;
    // 所有编辑预览视图下记录数据都统一从iframe中发出，通过postmessage到dashboard
    if (path.indexOf('/isediting') !== -1) {
      sendMessage({
        tag: 'record',
        value: name
      }, window.top)
    }
    // 管理面板下直接保存记录
    if (path.indexOf('/dashboard') !== -1) {
      saveRecord(name)
    }
  };
  
  return data
}

export default produce
