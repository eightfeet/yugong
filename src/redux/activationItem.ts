import { createModel } from '@rematch/core'
import { AppDataLayoutItemTypes } from '~/types/appData';
import { RootModel } from './models'


export const activationItem = createModel<RootModel>()({
    state: {
    } as AppDataLayoutItemTypes, 
    reducers: {
        updateActivationItem(state, payload: AppDataLayoutItemTypes) {
            return {...state, ...payload};
        }
    }
});