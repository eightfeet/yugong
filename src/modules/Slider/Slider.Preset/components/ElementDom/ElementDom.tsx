import { CloseOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Input, message, Popconfirm, Tag } from 'antd';
import classNames from 'classnames';
import { cloneDeep, set } from 'lodash';
import { TweenOneGroup } from 'rc-tween-one';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChildrenItem } from '~/modules/Slider/type';
import { PagesContext } from '../../PagesContext';
import { SliderContext } from '../../SliderContext';
import s from './ElementDom.module.scss'

interface Props {
  eleList: ChildrenItem[];
  current: number;
}

const ElementDom: React.FC<Props> = ({ eleList, current }) => {
  const { runningData, setRunningData } = useContext(SliderContext);
  const { path, setPageAndElement } = useContext(PagesContext);

  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: ChildrenItem) => {
    if (!runningData) return;
    const newChild = eleList.filter(ele => ele.name !== removedTag.name);
    const newRunningData = cloneDeep(runningData);
    set(newRunningData, `${path}[${current}].childrens`, newChild);
    setRunningData?.(newRunningData);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (!runningData) return;
    const newRunningData = cloneDeep(runningData);
    const  existence = eleList.some(item => item.name === inputValue)
    if (inputValue && !existence) {
      const newChild = [...eleList, { name: inputValue }];
      set(newRunningData, `${path}[${current}].childrens`, newChild);
      setRunningData?.(newRunningData);
    }
    if (existence) {
      message.error('元素名已存在')
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag: ChildrenItem, index: number) => {
    const tagElem = (
      <Tag className={s.tag}>
        <span>
          {tag.name}
        </span>
        &nbsp;<SettingOutlined onClick={() => setPageAndElement?.(current, index)} />
        &nbsp;
        <Popconfirm
          placement="topRight"
          title={`确定删除${tag.name || '元素'}？`}
          onConfirm={e => {
            e?.preventDefault();
            handleClose(tag);
          }}
          okText="确定"
          cancelText="取消"
        >
          <CloseOutlined />
        </Popconfirm>
      </Tag>
    );
    return (
      <span key={index} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = eleList.map(forMap);
  return (
    <div className={s.root}>
      <TweenOneGroup
        enter={{
          scale: 0.8,
          opacity: 0,
          type: 'from',
          duration: 100,
        }}
        onEnd={e => {
          if (e.type === 'appear' || e.type === 'enter') {
            (e.target as any).style = 'display: inline-block';
          }
        }}
        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
        appear={false}
      >
        {tagChild}
        {inputVisible && (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{ width: 78, marginBottom: 8 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
            placeholder="元素名称"
          />
        )}
        {!inputVisible && (
          <Tag onClick={showInput} className={classNames(s['site-tag-plus'], s.tag)}>
            <PlusOutlined /> 增加元素
          </Tag>
        )}
      </TweenOneGroup>

    </div>
  );
};

export default ElementDom;