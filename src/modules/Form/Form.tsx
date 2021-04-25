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

export interface FormProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

const Form: Modules<FormProps> = (props) => {
  const { eventEmitter, events = {}, api } = props;
  const [defaultValues, setDefaultValues] = useState<{ [key: string]: any }>(
    {}
  );
  const [formLists, setFormLists] = useState<FormArguments[]>();
  const [schema, setSchema] = useState<any>();
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
  
  // 向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("setFormData", setFormData);
  }, [eventEmitter, setFormData]);

  /**========================================================== */

  const RHForm = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, formState } = RHForm;

  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  const onReset = useCallback(() => {
    reset();
    // 处理checkbox toDo 这样处理不作用
    // setValue('check', []);
  }, [reset]);

  return (
    <Wrapper {...props} maxHeight maxWidth>
      {!!formLists?.length ? (
        <ScopedCssBaseline>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onReset={onReset}
            style={{ padding: 24 }}
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
                    />
                  );
                }
                return (
                  <TextField
                    key={index}
                    type={type}
                    {...other}
                    form={RHForm as any}
                  />
                );
              })}
            </Grid>

            <button type="submit" disabled={!formState.isValid}>提交</button>
            <button type="reset">重置</button>
          </form>
        </ScopedCssBaseline>
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
    description: "提交表单",
  },
];

/**
 * 发布默认porps
 */
Form.exposeDefaultProps = {};

/**
 * 发布默认Api
 */
Form.exposeApi = [];

export default Form;
