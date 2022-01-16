import { createModel } from '@rematch/core';
import { RootModel } from './models';
import produce from 'immer';
import { AppDataListTypes } from '~/types/appData';
import { PageData } from '~/types/pageData';

export interface RecordItem {
    desc: string;
    runningTimes?: {
      [keys: string]: any
    }
    appData?: AppDataListTypes;
    pageData?: PageData;
    key?: number;
}

const defaultData: {
  list: RecordItem[],
  isRecordReady: boolean,
  currentRecord?: number
} = { 
  list:[],
  isRecordReady: false,
  
}

/**
 * 历史记录
 */
export const record = createModel<RootModel>()({
    state: defaultData, 
    reducers: {
        setRecord: (state, payload: RecordItem) => {
          const data = produce(state, draft => { 
            draft.list.forEach((element, index) => {
              if (element.key === state.currentRecord) draft.list = draft.list.splice(index, 9);
            });
            if (draft.list.length > 10) {
              draft.list = draft.list.splice(0, 9);
            } 
            const key = Date.now();
            payload.key = key;
            draft.currentRecord = key;
            draft.list.unshift(payload);
          });
          return data
        },
        setIsReady: (state, payload: boolean) => produce(state, draft => {draft.isRecordReady = payload}),
        setCurrentRecord: (state, payload: number) => produce(state, draft => {draft.currentRecord = payload}),
        initRecord: () => defaultData,
    },
});
