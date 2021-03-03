import { createModel } from '@rematch/core';
import { RootModel } from './models';

interface RunningTimesItem {
    [keys: string]: any;
}

/**
 * 全局变量，被动增加，被动使用，
 */
export const runningTimes = createModel<RootModel>()({
    state: {
        searchs: {}
    } as {
        [keys: string]: RunningTimesItem;
    }, 

    reducers: {
        setRunningTimes(state, payload: RunningTimesItem) {
            return { ...state, ...payload };
        },
    },

    effects: (dispatch) => {
        return {
            useRunningTimes: () => {
                // to do...
                // 
            }
        }
    }
});
