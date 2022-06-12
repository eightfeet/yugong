import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Popconfirm } from 'antd';
import { cloneDeep, set } from 'lodash';
import React, { useCallback, useContext } from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import MoveIcon from '~/components/MiniDashboard/ApiConfig/MoveIcon';
import { PagesContext } from '../../PagesContext';
import { SliderContext } from '../../SliderContext';
import ElementDom from '../ElementDom';
import LineItem from '../LineItem';
import s from './PageItem.module.scss';

interface Props {
  pageIndex: number;
}

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

const PageItem:React.FC<Props> = ({pageIndex}) => {
  const { runningData, setRunningData} = useContext(SliderContext);
  const { pages, path } = useContext(PagesContext);
  
  const onMinus = useCallback(
    (index) => {
      if (!runningData || !path ) return;
      const sortList = cloneDeep(pages||[]);
      const res = sortList.filter((item: any, elIndex: number) => (index !== elIndex))
      const newData = set(runningData, path, res)
      setRunningData?.(newData)
    },
    [runningData, path, pages, setRunningData],
  )
  const eleList = pages?.[pageIndex];
  return (
    <div className={s.root}>
      <LineItem label={
        <div className={s.dragwrap}>
        <span className={s.drag}>
          <DragHandle />
        </span>
          第{pageIndex + 1}页
        </div>
      }>
        <Space className={s.pagespace}>
          <SettingOutlined onClick={() => console.log('点击我编辑页面')} />
          <Popconfirm
            placement="topRight"
            title={`确定删除页面？`}
            onConfirm={e => {
              e?.preventDefault();
              onMinus(pageIndex);
            }}
            okText="确定"
            cancelText="取消"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
        <ElementDom current={pageIndex} eleList={eleList?.childrens || []} />
      </LineItem>
    </div>
  )
}

export default SortableElement(PageItem);