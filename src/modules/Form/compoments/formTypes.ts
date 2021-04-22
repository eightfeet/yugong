import { UseFormReturn } from "react-hook-form";

export interface FormItem {
    /**字段名 */
    name: string;
    /**标签 */
    label?: string;
    /**可选属性 */
    options?: {
        label: string;
        checked?: boolean;
        value?: any
    }[];
    /**表单 */
    form: UseFormReturn;
}