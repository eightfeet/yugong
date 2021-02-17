import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel } from './models'
import { dashboardModels, DashboardModel } from './dashboardModels'

export const store = init({
    models: {...models, ...dashboardModels},
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>