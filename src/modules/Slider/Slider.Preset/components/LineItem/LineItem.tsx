import { Row, Col, Tooltip } from 'antd';
import { parse } from 'query-string';
import React from 'react';
import s from './LineItem.module.scss'

interface Props {
  label: React.ReactNode,
  describe?: string
}

const LineItem: React.FC<Props> = ({ label, describe, children }) => {
  return (
    <Row className={s.row} gutter={10}>
      <Col span={3} className={s.label}>
        {describe ? <Tooltip
          placement="topRight"
          title={parse(describe || '')}
        >
          {label}
        </Tooltip> : label}
      </Col>
      <Col span={20}>
        {children}
      </Col>
    </Row>
  )
}

export default LineItem;