import React, { Component } from 'react';
import arrayMove from 'array-move';
import s from './SortableContener.module.scss';
import SortableList from './SortableList';


class SortableContener extends Component<any, {items: string[]}> {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}: any) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList data={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableContener;