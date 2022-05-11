import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { Input } from 'antd';
import PresetModule from '~/components/PresetModule';
import { ClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Form.config';
import createStyles, { ClassesKey } from './Form.createStyles';
import s from './Form.module.less';

export type FormProps = ClassModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '解决中',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    initialValue: '必填',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '100%',
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: "cascader",
    valueEnum,
    width: '100%',
    tooltip: '当title为disabled时状态无法选择',
    dependencies: ['title'],
    fieldProps: (form) => {
      if (form.getFieldValue('title') === 'disabled') {
        return {
          disabled: true,
          placeholder: 'disabled',
        };
      } else {
        return {
          placeholder: 'normal',
        };
      }
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: '100%',
    tooltip: '当title为必填时此项将为必填',
    dependencies: ['title'],
    formItemProps(form) {
      if (form.getFieldValue('title') === '必填') {
        return {
          rules: [
            {
              required: true,
            },
          ],
        };
      } else {
        return {};
      }
    },
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createName',
    valueType: 'date',
  },
];

const Form: React.FC<FormProps> = (props) => {
  const {
    registersFunction,
    eventDispatch,
    classes,
  } = props;
  const { runningTimes } = useSelector((state: RootState) => state);
  const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;
  const [text, setText] = useState('');

  useEffect(() => {
    setRunningTimes({ text: 'runningTimeData' });
  }, [setRunningTimes])

  const handleClick = useCallback(
    (text: ArgumentsString) => {
      const getState = getArgumentsItem(text);
      setText(getState as string)
    },
    [],
  )

  // First setup registers
  useEffect(() => {
    registersFunction({
      handleClick
    })
  }, [handleClick, registersFunction])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper {...props} maxWidth>
      <div className={s.wrap}>
      <BetaSchemaForm<DataItem>
        className={s.form}
        shouldUpdate={false}
        layoutType="Form"
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
      />
      </div>
    </Wrapper>
  )
}

export default PresetModule<FormProps>(Form, config, createStyles);
