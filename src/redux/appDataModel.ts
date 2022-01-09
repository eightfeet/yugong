import { createModel } from '@rematch/core'
import { AppDataListTypes } from '~/types/appData';
import { RootModel } from './models';
import mockAppData from '~/mockdata/appData';
import produce from '~/core/helper/produce';

const getAppData = (appdata: AppDataListTypes) => new Promise<AppDataListTypes>((resolve => {
    setTimeout(() => {
        resolve(appdata)
    }, 0)
}))

export const appData = createModel<RootModel>()({
    state: [] as AppDataListTypes, // typed complex state
    reducers: {
        // handle state changes with pure functions
        updateAppData(_, payload: AppDataListTypes) {
            const data = [...payload];
            return produce(data, undefined, true);
        },
        initAppData(){
            return []
        }
    },
    effects: (dispach) => {
        const updateAppData = dispach.appData.updateAppData;
        return {
            getAppData: async (appdate: AppDataListTypes) => {
                let data: AppDataListTypes;
                if (appdate && appdate.length > 0) {
                    data = appdate;
                } else {
                    data = await getAppData(mockAppData)
                }
                updateAppData(data)
                return data;
            }
        }
    }
});