import {
  CodeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  PageHeader,
  Row,
  Col,
  Tooltip,
  Button,
} from 'antd';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback, useContext, useState } from 'react';
import JsonDataEditor from '~/components/MiniDashboard/JsonDataEditor';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import { runningDataPath } from '../..';
import s from './LabelsGroup.module.scss';
import SortableContener from './SortableContener';

interface Props {
}

const LabelsGroup: React.FC<Props> = () => {
  const  {runningData, onChange} = useContext(CustomPresettingContext);
  const [showCode, setShowCode] = useState(false)
  const groups = get(runningData, runningDataPath.labels);
  const dataGroupsPath = `${runningDataPath.dataGroups}.data`;
  const dataGroups = get(runningData, dataGroupsPath);
  
  const onPlus = useCallback(
    () => {
      const copyData = cloneDeep(runningData);
      groups.data.push({
        label: '标签名',
        backgroundColor: '#666',
        hoverBackgroundColor: '#666'
      });
      dataGroups.forEach((element: any) => {
        element.data.push({
          weight: 1000,
        })
      });
      set(copyData, runningDataPath.labels, groups);
      set(copyData, dataGroupsPath, dataGroups);
      onChange(copyData);
    },
    [dataGroups, dataGroupsPath, groups, onChange, runningData],
  )

  const onConfirmCode = useCallback(
    (data) => {
      const copyData = cloneDeep(runningData);
      set(copyData, `${runningDataPath.labels}.data`, data);
      onChange(copyData);
      setShowCode(false)
    },
    [onChange, runningData],
  )
  
  return (
    <>
      <PageHeader title="设置标签" extra={<CodeOutlined onClick={() => setShowCode(true)} />} />
      <Row className={s.row} gutter={10}>
        <Col span={5} className={s.label}>
          <Tooltip placement="topRight" title={'点击添加标签'}>
            标签
          </Tooltip>
        </Col>
        <Col span={19}>
          <Row className={s.toolbar} gutter={4}>
            <Col span={4}>
              <Button icon={<PlusOutlined />} onClick={onPlus}>
                增加标签
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <SortableContener items={groups.data} />
      <JsonDataEditor
        data={groups.data}
        okText="确定" 
        cancelText="取消" 
        visible={showCode} 
        onConfirm={onConfirmCode} 
        onCancel={() => setShowCode(false)} 
        title="数据编辑" />
    </>
  );
};

export default LabelsGroup;
