import { createModel } from '@rematch/core'
import { AppDataListTypes } from '~/types/appData';
import { RootModel } from './models'

export const appData = createModel<RootModel>()({
    state: [] as AppDataListTypes, // typed complex state
    reducers: {
        // handle state changes with pure functions
        updateAppData(state, payload: AppDataListTypes) {
            return [...payload];
        },
    }
});