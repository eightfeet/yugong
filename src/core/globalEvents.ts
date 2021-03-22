import { ExposeFunctions } from "~/types/modules";
import getResult from '~/core/getDataFromRunningTime';

const hourglass = (times: string) => {
    const timesResult = parseInt(getResult(times));
    return new Promise((res) => setTimeout(() => res(""), timesResult || 3000));
}

const fn = () => console.log("fn other effect！");
// {
//   name: 'mount',
//   description: '挂载',
// },
// {
//   name: 'unmount',
//   description: '卸载',
// },
const defaultFn = {
  "globalEffect/": hourglass,
  "globalEffect/hourglass": hourglass,
  "globalEffect/fn": fn,
};

export const globalOption = {
  name: "全局",
  uuid: "globalEffect",
  type: "global",
};

export const globalExposeFunctions: ExposeFunctions[] = [
  {
    name: "hourglass",
    description: "沙漏",
    arguments: [{
      type: 'number',
      name: '计时器',
      describe: '延时计时器，等待时间后执行下一个任务！',
      data: '3000'
    }]
  },
  {
    name: "fn",
    description: "其他方法",
  },
];


export default defaultFn;
