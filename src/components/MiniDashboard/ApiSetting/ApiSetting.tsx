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
    const getExposeApiData = useCallback((): ExposeApi[] => {
        let data = !!type ? require(`~/modules/${type}`).default?.exposeApi : [];
        data = cloneDeep(data);
        return data;
    }, [type, activationItem]);

    /**
     * 更新数据方法
     */
    const updateAppdata = useMergeAppData();

    const onChangeApi = useCallback(
        (data: Api[]) => {
            updateAppdata(data, 'api');
        },
        [updateAppdata, activationItem]
    );

    return (
        <>
            <ApiConfig
                apiData={api}
                defaultApiData={getExposeApiData()}
                onChange={onChangeApi}
            />
        </>
    );
};

export default ApiSetting;
