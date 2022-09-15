import {
  Api,
  ArgumentsItem,
  BackgroundCommonTypesOfStyleItems,
  BackgroundGradientTypesOfStyleItems,
  BackgroundGroupTypesOfStyleItems,
} from './appData';
import { EventsTypeItem } from './modules';

export interface Template {
  /**模板id */
  id?: number;
  /**用户id */
  userId?: number;
  /**名称 */
  title?: string;
  /**标签 */
  tag?: string;
  /**终端 */
  terminal?: string;
  /**封面 */
  cove?: string;
  /**描述 */
  describe?: string;
  /**0不公开，1公开 */
  isPublic?: 0 | 1;
}

export type TCHStatusType = 'locked' | 'unlocked';

export interface PageData {
  /* *页面标题 */
  pageTitle?: string;
  /* 页面单位 */
  unit?: 'px' | 'rem' | 'vh' | 'vw';
  /* 转换到页面单位 */
  toUnit?: 'px' | 'rem' | 'vh' | 'vw';
  /* UI宽度 */
  UIWidth?: number;
  /* 基准字符大小 */
  baseFont?: number;
  /* 样式 */
  style?: {
    backgroundCommon?: BackgroundCommonTypesOfStyleItems;
    backgroundGradient?: BackgroundGradientTypesOfStyleItems;
    backgroundGroup?: BackgroundGroupTypesOfStyleItems;
  };
  /* api */
  onLoadApi?: Api[];
  globalApi?: Api[];
  /* 挂载事件 */
  mountEnvents?: EventsTypeItem[];
  /* 首次交互 */
  usergestureEnvents?: EventsTypeItem[];
  /* 卸载事件 */
  unmountEnvents?: EventsTypeItem[];
  /* 百度统计Id */
  statisticsId?: string;
  /* 删格列数*/
  cols?: number;
  /* 删格间距*/
  space?: number;
  /* 删格行高*/
  rowHeight?: number | string;
  /** window height */
  windowWidth?: number;
  /** window width */
  windowHeight?: number;
  /**模板信息 */
  template?: Template;
  /** 页面线程 */
  TCH?: {
    /**线程名 */
    [threadName: string]: PointItem[]
  };
  /** 线程进程 */
  TCHProcess?: {
    /**线程 */
    [threadName: string]: TCHProcessItemType[]
  },
  clientRowHeight?: number
}

export interface TCHProcessItemType {
  /**线程状态 */
  status?: TCHStatusType;
  /**模块名 */
  module?: string,
  /**事件分发 方法名 */
  dispatch?: string,
  /**事件执行参数 */
  arguments?: ArgumentsItem[],
  /**关键节点 */
  point?: string,
}

export interface PointItem {
  point: string;
  status: TCHStatusType;
  msg: string;
}


export interface TCHLinePoints {
  /**节点 */
  key: string;
  /**节点条件 */
  status: TCHStatusType;
  /**信息 */
  msg: string;
  /**执行者 */
  executor: string,
  /**参数 */
  arguments: ArgumentsItem[]
}

/** 线程 */
export interface TCHLine {
  /**线程名称 */
  name: string;
  /**关键节点 */
  points: TCHLinePoints[];
}

interface TCHPointControl {
  // 节点状态
  status: TCHStatusType;
  // 错误信息
  msg: string;
};

/** 运行时线程 */
export interface TCHRunningTime {
  /**线程 */
  [thread: string]: {
    /** 关键节点 */
    controls: {
      [point: string]: TCHPointControl
    },
    /** 当前节点状态 */
    currentPoint: {
      thread: string;
      point: string;
      status: TCHStatusType;
      msg: string;
    }
  }
}