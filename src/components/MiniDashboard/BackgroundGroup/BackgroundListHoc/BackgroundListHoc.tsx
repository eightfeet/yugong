import { useCallback } from "react";
import { SortableContainer } from "react-sortable-hoc";
import { BackgroundGroupListTypesOfStyleItems } from "~/types/appData";
import BackgroundItem from "../BackgroundItem";

interface Props {
  backgroundList?: BackgroundGroupListTypesOfStyleItems[];
  onChange: (index: number, data: any) => void;
  onMinus: (index: number) => void;
}

const BackgroundListHoc = SortableContainer(({
  backgroundList,
  onChange,
  onMinus,
}: Props) => {
  const handleOnMinus = useCallback(
    (index) => () => {
      if (onMinus instanceof Function) {
        onMinus(index);
      }
    },
    [onMinus]
  );

  const handleOnChangeItem = useCallback(
    (index) => (data: any) => {
      if (onChange instanceof Function) {
        onChange(index, data);
      }
    },
    [onChange]
  );

  return (
    <div>
      {backgroundList?.map((data, index) => (
          <BackgroundItem
          key={index}
          index={index}
          defaultData={data}
          onChange={handleOnChangeItem(index)}
          onMinus={handleOnMinus(index)}
        />
      ))}
    </div>
  );
});

export default BackgroundListHoc;
