import { EditOutlined, MinusOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Switch } from 'antd';
import { get, set } from 'lodash';
import React, { useCallback, useContext, useState } from 'react';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import ChartConfig from '../ChartConfig';
import DataGroupsContener from '../DataGroupsContener';
import s from './DataElement.module.scss';

interface Props {
  index: number;
  item: any;
}

const DataElement:React.FC<Props> = ({index, item}) => {
  const [openSetting, setOpenSetting] = useState(true);
  const  {runningData, onChange} = useContext(CustomPresettingContext);
  const onMinus = useCallback(
    () => {
      const data = get(runningData, '[1].arguments[0].data');
      const fliterData = data.filter((item: any, ind: number) => ind !== index);
      const res = set(runningData, '[1].arguments[0].data', fliterData);
      onChange(res)
    },
    [index, onChange, runningData],
  )

  const onChangeConfig = useCallback(
    (e) => {
      const data = get(runningData, `[1].arguments[0].data[${index}]`);
      const itemRes = {...data, ...e};
      const res = set(runningData, `[1].arguments[0].data[${index}]`, itemRes);
      onChange(res)
    },
    [index, onChange, runningData],
  )
  
  const { data, ...config } = item;
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
                    <Button size="small" type="text" onClick={onMinus}>
                      <MinusOutlined />
                    </Button>
                  </>
                }
              >
                {openSetting ? <ChartConfig onChange={onChangeConfig}  defaultValue={config} /> : null}
                <DataGroupsContener />
              </Card>
            </Col>
          </Row>
  )
}

export default DataElement;