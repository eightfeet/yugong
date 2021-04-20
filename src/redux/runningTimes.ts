import { createModel } from '@rematch/core';
import { RootModel } from './models';
import queryString from 'query-string';

const parsed = queryString.parse(window.location.search);
const height = window.innerHeight;
const width = window.innerWidth;

const size = {
    WH: height,
    WW: width,
    'WW/2': width/2,
    'WH/2': height/2,
    'WW/4': width/4,
    'WH/4': height/4,
    'WW/6': width/6,
    'WH/6': height/6,
    'WW/8': width/8,
    'WH/8': height/8,
    'WW/10': width/10,
    'WH/10': height/10,
}

interface RunningTimesItem {
    [keys: string]: any;
}

/**
 * 全局变量，被动增加，被动使用，
 */
export const runningTimes = createModel<RootModel>()({
    state: {
        search: parsed,
        size,
        unit: {
            vw: width/100,
            vh: height/100,
        },
    } as {
        [keys: string]: RunningTimesItem;
    }, 

    reducers: {
        setRunningTimes(state, payload: RunningTimesItem) {
            return { ...state, ...payload };
        },
        setRemSize({unit, ...other}, payload: number) {
            return {...other, unit:{...unit, rem: payload}}
        }
    }
});
