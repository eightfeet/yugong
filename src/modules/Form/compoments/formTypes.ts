import { UseFormReturn } from "react-hook-form";

export interface FormOptions {
    label: string;
    checked?: boolean;
    value?: any
}

export interface FormItem {
    /**字段名 */
    name: `${string}` | `${string}.${string}` | `${string}.${number}`;
    /**标签 */
    label?: string;
    /**可选属性 */
    options?: FormOptions[];
    /**表单 */
    form: UseFormReturn;
}