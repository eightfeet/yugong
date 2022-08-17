import React, { Component } from 'react';
import arrayMove from 'array-move';
import s from './SortableContener.module.scss';
import SortableList from './SortableList';


class SortableContener extends Component<{items: any[]}> {
  
  onSortEnd = ({oldIndex, newIndex}: any) => {
    console.log(arrayMove(this.props.items, oldIndex, newIndex));
  };
  
  render() {
    return <SortableList data={this.props.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableContener;