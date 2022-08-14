import { EditOutlined, MinusOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Switch } from 'antd';
import React, { useState } from 'react';
import ChartConfig from '../ChartConfig';
import DataGroupsContener from '../DataGroupsContener';
import s from './DataElement.module.scss';

interface Props {
  
}

const DataElement:React.FC<Props> = ({}) => {
  const [openSetting, setOpenSetting] = useState(true);
  return (
    <Row className={s.root}>
            <Col span={1}></Col>
            <Col span={23}>
              <Card
                size="small"
                bodyStyle={{ padding: 0 }}
                title={
                  <div className={s.title}>
                    数据组
                    <Button size="small" type="text" icon={<EditOutlined />} />
                  </div>
                }
                extra={
                  <>
                    <Switch
                      checkedChildren={'设置'}
                      unCheckedChildren={'设置'}
                      defaultChecked={openSetting}
                      onChange={(e) => setOpenSetting(e)}
                      size="small"
                    />
                    &nbsp;
                    <Button size="small" type="text">
                      <MinusOutlined />
                    </Button>
                  </>
                }
              >
                {openSetting ? <ChartConfig /> : null}
                <DataGroupsContener />
              </Card>
            </Col>
          </Row>
  )
}

export default DataElement;