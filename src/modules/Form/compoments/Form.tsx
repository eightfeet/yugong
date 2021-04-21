import React from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  defaultValues?: any;
  children: JSX.Element | JSX.Element[];
  onSubmit: (data: any) => void;
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


export function Input(data: { [x: string]: any; register?: any; name: any; }) {
  const { register, name, ...rest } = data
  return <input {...register(name)} {...rest} />;
}

export function Select({ register, options, name, ...rest }: any) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value: any, index: number) => (
        <option key={index} value={value}>{value}</option>
      ))}
    </select>
  );
}
/**https://codesandbox.io/s/react-hook-form-smart-form-component-forked-iq89z?file=/src/components.js:0-987 */


/*import Checkbox from '@material-ui/core/Checkbox';

<Checkbox
    checked={state.checkedF}
    onChange={handleChange}
    name="checkedF"
    indeterminate
/>

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

<RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
    <FormControlLabel value="best" control={<Radio />} label="The best!" />
    <FormControlLabel value="worst" control={<Radio />} label="The worst." />
</RadioGroup>

import Select from '@material-ui/core/Select';

<Select
    native
    value={state.age}
    onChange={handleChange}
    inputProps={{
    name: 'age',
    id: 'age-native-simple',
    }}
>
    <option aria-label="None" value="" />
    <option value={10}>Ten</option>
    <option value={20}>Twenty</option>
    <option value={30}>Thirty</option>
</Select>

import Slider from '@material-ui/core/Slider';
<Slider
  defaultValue={0.00000005}
  getAriaValueText={valuetext}
  aria-labelledby="discrete-slider-small-steps"
  step={0.00000001}
  marks
  min={-0.00000005}
  max={0.0000001}
  valueLabelDisplay="auto"
/>

import TextField from '@material-ui/core/TextField';
<TextField
        id="filled-secondary"
        label="Filled secondary"
        variant="filled"
        color="secondary"
      />*/