import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import s from './ApiSetting.module.less';

const ApiSetting: React.FC = () => {
    const api = useSelector((state:RootState) => state.activationItem.api)
    return (
        <div className={s.root}>
            {
                api?.map(item => <div>
                    <Row gutter={4}>
                        <Col span={20}>
                        {item.method}
                        {item.url}
                        </Col>
                        <Col span={4}>
                        4
                        </Col>
                    </Row>
                </div>)
            }
        </div>
    )
}

export default ApiSetting
