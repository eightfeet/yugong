import { Models } from '@rematch/core'
import { appData } from './appDataModel'
import { activationItem } from './activationItem'
import { controller } from './controller'
import { runningTimes } from './runningTimes'
import { pageData } from './pageData'

export interface RootModel extends Models<RootModel> {
    appData: typeof appData,
    activationItem: typeof activationItem,
    controller: typeof controller,
    runningTimes: typeof runningTimes,
    pageData: typeof pageData
}

export const models: RootModel = { appData, activationItem, controller, runningTimes, pageData }