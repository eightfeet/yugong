import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import requester from '~/core/fetch';
import { BetaSchemaForm } from '@ant-design/pro-form';
import PresetModule from '~/components/PresetModule';
import { ClassClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { AnyObjectType, ArgumentsMixed, ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { compilePlaceholderFromDataSource as getResult } from '~/core/getDataFromSource';
import { Dispatch } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Form.config';
import createStyles, { ClassesKey } from './Form.createStyles';
import s from './Form.module.less';
import isType from '~/core/helper/isType';
import { message } from 'antd';
import { usePrevious } from 'react-use';
import { SubItemValue } from './Form.Preset/components/SubItem/SubItem';
import classNames from 'classnames';
import isMobile from '~/core/helper/isMobile';
import moment from 'moment';

const zhCn = require('moment/locale/zh-cn').default;

export type FormProps = ClassClassModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

moment.locale(zhCn)

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
  const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;
  const [formColumns, setformColumns] = useState<AnyObjectType[]>([]);
  const [resetBtn, setResetBtn] = useState<string>();
  const [subBtn, setSubBtn] = useState<string>();
  const [configArgs, setConfigArgs] = useState<[ArgumentsMixed, ArgumentsString, ArgumentsString]>()

  // 数据编译到显示端
  const formColumnsCompiler = useCallback(
    (formColumns: AnyObjectType[]) => {
      formColumns.forEach(column => {
        Object.keys(column).forEach(key => {
          let element = column[key];
          if (isType(element, 'String')) {
            getResult(element);
          };
        })
      });
      setformColumns(formColumns);
    },
    [],
  )

  const setForm = useCallback(
    (...args: [ArgumentsMixed, ArgumentsString, ArgumentsString] ) => {
      const [formColumns, resetText, submitText] = args;
      setConfigArgs(args);
      const columns = getArgumentsItem(formColumns);
      const reset = getArgumentsItem(resetText);
      setResetBtn(reset as string)
      const submit = getArgumentsItem(submitText);
      setSubBtn(submit as string)
      if (isType(columns, "Array")) {
        formColumnsCompiler(columns as AnyObjectType[])
      } else {
        message.error('表单数据不正确')
      }
    },
    [formColumnsCompiler],
  )

  const resetForm = useCallback(
    () => {
      if (configArgs) {
        const [formColumns, resetText, submitText] = configArgs;
        setForm(formColumns, resetText, submitText);
      }
    },
    [configArgs, setForm],
  )

  const prevFormColumns = usePrevious<any>(formColumns);

  // First setup registers
  useEffect(() => {
    registersFunction({
      setForm,
      resetForm
    })
  }, [setForm, registersFunction, resetForm])

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
    const formColumns = config.exposeFunctions![0].arguments![0] as ArgumentsMixed;
    const resetText = config.exposeFunctions![0].arguments![1] as ArgumentsString;
    const submitText = config.exposeFunctions![0].arguments![2] as ArgumentsString;
    setForm(formColumns, resetText, submitText);
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

  const handleOnFocus = useCallback(
    e => {
      if(e.target.parentNode.className.indexOf('ant-picker-input') >= 0 && isMobile){
        e.target.setAttribute('readonly', true);
      }
    },
    [],
  )
  
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
          onFocus={handleOnFocus}
          submitter={{
            // 配置按钮文本
            searchConfig: {
              resetText: resetBtn || '重置',
              submitText: subBtn || '提交',
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
