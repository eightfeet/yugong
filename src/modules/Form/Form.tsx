import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import requester from '~/core/fetch';
import { BetaSchemaForm } from '@ant-design/pro-form';
import PresetModule from '~/components/PresetModule';
import { ClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsMixed, ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Form.config';
import createStyles, { ClassesKey } from './Form.createStyles';
import s from './Form.module.less';
import isType from '~/core/helper/isType';
import { message } from 'antd';

export type FormProps = ClassModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

type DataItem = {
  name: string;
  state: string;
};

const Form: React.FC<FormProps> = (props) => {
  const {
    registersFunction,
    eventDispatch,
    classes,
    moduleId,
    api
  } = props;
  const { runningTimes } = useSelector((state: RootState) => state);
  const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;
  const [formColumns, setformColumns] = useState([]);

  const setForm = useCallback(
    (formColumns: ArgumentsMixed) => {
      const columns = getArgumentsItem(formColumns);
      if (isType(columns, "Array")) {
        setformColumns(columns as any)
      } else {
        message.error('表单数据不正确')
      }
    },
    [],
  )

  // First setup registers
  useEffect(() => {
    registersFunction({
      setForm
    })
  }, [setForm, registersFunction])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback(
    async (values) => {
      setRunningTimes({
        [`form_${moduleId}`]: values
      });
      const apiArguments = api?.find((item) => item.apiId === 'submit');
      if (apiArguments) {
        apiArguments.body = [{ type: 'mixed', fieldName: 'formdata', data: values }];
        await requester(apiArguments || {});
      }
      eventDispatch().submit();
    },
    [api, eventDispatch, moduleId, setRunningTimes],
  )
  

  return (
    <Wrapper {...props} maxWidth>
      <div className={s.wrap}>
      <BetaSchemaForm<DataItem>
        className={s.form}
        shouldUpdate={false}
        layoutType="Form"
        onFinish={onSubmit}
        columns={formColumns }
      />
      </div>
    </Wrapper>
  )
}

export default PresetModule<FormProps>(Form, config, createStyles);
