import { FormArguments } from "./compoments/formTypes";
import isType from "~/core/helper/isType";
import * as Yup from "yup";

interface compileFormDataResult {
  defaultValue: {
    [key: string]: any;
  };
  schema: {
    [key: string]: any;
  };
}

/**
 * 编译原始表单数据
 * @param list
 */
export const compileFormData = (
  list: FormArguments[]
): compileFormDataResult => {
  const oprateDefaultValue: any = {};
  const validatelist: any = {};
  (list as any[])?.forEach((item: FormArguments) => {
    if (item.defaultValue) {
      oprateDefaultValue[item.fieldName] = item.defaultValue;
    }
    // 表单验证
    if (isType(item.rules, "Object")) {
      const ruledata: any = item.rules || {};
      Object.keys(ruledata).forEach((key) => {
        const element = ruledata[key];
        const validateFn = Yup[key];
        // 便利每个方法对象
        if (validateFn && isType(element, "Object")) {
          // 交由reduice去处理，trycatch保证程序正常运行
          try {
            validatelist[item.fieldName] = Object.keys(element).reduce(
              (previousValue, subKey) => {
                const args = [...(element[subKey] || [])];
                // 处理正则
                if (subKey === 'matches') {
                  args[0]= new RegExp(args[0])
                }
                return previousValue[subKey](...args);
              },
              validateFn()
            );
          } catch (error) {
            console.error(error);
          }
        }
      });
    }
  });

  return {
    defaultValue: oprateDefaultValue,
    schema: Yup.object().shape(validatelist),
  };
};
