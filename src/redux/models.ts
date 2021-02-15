import { Models } from '@rematch/core'
import { appData } from './appDataModel'
import { activationItem } from './activationItem'
import { controller } from './controller'

export interface RootModel extends Models<RootModel> {
    appData: typeof appData,
    activationItem: typeof activationItem,
    controller: typeof controller
}

export const models: RootModel = { appData, activationItem, controller }