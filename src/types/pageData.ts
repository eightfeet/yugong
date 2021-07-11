import { Api, BackgroundCommonTypesOfStyleItems, BackgroundGradientTypesOfStyleItems, BackgroundGroupTypesOfStyleItems } from "./appData";
import { EventsTypeItem } from "./modules";

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
    /* 挂载事件 */
    mountEnvents?: EventsTypeItem[];
    /* 卸载事件 */
    unmountEnvents?: EventsTypeItem[];
    /* 百度统计Id */
    statisticsId?: string;
    /* 删格列数*/
    cols?: number;
    /* 删格间距*/
    space?: number;
    /* 删格行高*/
    rowHeight?: number;
    /** window height */
    windowWidth?: number;
    /** window width */
    windowHeight?: number;
    /**模板信息 */
    template?: Template;
}
