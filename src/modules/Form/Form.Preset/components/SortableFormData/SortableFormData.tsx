import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import arrayMove from 'array-move';
import { cloneDeep } from 'lodash';
import React, { useCallback, useContext } from 'react';
import groupArgumentsPars, { getGroupArgumentsValues } from '~/core/helper/groupArgumentsPars';
import FormData from '../FormData';

interface Props {
  list: any[]
}

const SortableFormData: React.FC<Props> = ({ list }) => {

  const onChange = useCallback(
    (data) => {
      /**获取数据 */
      let param = groupArgumentsPars(data);
      /**考虑数据为空的情况 */
      if (!Object.keys(param).length) {
        param = {
          columWidth: [],
          dataType: [],
          format: [],
          headName: [],
          rowMap: [],
        }
      }
      /**更新到runningData */
    },
    [],
  )

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
      console.log(oldIndex, newIndex);
      
    },
    [],
  )

  const onMinus = useCallback(
    (index) => {
    },
    [],
  )

  const onPlus = useCallback(
    () => {
    },
    [],
  )

  return (
    <div>
      <Row>
        <Col><Button onClick={onPlus} icon={<PlusOutlined />}>增加项</Button></Col>
      </Row><br />
      <FormData onSortEnd={onSortEnd} list={[1,2,3,4,5]} />
    </div>
  )
}

export default SortableFormData;
