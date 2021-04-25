import { store } from "~/redux/store";
import { ArgumentsItem } from "~/types/appData";
import { ExposeFunctions } from "~/types/modules";

/**
 * 根据模块ID获取用模块参数信息
 * @param name moduleId + 事件名称，
 * @returns 
 */
const getDefaultArgumentsByEventName = (name: string): ArgumentsItem[] | undefined => {
    const grounp = name.split('/');
    const appData = store.getState().appData;
    const module = appData.find(item => item.moduleId === grounp[0]);
    if (module?.type) {
        const exposeFunctions: ExposeFunctions[] = require(`~/modules/${module?.type}`).default?.exposeFunctions;
        const defaultFunction = exposeFunctions.find(element => element.name === grounp[1]);
        return defaultFunction?.arguments 
    }
}

export default getDefaultArgumentsByEventName;
