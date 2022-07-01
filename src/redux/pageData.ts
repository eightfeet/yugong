import { createModel } from '@rematch/core';
import {
  DEFAULT_PAGE_HEIGHT,
  DEFAULT_PAGE_TITLE,
  DEFAULT_PAGE_WIDTH,
  DEFAULT_TO_UNIT,
  DEFAULT_UNIT,
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_SPACE,
} from '~/core/constants';
import {
  Api,
  BackgroundCommonTypesOfStyleItems,
  BackgroundGradientTypesOfStyleItems,
} from '~/types/appData';
import { EventsType } from '~/types/modules';
import { PageData, PointItem, TCHProcessItemType } from '~/types/pageData';
import { RootModel } from './models';
import produce from '~/core/helper/produce';

// grid 部分参数无法热更新，这里优先使用最正确的数据，然后使用默认数据
let localPageData: PageData = {};
try {
  let localStrPageData = localStorage.getItem('pageData');
  if (localStrPageData) {
    localPageData = JSON.parse(localStrPageData);
  }
} catch (error) {
  console.warn(error);
}

const defaultData: PageData = {
  pageTitle: DEFAULT_PAGE_TITLE,
  style: {},
  unit: DEFAULT_UNIT,
  toUnit: DEFAULT_TO_UNIT,
  onLoadApi: [],
  mountEnvents: [],
  unmountEnvents: [],
  cols: localPageData.cols || GRID_DEFAULT_COLS,
  rowHeight: localPageData.rowHeight,
  space: localPageData.space || GRID_DEFAULT_SPACE,
  windowWidth: localPageData.windowWidth || DEFAULT_PAGE_WIDTH,
  windowHeight: localPageData.windowHeight || DEFAULT_PAGE_HEIGHT,
  TCH: {
    featureA: [
      {
        point: 'featureA_login',
        status: 'locked',
        msg: '请先登录',
      },
      {
        point: 'featureA_emplay',
        status: 'locked',
        msg: '必须是店员',
      },
    ],
    featureB: [
      {
        point: 'featureB_login',
        status: 'locked',
        msg: '请先登录',
      },
      {
        point: 'featureB_emplay',
        status: 'locked',
        msg: '必须是店员',
      },
    ],
  },
  TCHProcess: {
    featureA: [
      {
        status: 'locked',
        dispatch: 'global/sleepFor',
        arguments: [
          {
            type: 'number',
            name: '休眠时间',
            fieldName: 'sleepTime',
            describe: '休眠时间(ms)',
            data: '1000',
          },
        ],
        point: 'featureA_login',
      },
    ],
  },
};

export const pageData = createModel<RootModel>()({
  state: defaultData, // typed complex state
  reducers: {
    updatePage: (state, payload: PageData) =>
      produce(state, (draft) => {
        Object.assign(draft, payload);
      }),
    updatePageStyle: (
      state,
      payload: {
        backgroundCommon?: BackgroundCommonTypesOfStyleItems;
        backgroundGradient?: BackgroundGradientTypesOfStyleItems;
      },
    ) =>
      produce(state, (draft) => {
        draft.style = payload;
      }),
    updatePageApi: (state, payload: Api[]) =>
      produce(state, (draft) => {
        draft.onLoadApi = payload;
      }),
    /**更新线程进程*/
    resetTCHProcess: (
      state,
      payload: {
        [lineName: string]: TCHProcessItemType[];
      },
    ) =>
      produce(state, (draft) => {
        draft.TCHProcess = payload;
      }),
    /**更新线程定义*/
    updateTCHItem: (
      state,
      payload: {
        [lineName: string]: PointItem[];
      },
    ) =>
      produce(state, (draft) => {
        draft.TCH = {
          ...draft.TCH,
          ...payload
        };
      }),
    /**新增线程定义*/
    removeTCHItem: (
      state,
      payload: string, 
    ) =>
      produce(state, (draft) => {
        if (draft.TCH?.[payload]) {
          delete draft.TCH?.[payload];
        }
        if (draft.TCHProcess?.[payload]) {
          delete draft.TCHProcess?.[payload];
        }
      }),

    updatePageEvents: (state, payload: EventsType[]) =>
      produce(state, (draft) => {
        (draft as any).onLoadEnvents = payload;
      }),
    initPageData: (state, payload?: PageData) =>
      produce(defaultData, (draft) => {
        Object.assign(draft, payload || {});
      }),
    setWindowWidth: (state, payload: number) =>
      produce(state, (draft) => {
        draft.windowWidth = payload;
      }),
    setWindowHeight: (state, payload: number) =>
      produce(state, (draft) => {
        draft.windowHeight = payload;
      }),
  },
  effects: (dispach) => {
    const updatePage = dispach.pageData.updatePage;
    return {
      getPageData: async (pageData: PageData) => {
        let data: PageData = {};
        if (Object.prototype.toString.call(pageData) === '[object Object]') {
          data = await Promise.resolve(pageData);
        }
        updatePage(data);
        return data;
      },
    };
  },
});
