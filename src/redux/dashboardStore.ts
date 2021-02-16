import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModelDashboard } from './dashboardModels'

export const store = init({
    models,
})

export type StoreDashboard = typeof store
export type DispatchDashboard = RematchDispatch<RootModelDashboard>
export type RootStateDashboard = RematchRootState<RootModelDashboard>