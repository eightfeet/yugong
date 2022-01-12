import { createModel } from '@rematch/core';
import { RootModel } from './models';
import produce from 'immer';
import { store } from './store';

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
export const runningTimes = createModel<RootModel>()({
    state: defaultData, 
    reducers: {
        setRecord: (state, payload: string) => produce(state, draft => { 
          const data: RecordItem = {
            desc: payload,
            runningTimes: store.getState().runningTimes,
            appData: store.getState().appData,
            pageData: store.getState().pageData
          }
          draft.push(data);
          if (draft.length > 10) {
            draft = draft.slice(draft.length - 10)
          } 
        })
    }
});
