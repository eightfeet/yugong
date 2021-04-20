import React from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  defaultValues: any;
  children: JSX.Element;
  onSubmit: () => void;
}
const Form = ({ defaultValues, children, onSubmit }: FormProps) => {
  const { handleSubmit, register } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export default Form;


export function Input(data: { [x: string]: any; register: any; name: any; }) {
  const { register, name, ...rest } = data
  return <input {...register(name)} {...rest} />;
}

export function Select({ register, options, name, ...rest }: any) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value: any) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
}
/**https://codesandbox.io/s/react-hook-form-smart-form-component-forked-iq89z?file=/src/components.js:0-987 */
