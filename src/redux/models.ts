import { Models } from '@rematch/core'
import { appData } from './appDataModel'
import { activationItem } from './activationItem'
import { controller } from './controller'
import { runningTimes } from './runningTimes'
import { pageData } from './pageData'
import { record } from './record'

export interface RootModel extends Models<RootModel> {
    appData: typeof appData,
    activationItem: typeof activationItem,
    controller: typeof controller,
    runningTimes: typeof runningTimes,
    pageData: typeof pageData,
    record: typeof record,
}

export const models: RootModel = { appData, activationItem, controller, runningTimes, pageData, record }