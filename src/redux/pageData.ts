import { createModel } from '@rematch/core';
import {
    Api,
    BackgroundCommonTypesOfStyleItems,
    BackgroundGradientTypesOfStyleItems,
} from '~/types/appData';
import { EventsType, EventsTypeItem } from '~/types/modules';
import { RootModel } from './models';

interface PageData {
    pageTitle?: string;
    unit?: 'px' | 'rem' | 'vh' | 'vw';
    toUnit?: 'px' | 'rem' | 'vh' | 'vw';
    UIWidth?: number;
    baseFont?: number;
    style?: {
        backgroundCommon?: BackgroundCommonTypesOfStyleItems;
        backgroundGradient?: BackgroundGradientTypesOfStyleItems;
    };
    onLoadApi?: Api[];
    mountEnvents?: EventsTypeItem[];
    unmountEnvents?: EventsTypeItem[];
    statisticsId?: string;
}

export const pageData = createModel<RootModel>()({
    state: {
        pageTitle: '页面名称',
        style: {},
        unit: 'px',
        toUnit: 'px',
        onLoadApi: [],
        mountEnvents: [],
        unmountEnvents: [],
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
