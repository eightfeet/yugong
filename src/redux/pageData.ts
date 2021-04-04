import { createModel } from '@rematch/core';
import { DEFAULT_PAGE_TITLE, DEFAULT_TO_UNIT, DEFAULT_UNIT, GRID_DEFAULT_COLS, GRID_DEFAULT_ROWHEIGHT, GRID_DEFAULT_SPACE } from '~/core/constants';
import {
    Api,
    BackgroundCommonTypesOfStyleItems,
    BackgroundGradientTypesOfStyleItems,
} from '~/types/appData';
import { EventsType, EventsTypeItem } from '~/types/modules';
import { RootModel } from './models';

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
    space?:number;
    /* 删格行高*/
    rowHeight?: number;
}

// grid 部分参数无法热更新，这里优先使用最正确的数据，然后使用默认数据
let localPageData:PageData = {};
try {
    let localStrPageData = localStorage.getItem('pageData');
    if (localStrPageData) {
        localPageData = JSON.parse(localStrPageData)
    } 
} catch (error) {
    console.warn(error)
}

export const pageData = createModel<RootModel>()({
    state: {
        pageTitle: DEFAULT_PAGE_TITLE,
        style: {},
        unit: DEFAULT_UNIT,
        toUnit: DEFAULT_TO_UNIT,
        onLoadApi: [],
        mountEnvents: [],
        unmountEnvents: [],
        cols: localPageData.cols || GRID_DEFAULT_COLS,
        rowHeight: localPageData.rowHeight || GRID_DEFAULT_ROWHEIGHT,
        space: localPageData.space || GRID_DEFAULT_SPACE
    } as PageData, // typed complex state
    reducers: {
        updatePage(state, payload: PageData) {
            return { ...state, ...payload };
        },
        updatePageStyle(
            state,
            payload: {
                backgroundCommon?: BackgroundCommonTypesOfStyleItems;
                backgroundGradient?: BackgroundGradientTypesOfStyleItems;
            }
        ) {
            return { ...state, style: payload };
        },
        updatePageApi(state, payload: Api[]) {
            return {
                ...state,
                onLoadApi: payload,
            };
        },
        updatePageEvents(state, payload: EventsType[]) {
            return {
                ...state,
                onLoadEnvents: payload,
            };
        },
    },
    effects: (dispach) => {
        const updatePage = dispach.pageData.updatePage;
        return {
            getPageData: async (pageData: PageData) => {
                let data: PageData = {};
                if (
                    Object.prototype.toString.call(pageData) ===
                    '[object Object]'
                ) {
                    data = await Promise.resolve(pageData);
                }
                updatePage(data);
                return data;
            },
        };
    },
});
