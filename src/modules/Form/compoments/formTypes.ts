import { UseFormReturn } from "react-hook-form";

export interface FormOptions {
    label: string;
    checked?: boolean;
    value?: any
}

export interface FormItem extends FormBase {
    /**表单 */
    form: UseFormReturn;
}

type FormItemType = "select" | "time" | "text" | "date" | "datetime" | "checkboxgroup" | "radiogroup";

export interface FormBase {
    /**字段名 */
    fieldName: `${string}` | `${string}.${string}` | `${string}.${number}`,
    /**标签 */
    label: string;
    /**类型 */
    type: FormItemType;
    /**是否横排，type=checkboxgroup ｜ radiogroup 时有效*/
    row?: boolean;
    /**属性 type=select | checkboxgroup | radiogroup 时有效*/
    options?: FormOptions[];
}

export interface FormArguments extends FormBase {
    /** 
     * 使用 yup Schema规则 https://github.com/jquense/yup#numberminlimit-number--ref-message-string--function-schema ； 
     * {key: value} 显示 
     * eg: 
     * string.length(limit: number | Ref, message?: string | function): Schema
     * string:{
     *  length:{
     *      limit: 20,
     *      message: "请输入大于20的，当前值${limit}不满足"
     *  }
     * }
     * */
    rules?: {
        [keys: string]: any
    }
}

