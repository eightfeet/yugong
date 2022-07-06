import { cloneDeep } from 'lodash';
import { PointItem, TCHRunningTime } from '~/types/pageData';

export const TCH2Process = (
  TCH: {
    [threadName: string]: PointItem[];
  },
  process: TCHRunningTime = {},
) => {
  const newProcess = cloneDeep(process);
  for (const thread in TCH) {
    if (Object.prototype.hasOwnProperty.call(TCH, thread)) {
      const element = TCH[thread];
      if (!newProcess[thread]) {
        newProcess[thread] = { controls: {} } as any;
      }
      element.forEach((item) => {
        const { point, status, msg } = item;
        if (!newProcess[thread].controls[point]) {
          newProcess[thread].controls[point] = {
            status,
            msg,
          };
        }
      });
      for (let index = 0; index < element.length; index++) {
        const { point } = element[index];
        const item = newProcess[thread].controls[point];
        if (item.status === 'locked') {
          newProcess[thread].currentPoint = {
            point,
            thread,
            ...item
          }
          break;
        } else {
          newProcess[thread].currentPoint = {
            point,
            thread,
            ...item
          }
        }
      }
    }
  }
  return newProcess;
};
