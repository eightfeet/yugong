import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import requester from '~/core/fetch';
import { BetaSchemaForm } from '@ant-design/pro-form';
import PresetModule from '~/components/PresetModule';
import { ClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { AnyObjectType, ArgumentsMixed } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { compilePlaceholderFromDataSource as getResult } from '~/core/getDataFromSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Form.config';
import createStyles, { ClassesKey } from './Form.createStyles';
import s from './Form.module.less';
import isType from '~/core/helper/isType';
import { message } from 'antd';
import { usePrevious } from 'react-use';
import { SubItemValue } from './Form.Preset/components/SubItem/SubItem';
import classNames from 'classnames';

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
  const [formColumns, setformColumns] = useState<AnyObjectType[]>([]);

  // 数据编译到显示端
  const formColumnsCompiler = useCallback(
    (formColumns: AnyObjectType[]) => {
      formColumns.forEach(column => {
        Object.keys(column).forEach(key => {
          const element = column[key];
          if (isType(element, 'String')) getResult(element);
        })
      })
      setformColumns(formColumns)
    },
    [],
  )

  const setForm = useCallback(
    (formColumns: ArgumentsMixed) => {
      const columns = getArgumentsItem(formColumns);
      if (isType(columns, "Array")) {
        formColumnsCompiler(columns as AnyObjectType[])
      } else {
        message.error('表单数据不正确')
      }
    },
    [formColumnsCompiler],
  )

  const prevFormColumns = usePrevious<any>(formColumns);

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
      console.log('values', values);
      
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
  
  // 得到一个初始值
  useEffect(() => {
    const args0 = config.exposeFunctions![0].arguments![0];
    setForm(args0 as ArgumentsMixed);
  }, [setForm])

  // 数据比较更新
  const [updateKey, setUpdateKey] = useState(Date.now());
  useEffect(() => {
    formColumns.some((item: SubItemValue, index) => {
      if (item.initialValue === prevFormColumns?.[index]?.initialValue) {
        setUpdateKey(Date.now())
        return true
      }
      return false
    })
  }, [prevFormColumns, formColumns])
  
  return (
    <Wrapper {...props} maxWidth>
      <div className={s.wrap}>
        <BetaSchemaForm<DataItem>
          key={updateKey}
          className={classNames(s.form, classes.form)}
          shouldUpdate={false}
          layoutType="Form"
          onFinish={onSubmit}
          columns={formColumns}
          autoFocusFirstInput={false}
          submitter={{
            // 配置按钮文本
            searchConfig: {
              resetText: '取消',
              submitText: '报名',
            },
            submitButtonProps: {
              className: classes.submit,
            },
            resetButtonProps: {
              className: classes.reset
            }
          }}
        />
      </div>
    </Wrapper>
  )
}

export default PresetModule<FormProps>(Form, config, createStyles);
