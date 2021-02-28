const hourglass = (times: number) =>
  new Promise((res) => setTimeout(() => res(""), times || 1000));

const fn = () => console.log("other effect！");

const defaultFn = {
  "globalEffect/hourglass": hourglass,
  "globalEffect/fn": fn,
};

export const globalOption = {
  name: "全局",
  value: "globalEffect",
  type: "global",
};

export const globalExposeFunctions = [
  {
    name: "hourglass",
    description: "沙漏",
  },
  {
    name: "fn",
    description: "其他方法",
  },
];


export default defaultFn;
