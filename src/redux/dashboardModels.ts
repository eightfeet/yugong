/**
 * 独立dashboard数据模型，包含app端数据模型
 */
import { models as AppModels, RootModel } from './models'

export interface RootModelDashboard extends RootModel {
}

export const models: RootModelDashboard = { ...AppModels }