import React, { Component } from 'react';
import arrayMove from 'array-move';
import s from './SortableContener.module.scss';
import SortableList from './SortableList';


class SortableContener extends Component<any, {items: string[]}> {
  state = {
    items: ['Item 1'],
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