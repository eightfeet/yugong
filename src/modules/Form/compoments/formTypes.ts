import { UseFormReturn } from "react-hook-form";

export interface FormOptions {
    label: string;
    checked?: boolean;
    value?: any
}

export interface FormItem {
    /**字段名 */
    fieldName: `${string}` | `${string}.${string}` | `${string}.${number}`;
    /**标签 */
    label?: string;
    /**可选属性 */
    options?: FormOptions[];
    /**表单 */
    form: UseFormReturn;
}

type FormItemType = "select" | "time" | "text" | "date" | "datetime" | "checkboxgroup" | "radiogroup";

export interface FormArguments {
    /**字段名 */
    fieldName: string,
    /**标签 */
    label: string;
    /**类型 */
    type: FormItemType
}