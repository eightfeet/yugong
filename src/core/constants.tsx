import Icon from '@ant-design/icons';
import IconSlider from "./icons/IconSlider";
import IconButton from "./icons/IconButton";
import IconText from "./icons/IconText";
import IconImage from './icons/IconImage';

export const MODULES = [
  {
    moduleName: "Text",
    title: "Text",
    discribe: "文本",
    icon: <Icon component={IconText} />
  },
  {
    moduleName: "Image",
    title: "Image",
    discribe: "图片",
    icon: <Icon component={IconImage} />
  },
  {
    moduleName: "Button",
    title: "Button",
    discribe: "按钮",
    icon: <Icon component={IconButton} />
  },
  {
    moduleName: "Slider",
    title: "Slider",
    discribe: "跑马灯",
    icon: <Icon component={IconSlider} />
  },
];

// 默认字体大小
export const ROOT_FONTSIZE = 16;
// 默认单位
export const DEFAULT_UNIT = 'px';
// 默认转换单位
export const DEFAULT_TO_UNIT = 'px';
// 默认页面标题
export const DEFAULT_PAGE_TITLE = '页面标题';
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

// export default {}
