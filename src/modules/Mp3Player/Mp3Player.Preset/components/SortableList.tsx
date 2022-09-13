import { MinusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DataElement from './DataElement';
import SortableItem from './SortableItem';

interface Props {
  data: any[];
}

const SortableList: React.FC<Props> = ({ data }) => {
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
              <Button size="small" icon={<MinusOutlined />} onClick={() => {}} />
            </Col>
          </Row>
        </SortableItem>
      ))}
    </div>
  );
};

export default SortableContainer(SortableList);
