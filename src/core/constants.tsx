import Icon from "@ant-design/icons";
import IconSlider from "./icons/IconSlider";
import IconButton from "./icons/IconButton";
import IconText from "./icons/IconText";
import IconImage from "./icons/IconImage";
import IconTable from "./icons/IconTable";
import IconForm from "./icons/IconForm";
import IconModal from "./icons/IconModal";
import IconRoulette from "./icons/IconRoulette";
import IconBroadcast from "./icons/IconBroadcast";
import IconChart from "./icons/IconChart";
import IconVideo from "./icons/IconVideo";
import IconChartPie from "./icons/IconChartPie";
import IconChartRadar from "./icons/IconChartRadar";
import IconClock from "./icons/IconClock";

export const BASEMODULES = [
  {
    moduleName: "Text",
    title: "Text",
    discribe: "文本",
    icon: <Icon component={IconText} />,
  },
  {
    moduleName: "Image",
    title: "Image",
    discribe: "图片",
    icon: <Icon component={IconImage} />,
  },
  {
    moduleName: "Button",
    title: "Button",
    discribe: "按钮",
    icon: <Icon component={IconButton} />,
  },
  {
    moduleName: "Table",
    title: "Table",
    discribe: "表格",
    icon: <Icon component={IconTable} />,
  },
  {
    moduleName: "Slider",
    title: "Slider",
    discribe: "跑马灯",
    icon: <Icon component={IconSlider} />,
  },
  {
    moduleName: "VideoPlayer",
    title: "VideoPlayer",
    discribe: "视频",
    icon: <Icon component={IconVideo} />,
  },
  {
    moduleName: "Form",
    title: "Form",
    discribe: "表单",
    icon: <Icon component={IconForm} />,
  },
  {
    moduleName: "Modal",
    title: "Modal",
    discribe: "对话框",
    tips: "对话框属于隐形模块，请在设置面板中选择编辑",
    icon: <Icon component={IconModal} />,
  },
  {
    moduleName: "Broadcast",
    title: "Broadcast",
    discribe: "滚动播报",
    icon: <Icon component={IconBroadcast} />,
  },
  {
    moduleName: "CountdownTimer",
    title: "CountdownTimer",
    discribe: "倒计时",
    icon: <Icon component={IconClock} />,
  }
];

export const LOTTERY = [
  {
    moduleName: "Lottery",
    title: "Lottery",
    discribe: "抽奖",
    icon: <Icon component={IconRoulette} />,
  }
]

export const CHARTS = [
  {
    moduleName: "ChartBarAndLine",
    title: "ChartBarAndLine",
    discribe: "折线/柱状",
    icon: <Icon component={IconChart} />,
  },
  {
    moduleName: "ChartDoughnutAndPie",
    title: "ChartDoughnutAndPie",
    discribe: "环状/饼状",
    icon: <Icon component={IconChartPie} />,
  },
  {
    moduleName: "ChartRadar",
    title: "ChartRadar",
    discribe: "雷达",
    icon: <Icon component={IconChartRadar} />,
  },
  {
    moduleName: "NumberCountUp",
    title: "NumberCountUp",
    discribe: "滚动数字",
    icon: <Icon component={IconChartRadar} />,
  }
]

export const MODULES = [
  {
    name: "base",
    describe: "基础组件",
    modules: BASEMODULES,
  },
  {
    name: "lottery",
    describe: "抽奖组件",
    modules: LOTTERY,
  },
  {
    name: "chart",
    describe: "统计图组件",
    modules: CHARTS,
  },
];

// 默认字体大小
export const ROOT_FONTSIZE = 16;
// 默认单位
export const DEFAULT_UNIT = "px";
// 默认转换单位
export const DEFAULT_TO_UNIT = "px";
// 默认页面标题
export const DEFAULT_PAGE_TITLE = "页面标题";
// 默认页面屏幕宽度
export const DEFAULT_PAGE_WIDTH = 414;
// 默认页面屏幕宽度
export const DEFAULT_PAGE_HEIGHT = 736;
// 栅格默认间隔
export const GRID_DEFAULT_SPACE = 0;
// 栅格默认行高
export const GRID_DEFAULT_ROWHEIGHT = 20;
// 栅格默认列数
export const GRID_DEFAULT_COLS = 12;
// TagColor
export const TAG_TYPE = ["purple", "magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
// export default {}

export const createDesc = (name: string, desc?: string) =>  ({name, desc: desc || ''});
  