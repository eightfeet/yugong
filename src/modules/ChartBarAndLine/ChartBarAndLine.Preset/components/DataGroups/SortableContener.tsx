import arrayMove from 'array-move';
import { Component } from 'react';
import SortableList from './SortableList';

interface Props {
  items: any[]
}

class SortableContener extends Component<any, Props> {
  state = {
    items: ['Item 1'],
  };
  onSortEnd = ({oldIndex, newIndex}: any) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList data={this.state.items} onSortEnd={this.onSortEnd} useDragHandle />;
  }
}

export default SortableContener;