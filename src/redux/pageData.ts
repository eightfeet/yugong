import { createModel } from "@rematch/core";
import {
  Api,
  BackgroundCommonTypesOfStyleItems,
  BackgroundGradientTypesOfStyleItems,
} from "~/types/appData";
import { EventsType } from "~/types/modules";
import { RootModel } from "./models";

interface PageData {
  neme?: string;
  unit?: "px" | "rem" | "vh" | "vw";
  toUnit?: "px" | "rem" | "vh" | "vw";
  style?: {
    BackgroundCommon?: BackgroundCommonTypesOfStyleItems;
    BackgroundGradient?: BackgroundGradientTypesOfStyleItems;
  };
  onLoadApi?: Api[];
  onLoadEnvents?: EventsType[];
}

export const pageData = createModel<RootModel>()({
  state: {
    neme: "页面名称",
    style: {},
    unit: "px",
    toUnit: "px",
    onLoadApi: [],
    onLoadEnvents: [],
  } as PageData, // typed complex state
  reducers: {
    updatePage(state, payload: PageData) {
      return { ...state, ...payload };
    },
    updatePageStyle(
      state,
      payload: {
        BackgroundCommon?: BackgroundCommonTypesOfStyleItems;
        BackgroundGradient?: BackgroundGradientTypesOfStyleItems;
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
  }
});
