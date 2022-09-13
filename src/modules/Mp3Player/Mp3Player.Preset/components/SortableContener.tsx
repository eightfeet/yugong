import arrayMove from 'array-move';
import { Component } from 'react';
import SortableList from './SortableList';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import React from 'react';
import { set } from 'lodash';
// import { runningDataPath } from '../..';

interface Props {
  items: any[]
}

class SortableContener extends Component<Props> {
  static contextType = CustomPresettingContext;
  onSortEnd = ({oldIndex, newIndex}: any) => {
    const data = arrayMove(this.props.items, oldIndex, newIndex);
    const { runningData, onChange } = this.context;
    // set(runningData, runningDataPath.dataGroups_data, data);
    onChange(runningData);
  };
  render() {
    const {items, ...other} = this.props;
    return <SortableList data={this.props.items} onSortEnd={this.onSortEnd} {...other} useDragHandle />;
  }
}

export default SortableContener;