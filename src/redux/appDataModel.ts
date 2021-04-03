import { createModel } from '@rematch/core'
import { AppDataListTypes } from '~/types/appData';
import { RootModel } from './models'
import mockAppData from '~/mockdata/appData'

const getAppData = (appdata: AppDataListTypes) => new Promise<AppDataListTypes>((resolve => {
    setTimeout(() => {
        resolve(appdata)
    }, 100)
}))

export const appData = createModel<RootModel>()({
    state: [] as AppDataListTypes, // typed complex state
    reducers: {
        // handle state changes with pure functions
        updateAppData(state, payload: AppDataListTypes) {
            return [...payload];
        },
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