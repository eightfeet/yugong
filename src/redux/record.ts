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
 * 被动使用，
 */
export const record = createModel<RootModel>()({
    state: defaultData, 
    reducers: {
        setRecord: (state, payload: RecordItem) => {
          const data = produce(state, draft => { 
            draft.push(payload);
            if (draft.length > 10) {
              draft = draft.splice(0, 1);
            } 
          });
          return data
        },
    },
});
