import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import useMergeAppData from '~/hooks/useMergeAppData';
import { RootState } from '~/redux/store';
import { Api } from '~/types/appData';
import { ExposeApi } from '~/types/modules';
import ApiConfig from '../ApiConfig';

interface Props {}
const ApiSetting: React.FC<Props> = () => {
    /**
     * 获取当前被选择项的api数据
     */
    const activationItem = useSelector(
        (state: RootState) => state.activationItem
    );

    const { api, type } = activationItem;

    /**
     * 获取当前被选组件导出的（自定义）默认Api数据
     */
    const getDefaultApiData = useCallback((): ExposeApi[] => {
        let defaultData = !!type ? require(`~/modules/${type}`).default?.exposeApi : [];
        defaultData = cloneDeep(defaultData);
        let optApi = cloneDeep(api);
        // k-比对apiId合并默认数据与保存数据，
        const result = defaultData.map((element: ExposeApi) => {
            const current = optApi?.find(item => item.apiId === element.apiId);
            let optElememts = element;
            if (current) {
                optElememts = {...optElememts, ...current}
            }
            return optElememts;
        });
        return result;
    }, [type, api]);

    /**
     * 更新数据方法
     */
    const updateAppdata = useMergeAppData();

    const onChangeApi = useCallback(
        (data: Api[]) => {
            updateAppdata(data, 'api');
        },
        [updateAppdata]
    );

    return (
        <>
            <ApiConfig
                apiData={api}
                defaultApiData={getDefaultApiData()}
                onChange={onChangeApi}
            />
        </>
    );
};

export default ApiSetting;
