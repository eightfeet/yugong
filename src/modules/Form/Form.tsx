import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "./compoments/TextField";
import requester from "~/core/fetch";
import EventEmitter from "~/core/EventEmitter";
import { AppDataElementsTypes, ArgumentsItem } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import CheckboxGroup from "./compoments/CheckboxGroup";
import RadioGroup from "./compoments/RadioGroup";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import { FormArguments } from "./compoments/formTypes";
import { compileFormData } from "./helper";
import s from "./Form.module.less";
import useStyles from "./Form.useStyle";
import classNames from "classnames";

export interface FormProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

interface Config {
  variant?: 'outlined' | 'filled' | 'standard',
  title?: any,
  submittext?: any,
  resettext?: any
}

const Form: Modules<FormProps> = (props) => {
  const { eventEmitter, events = {}, api, style } = props;
  const [defaultValues, setDefaultValues] = useState<{ [key: string]: any }>(
    {}
  );
  const [formLists, setFormLists] = useState<FormArguments[]>();
  const [schema, setSchema] = useState<any>();
  const [config, setConfig] = useState<Config>({});
  const userClass = useStyles(style);
  // API请求 注意依赖关系
  useEffect(() => {
    const apiArguments = api?.find((item) => item.apiId === "");
    requester(apiArguments || {});
  }, [api]);
  // 基本事件
  useEffect(() => {
    // 执行挂载事件
    eventEmitter.emit(events.mount);
    return () => {
      // 执行卸载事件
      eventEmitter.emit(events.unmount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFormData = useCallback((name: ArgumentsItem) => {
    const list = getArgumentsItem(name) || [];
    const result = compileFormData(list as FormArguments[]);
    setSchema(result.schema);
    setDefaultValues(result.defaultValue);
    setFormLists(list as FormArguments[]);
  }, []);

  const setFormConfig = useCallback(
    (forminput, formtitle, formsubmittext, formresettext) => {
      const argforminput = getArgumentsItem(forminput);
      const argformtitle = getArgumentsItem(formtitle);
      const argformsubmittext = getArgumentsItem(formsubmittext);
      const argformresettext = getArgumentsItem(formresettext);
      setConfig({
        variant: argforminput as any,
        title: argformtitle,
        submittext: argformsubmittext,
        resettext: argformresettext
      });
    },
    []
  );

  // 向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("setFormData", setFormData);
    eventEmitter.addEventListener("setFormConfig", setFormConfig);
  }, [eventEmitter, setFormData, setFormConfig]);

  /**========================================================== */

  const RHForm = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, formState } = RHForm;

  const onSubmit = useCallback(
    async (data) => {
      const apiArguments = api?.find((item) => item.apiId === "afterClick");
      if (apiArguments) {
        apiArguments.body = [{ type: "mixed", fieldName: "formdata", data }];
        await requester(apiArguments || {}, true);
      }
      // 执行提交后续事务
      eventEmitter.emit(events.submit);
    },
    [api, eventEmitter, events.submit]
  );

  const onReset = useCallback(() => {
    reset();
    // 处理checkbox toDo 这样处理不作用
    // setValue('check', []);
  }, [reset]);

  return (
    <Wrapper {...props} maxHeight maxWidth>
      {!!formLists?.length ? (
        <div className={classNames(s.root, userClass.wrap)}>
          <ScopedCssBaseline>
            <form
              className={s.form}
              onSubmit={handleSubmit(onSubmit)}
              onReset={onReset}
            >
              <h3 className={classNames(s.header, userClass.header)}>
                {config?.title || 'header'}
              </h3>
              <div
                className={classNames(
                  s.container,
                  userClass.container,
                  userClass.formitem
                )}
              >
                <Grid container spacing={2}>
                  {formLists?.map(({ type, row, ...other }, index) => {
                    if (type === "checkboxgroup") {
                      return (
                        <CheckboxGroup
                          key={index}
                          row={row}
                          {...other}
                          type="checkboxgroup"
                          form={RHForm as any}
                          className={userClass.formitem}
                        />
                      );
                    }
                    if (type === "radiogroup") {
                      return (
                        <RadioGroup
                          key={index}
                          row={row}
                          {...other}
                          type="radiogroup"
                          form={RHForm as any}
                          className={userClass.formitem}
                        />
                      );
                    }
                    return (
                      <TextField
                        key={index}
                        variant={config.variant}
                        type={type}
                        {...other}
                        form={RHForm as any}
                        className={userClass.formitem}
                      />
                    );
                  })}
                </Grid>
              </div>
              <div className={classNames(s.footer, userClass.footer)}>
                <label className={userClass.oknormal}>
                  <button type="submit" disabled={!formState.isValid}>
                    {config?.submittext ||  '提交'}
                  </button>
                </label>
                <label className={userClass.resetnormal}>
                  <button type="reset">{config?.resettext ||  '重置'}</button>
                </label>
              </div>
            </form>
          </ScopedCssBaseline>
        </div>
      ) : null}
    </Wrapper>
  );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Form.exposeFunctions = [
  {
    name: "setFormData",
    description: "设置表单数据",
    arguments: [
      {
        type: "runningTime",
        name: "表单数据",
        describe: "设置表单数据",
        data: "",
        fieldName: "formdata",
      },
    ],
  },
  {
    name: "setFormConfig",
    description: "设置表单功能",
    arguments: [
      {
        type: "string",
        name: "输入框",
        describe: "standard,outlined或filled默认standard",
        data: "",
        fieldName: "forminput",
      },
      {
        type: "string",
        name: "表单标题",
        describe: "设置表单标题文字",
        data: "",
        fieldName: "formtitle",
      },
      {
        type: "string",
        name: "提交按钮",
        describe: "设置提交按钮文字",
        data: "提交",
        fieldName: "formsubmittext",
      },
      {
        type: "string",
        name: "重置按钮",
        describe: "设置重置按钮文字",
        data: "重置",
        fieldName: "formresettext",
      },
    ],
  },
];

/**
 * 发布事件的静态描述
 */
Form.exposeEvents = [
  {
    name: "mount",
    description: "初始化",
  },
  {
    name: "unmount",
    description: "卸载",
  },
  {
    name: "submit",
    description: "提交表单（Api请求后）",
  },
];

/**
 * 发布默认porps
 */
Form.exposeDefaultProps = {
  style: {
    basic: {},
    wrap: {},
    header: {},
    container: {},
    formitem: {},
    label: {},
    errorlabel: {},
    icon: {},
    baseline: {},
    baselineact: {},
    errorbaseline: {},
    errorbaselineact: {},
    footer: {},
    button: {},
    oknormal: {},
    okdisabled: {},
    resetnormal: {},
  },
  styleDescription: {
    wrap: "包裹器",
    header: "头部",
    container: "内容",
    formitem: "表单项",
    label: "标签",
    errorlabel: "错误标签",
    icon: "图标",
    baseline: "输入框",
    baselineact: "输入框激活",
    errorbaseline: "错误输入框",
    errorbaselineact: "错误输入框激活",
    footer: "脚部",
    button: "按钮",
    oknormal: "提交按钮",
    okdisabled: "提交按钮禁用",
    resetnormal: "重置按钮",
  },
};

/**
 * 发布默认Api
 */
Form.exposeApi = [
  {
    apiId: "afterClick",
    name: "提交表单(由提交表单事件自动收集表单数据)",
    hideBodyInput: true,
  },
];

export default Form;
