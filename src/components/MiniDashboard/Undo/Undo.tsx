import Icon, { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useKeyDown from '~/hooks/useKeyDown';
import usePostMessage from '~/hooks/usePostMessage';
import { RecordItem } from '~/redux/record';
import { Dispatch, RootState } from '~/redux/store';
import RedoIcon from './RedoIcon';

import s from './Undo.module.scss';
import UndoIcon from './UndoIcon';

interface Props {

}

const Undo: React.FC<Props> = () => {
  const timer = useRef<number>()
  const { list, currentRecord, isRecordReady } = useSelector((state: RootState) => state.record);
  const [, setCurrentIndex] = useState(0);
  const { setCurrentRecord, setIsReady } = useDispatch<Dispatch>().record;

  const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;
  const { updateAppData } = useDispatch<Dispatch>().appData;
  const { updatePage } = useDispatch<Dispatch>().pageData;
  const { forceUpdateByStateTag } = useDispatch<Dispatch>().controller;

  // 同步到下游
  const sendMessage = usePostMessage(() => { });

  const handleDataBack = useCallback(
    (item: RecordItem) => {
      setIsReady(false)
      if (item?.key) setCurrentRecord(item?.key)
      if (item?.runningTimes) setRunningTimes(item?.runningTimes)
      const win = (
        document.getElementById('wrapiframe') as HTMLIFrameElement
      ).contentWindow;
      if (item?.appData) {
        updateAppData(item.appData);
        if (win) {
          sendMessage({ tag: 'updateAppData', value: item.appData }, win);
        }
      }
      if (item?.pageData) {
        updatePage(item.pageData)
        if (win) {
          sendMessage({ tag: "updatePage", value: item.pageData }, win);
        }
      }

      forceUpdateByStateTag();
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setIsReady(true), 3000)

    },
    [forceUpdateByStateTag, sendMessage, setCurrentRecord, setIsReady, setRunningTimes, updateAppData, updatePage],
  )

  const handleRecord = useCallback(
    (item: RecordItem, index: number) => {
      handleDataBack(item)
      setCurrentIndex(index)
    },
    [handleDataBack],
  )

  const handleUndo = useCallback(
    () => {
      setCurrentIndex((index: number) => {
        if (index === list.length - 1) {
          return index
        }
        const newindex = index + 1;
        handleDataBack(list[newindex])
        return newindex;
      })
    },
    [handleDataBack, list],
  )

  const handleRedo = useCallback(
    () => {
      setCurrentIndex((index: number) => {
        const newindex = index - 1;
        handleDataBack(list[newindex])
        return newindex;
      })
    },
    [handleDataBack, list],
  )

  // 模拟后退
  useKeyDown(
    () => {
      console.log('撤销');
      handleUndo()
    },
    'z',
    'ctrlKey',
  );

  const getIndexByCurrentRecord = useCallback(
    (currentRecord: number) => {
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        if (item.key === currentRecord) {
          return index;
        }
      }
    },
    [list],
  )

  const myCurrentIndex = currentRecord ? (getIndexByCurrentRecord(currentRecord) || 0) : 0;

  return (
    <>
      {
        list.length > 0 && isRecordReady ? <>
          &nbsp;
          {myCurrentIndex < list.length - 1 ? <Button className={s.nbdr} icon={<Icon component={UndoIcon} />} onClick={handleUndo} /> : null}
          {list.length > 1 ? <Dropdown className={s.nbr} overlay={
            <Menu>
              {list.map((item, index) => <Menu.Item
                className={classNames(s.item, {
                  [s.current]: item.key === currentRecord
                })}
                key={item.key}
                onClick={() => handleRecord(item, index)}>
                {item.key}-{currentRecord}-{item.desc}
              </Menu.Item>)}
            </Menu>
          } ><Button ><EllipsisOutlined /></Button></Dropdown> : null}
          {myCurrentIndex > 0 ? <Button className={s.nbdl} icon={<Icon component={RedoIcon} />} onClick={handleRedo} /> : null}
        </> : null
      }
      {isRecordReady ? null : <span className={s.saving}>正在同步历史记录...</span>}
    </>
  )
}

export default Undo;
