import React, { Component } from 'react';
import arrayMove from 'array-move';
import s from './SortableContener.module.scss';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import SortableList from './SortableList';
import { set } from 'lodash';
import { runningDataPath } from '../..';


class SortableContener extends Component<{items: any[], index: number}> {
  static contextType = CustomPresettingContext;
  onSortEnd = ({oldIndex, newIndex}: any) => {
    const data = arrayMove(this.props.items, oldIndex, newIndex);
    const { runningData, onChange } = this.context;
    set(runningData, `${runningDataPath.dataGroups_data}[${this.props.index}].data`, data);
    onChange(runningData);
  };
  
  render() {
    return <SortableList data={this.props.items} dataGroup={this.props.index} onSortEnd={this.onSortEnd} useDragHandle />;
  }
}

export default SortableContener;