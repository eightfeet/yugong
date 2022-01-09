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
import { PageData } from '~/types/pageData';
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
};

export const pageData = createModel<RootModel>()({
  state: defaultData, // typed complex state
  reducers: {
    updatePage: (state, payload: PageData) => produce(state, draft => {Object.assign(draft, payload)}, true),
    updatePageStyle: (
      state,
      payload: {
        backgroundCommon?: BackgroundCommonTypesOfStyleItems;
        backgroundGradient?: BackgroundGradientTypesOfStyleItems;
      },
    ) => produce(state, draft => {draft.style = payload}, true),
    updatePageApi: (state, payload: Api[]) => produce(state, draft => {draft.onLoadApi = payload}, true),
    updatePageEvents: (state, payload: EventsType[]) => produce(state, draft => {(draft as any).onLoadEnvents = payload}, true),
    initPageData: (state, payload?: PageData) => produce(state, draft => {Object.assign(draft, payload || {})}, true),
    setWindowWidth: (state, payload: number) => produce(state, draft => {draft.windowWidth = payload}, true),
    setWindowHeight: (state, payload: number) => produce(state, draft => {draft.windowHeight = payload}, true),
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
