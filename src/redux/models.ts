import { Models } from '@rematch/core'
import { appData } from './appDataModel'
import { activationItem } from './activationItem'
import { controller } from './controller'
import { runningTimes } from './runningTimes'

export interface RootModel extends Models<RootModel> {
    appData: typeof appData,
    activationItem: typeof activationItem,
    controller: typeof controller,
    runningTimes: typeof runningTimes,
}

export const models: RootModel = { appData, activationItem, controller, runningTimes }