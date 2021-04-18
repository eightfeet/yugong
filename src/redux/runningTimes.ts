import { createModel } from '@rematch/core';
import { RootModel } from './models';
import queryString from 'query-string';

const parsed = queryString.parse(window.location.search);
const height = window.innerHeight;
const width = window.innerWidth;

const windowHeight = {
    height,
    half: height/2,
    quarter: height/4, 
    oneTenth: height/10, 
    oneTwentieth: height/20, 
    oneThirtieth: height/30,
    oneFourtieth: height/40,
    oneFiftieth: height/50,
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
        windowHeight,
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
