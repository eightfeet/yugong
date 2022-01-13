import { createModel } from '@rematch/core';
import { RootModel } from './models';
import produce from 'immer';

interface RecordItem {
    desc: string;
    runningTimes?: {
      [keys: string]: any
    }
    appData?: any;
    pageData?: any;
}

const defaultData:RecordItem[] = []

/**
 * 全局变量，被动增加，被动使用，
 */
export const record = createModel<RootModel>()({
    state: defaultData, 
    reducers: {
        setRecord: (state, payload: RecordItem) => {
          console.log(3, payload.desc);
          return produce(state, draft => { 
            draft.push(payload);
            if (draft.length > 10) {
              draft = draft.slice(draft.length - 10)
            } 
          })
        }
    }
});
