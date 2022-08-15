import arrayMove from 'array-move';
import { Component } from 'react';
import SortableList from './SortableList';

interface Props {
  items: any[]
}

class SortableContener extends Component<Props> {
  onSortEnd = ({oldIndex, newIndex}: any) => {
    console.log(arrayMove(this.props.items, oldIndex, newIndex),);
  };
  render() {
    const {items, ...other} = this.props;
    return <SortableList data={this.props.items} onSortEnd={this.onSortEnd} {...other} useDragHandle />;
  }
}

export default SortableContener;