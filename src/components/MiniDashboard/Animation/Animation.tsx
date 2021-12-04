import { Row, Col, Button, Checkbox } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleContext } from '~/context/StyleContext';
import { RootState } from '~/redux/store';
import s from './Animation.module.less';
import { PlusOutlined } from '@ant-design/icons';
import AnimationListHoc from './AnimationListHoc';
import { AnimationGroups, AnimationTypesOfStyleItems } from '~/types/appData';
import arrayMove from 'array-move';

interface Props {}

const Animation: React.FC<Props> = ({}) => {
  const context = useContext(StyleContext);
  const [animation, setAnimation] = useState<AnimationGroups>({});
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId,
  );

  useEffect(() => {
    const data = context.getDefaultData?.('animation') || {};
    setAnimation(data);
  }, [context, moduleId]);

  // 开启可见动画
  const handleEnableInView = useCallback((e) => {
    setAnimation(({ animations }) => {
      const result: AnimationGroups = {
        animations,
        animationPlayInView: e.target.checked,
      };
      context.onChange?.(result, 'animation');
      return result;
    });
  }, []);

  // 添加动画
  const onPlus = useCallback(() => {
    setAnimation(({ animationPlayInView, animations }) => {
      const result: AnimationGroups = {
        animationPlayInView,
        animations: [...(animations || []), {}],
      };
      context.onChange?.(result, 'animation');
      return result;
    });
  }, []);

  // 删除动画
  const onMinus = useCallback((index: number) => {
    setAnimation(({ animationPlayInView, animations }) => {
      const newAnimations = animations?.filter((item, ind) => ind !== index);
      console.log('newAnimations', newAnimations);

      const result: AnimationGroups = {
        animationPlayInView,
        animations: animations?.filter((item, ind) => ind !== index),
      };
      context.onChange?.(result, 'animation');
      return result;
    });
  }, []);

  // 改变动画
  const onChange = useCallback(
    (index: number, data: AnimationTypesOfStyleItems) => {
      setAnimation(({ animationPlayInView, animations }) => {
        const newAnimations: AnimationTypesOfStyleItems[] = [
          ...(animations || []),
        ];
        newAnimations[index] = data;
        const result: AnimationGroups = {
          animationPlayInView,
          animations: newAnimations,
        };
        context.onChange?.(result, 'animation');
        return result;
      });
    },
    [],
  );

  // 拖拽重新排序重置更新事件组数据
  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    setAnimation(({ animationPlayInView, animations }) => {
      const newAnimations: AnimationTypesOfStyleItems[] = [
        ...(animations || []),
      ];
      const result: AnimationGroups = {
        animationPlayInView,
        animations: arrayMove(newAnimations, oldIndex, newIndex),
      };
      context.onChange?.(result, 'animation');
      return result;
    });
  }, []);

  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Checkbox
            checked={animation.animationPlayInView}
            onChange={handleEnableInView}
          >
            可见时展示动画
          </Checkbox>
        </Col>
        <Col span={12} className={s.add}>
          <Button size="small" icon={<PlusOutlined />} onClick={onPlus}>
            添加动画
          </Button>
        </Col>
      </Row>
      <AnimationListHoc
        animationList={animation.animations}
        onChange={onChange}
        onMinus={onMinus}
        onSortEnd={onSortEnd}
        useDragHandle
      />
    </>
  );
};

export default Animation;
