import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { Api, AppDataElementsStyleTypes, EventsTypeItem } from "types/appData";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from '~/redux/store';
import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const useMergeAppData = () => {
    const updateAppData = useDispatch<Dispatch>().appData.updateAppData;
    const updateActivationItem = useDispatch<Dispatch>().activationItem.updateActivationItem;
    
    const appData = useSelector((state: RootState) => state.appData);
    const nextAppData = cloneDeep(appData);

    const activationItem = useSelector((state: RootState) => state.activationItem);
    const nextActivationItem = cloneDeep(activationItem);

    const [, setLocalStorage] = useLocalStorage("appData", null);
    
    const update = useCallback(
        (data: AppDataElementsStyleTypes | EventsTypeItem[] | Api[], path: string) => {
            // 合并数据
            set(nextActivationItem, path, data);

            // 将编辑数据合并到appData
            const result = nextAppData.map(item => {
                if (item.moduleId === nextActivationItem.moduleId) {
                    return nextActivationItem
                }
                return item;
            })
            
            // 更新appData
            updateAppData(result);

            // 更新activationItem
            updateActivationItem(nextActivationItem);

            // 更新浏览器本地数据
            setLocalStorage(result);
        },
        [nextActivationItem, nextAppData, updateAppData, updateActivationItem, setLocalStorage],
    )
    
    return update
}
export default useMergeAppData;