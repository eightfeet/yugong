import { useCallback, useEffect, useMemo, useState } from "react";
import { set, useForm } from "react-hook-form";
import * as Yup from "yup";
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
import { RootState } from "~/redux/store";
import { useSelector } from "react-redux";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import { FormArguments } from "./compoments/formTypes";

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
    const oprateDefaultValue: any = {};
    (list as any[])?.forEach((item: FormArguments) => {
        if (item.defaultValue) {
            oprateDefaultValue[item.fieldName] = item.defaultValue;
        }
    });
    console.log('oprateDefaultValue', oprateDefaultValue)
    setDefaultValues(oprateDefaultValue);
    setFormLists(list as FormArguments[]);
  }, []);
  // 向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("setFormData", setFormData);
  }, [eventEmitter, setFormData]);

  /**========================================================== */

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("请填写姓名")
      .min(3, "请至少输入3个字符")
      .max(5, "不能大于5个字符"),
    check: Yup.array().min(1, "请至少选择一项").required("请填xxx"),
    radio: Yup.mixed().required("请选择"),
  });

  const RHForm = useForm({
    mode: "onSubmit",
    defaultValues,
    // resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = RHForm;

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
              {formLists?.map(({ type, ...other }, index) => {
                if (type === "checkboxgroup") {
                  return (
                    <CheckboxGroup
                      key={index}
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

            <button type="submit">提交</button>
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
