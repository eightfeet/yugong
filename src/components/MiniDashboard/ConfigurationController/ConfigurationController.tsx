import React from 'react'
import ApiSetting from '../ApiSetting'
import EventsSetting from '../EventsSetting'

const ConfigurationController = () => {
    return (
        <div>
            <EventsSetting />
            <ApiSetting />
        </div>
    )
}

export default ConfigurationController