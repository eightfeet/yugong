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
      const oneBaseThread = TCH[thread];
      if (!newProcess[thread]) {
        newProcess[thread] = { controls: {} } as any;
      }
      
      const oneBaseThreadPoints:string[]=[];
      oneBaseThread.forEach((item) => {
        const { point, status, msg } = item;
        oneBaseThreadPoints.push(point)
        if (!newProcess[thread].controls[point]) {
          newProcess[thread].controls[point] = {
            status,
            msg,
          };
        }
      });
      // 移除不包含属性
      for (const point in newProcess[thread].controls) {
        if (Object.prototype.hasOwnProperty.call(newProcess[thread].controls, point)) {
          if (!oneBaseThreadPoints.includes(point)) {
            delete newProcess[thread].controls[point]
          }
        }
      }
      
      // 计算currentPoint结果
      for (let index = 0; index < oneBaseThread.length; index++) {
        const { point } = oneBaseThread[index];
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
