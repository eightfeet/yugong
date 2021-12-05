import { createModel } from '@rematch/core';
import {
  DEFAULT_PAGE_HEIGHT,
  DEFAULT_PAGE_TITLE,
  DEFAULT_PAGE_WIDTH,
  DEFAULT_TO_UNIT,
  DEFAULT_UNIT,
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_ROWHEIGHT,
  GRID_DEFAULT_SPACE,
} from '~/core/constants';
import {
  Api,
  BackgroundCommonTypesOfStyleItems,
  BackgroundGradientTypesOfStyleItems,
} from '~/types/appData';
import { EventsType } from '~/types/modules';
import { PageData } from '~/types/pageData';
import { RootModel } from './models';

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
};

export const pageData = createModel<RootModel>()({
  state: defaultData, // typed complex state
  reducers: {
    updatePage(state, payload: PageData) {
      return { ...state, ...payload };
    },
    updatePageStyle(
      state,
      payload: {
        backgroundCommon?: BackgroundCommonTypesOfStyleItems;
        backgroundGradient?: BackgroundGradientTypesOfStyleItems;
      },
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
    initPageData(state, pageData?: PageData) {
      return { ...defaultData, ...(pageData || {}) };
    },
    setWindowWidth(state, payload: number) {
      return { ...state, windowWidth: payload };
    },
    setWindowHeight(state, payload: number) {
      return { ...state, windowHeight: payload };
    },
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
