import { createModel } from '@rematch/core';
import { RootModel } from './models';
import queryString from 'query-string'
const parsed = queryString.parse(window.location.search);

interface RunningTimesItem {
    [keys: string]: any;
}

/**
 * 全局变量，被动增加，被动使用，
 */
export const runningTimes = createModel<RootModel>()({
    state: {
        search: parsed,
    } as {
        [keys: string]: RunningTimesItem;
    }, 

    reducers: {
        setRunningTimes(state, payload: RunningTimesItem) {
            return { ...state, ...payload };
        },
    }
});
