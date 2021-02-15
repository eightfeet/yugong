import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { AppDataElementsStyleTypes } from "types/appData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '~/redux/store';
import { useCallback } from 'react';

const useMergeAppData = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state)
    const appData = cloneDeep(state.appData);
    const update = useCallback(
        (data: AppDataElementsStyleTypes, path: string) => {
            const activationItem = cloneDeep(state.activationItem);
            // 合并数据
            set(activationItem, path, data);
            // 返回数据集
            const result = appData.map(item => {
                if (item.moduleId === activationItem.moduleId) {
                    return activationItem
                }
                return item;
            })
    
            dispatch.appData.updateAppData(result);
            dispatch.activationItem.updateActivationItem(activationItem);
    
        },
        [state.activationItem, appData, dispatch.appData, dispatch.activationItem],
    )
    
    return update
}
export default useMergeAppData;