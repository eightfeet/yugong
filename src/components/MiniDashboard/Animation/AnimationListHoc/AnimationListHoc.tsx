import { useCallback } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { AnimationTypesOfStyleItems } from '~/types/appData';
import AnimationItem from '../AnimationItem';

interface Props {
  animationList?: AnimationTypesOfStyleItems[];
  onChange: (index: number, data: any) => void;
  onMinus: (index: number) => void;
}

const AnimationListHoc = SortableContainer(
  ({ animationList, onChange, onMinus }: Props) => {
    const handleOnMinus = useCallback(
      (index) => () => {
        if (onMinus instanceof Function) {
          onMinus(index);
        }
      },
      [onMinus],
    );

    const handleOnChangeItem = useCallback(
      (index) => (data: any) => {
        if (onChange instanceof Function) {
          onChange(index, data);
        }
      },
      [onChange],
    );
    return (
      <div>
        {animationList?.map((data, index) => (
          <AnimationItem
            index={index}
            key={`${index}${Math.random()}}`}
            defaultData={data}
            onChange={handleOnChangeItem(index)}
            onMinus={handleOnMinus(index)}
          />
        ))}
      </div>
    );
  },
);

export default AnimationListHoc;
