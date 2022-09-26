import { MinusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { get, set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import DataElement from './DataElement';
import SortableItem from './SortableItem';

interface Props {
  data: any[];
}

const path = '[0].arguments[1].data';

const SortableList: React.FC<Props> = ({ data }) => {
  const { runningData, onChange } = useContext(CustomPresettingContext);

  const onMinus = useCallback(
    (index: number) => {
      const data = get(runningData, path);
      const fliterData = data.filter((item: any, ind: number) => ind !== index);
      const res = set(runningData, path, fliterData);
      onChange(res)
    },
    [onChange, runningData],
  )

  return (
    <div>
      {data.map((item, index) => (
        <SortableItem key={index} index={index}>
          <Row gutter={6}>
            <Col span={1} />
            <Col span={21}>
              <DataElement index={index} item={item} />
            </Col>
            <Col span={2}>
              <Button size="small" icon={<MinusOutlined />} onClick={() => onMinus(index)} />
            </Col>
          </Row>
        </SortableItem>
      ))}
    </div>
  );
};

export default SortableContainer(SortableList);
