import { createModel } from '@rematch/core';
import { RootModel } from './models';
import queryString from 'query-string';
import produce from '~/core/helper/produce';
import { TCHRunningTime, TCHStatusType } from '~/types/pageData';
import { cloneDeep } from 'lodash';

const parsed = queryString.parse(window.location.search);
const hash = window.location.hash.split('?')[1];
const hashParsed = queryString.parse(hash);
const height = window.innerHeight;
const width = window.innerWidth;
const windowSize = {
    height,
    width,
}

interface RunningTimesItem {
    [keys: string]: any;
}

const defaultData : {
    [keys: string]: RunningTimesItem;
} = {
    search: {...hashParsed, ...parsed},
    window: windowSize,
    unit: {
        vw: width/100,
        vh: height/100,
    },
};

/**
 * 全局变量，被动增加，被动使用，
 */
export const runningTimes = createModel<RootModel>()({
    state: defaultData, 

    reducers: {
        setRunningTimes: (state, payload: RunningTimesItem) => produce(state, draft => {
          const {search, window, unit, process} = state;
          Object.assign(draft, {
            ...payload,
            search, window, unit, ...process?{process}:{}
          })
        }),
        setRemSize({unit, ...other}, payload: number) {
            const newUnit = Object.assign({rem: payload}, unit);
            return produce(other, draft => {
              draft.unit = newUnit
            })
        },
        // 设置进程
        setProcess(state, payload: {
          thread: string;
          point: string;
          msg: string;
          status: TCHStatusType;
        }) {
          const {process={}, ...other} = state;

          const {thread, point, msg, status} = payload;
          const newProcess:TCHRunningTime = cloneDeep(process) || {};
          newProcess[thread] = newProcess[thread] || {};
          const controls = newProcess[thread].controls = {
            ...newProcess[thread].controls, 
            [point]: {
              status,
              msg
            }
          };

          let currentPoint: {
            thread: string;
            point: string;
            status: TCHStatusType;
            msg: string;
          } | undefined;

          for (const key in controls) {
            if (Object.prototype.hasOwnProperty.call(controls, key)) {
              const element = controls[key];
              currentPoint = {
                thread,
                point: key,
                ...element
              }
              // 遇见unlocked流程打断
              if (element.status === 'unlocked') {
                break;
              }
            }
          }

          if (currentPoint && controls) {
            newProcess[thread] = {
              controls,
              currentPoint,
            }
          }

          const res = produce(other, draft => {
            draft.process = newProcess
          });

          return res
        },

        initRunningTimes() {
            return defaultData
        }
    }
});


