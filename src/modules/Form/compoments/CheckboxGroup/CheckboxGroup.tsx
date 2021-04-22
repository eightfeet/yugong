import {
  FormGroup,
  Grid,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import MUiCheckbox from "@material-ui/core/Checkbox";
import { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { FormItem, FormOptions } from "../formTypes";
import s from "./CheckboxGroup.module.less";

const Checkbox: React.FC<FormItem> = ({ label, name, form, options = [] }) => {
  const {
    getValues,
    setValue,
    control,
    formState: { errors },
  } = form;

  const [values, setValues] = useState(getValues(name) || [])

  const handleSelect = useCallback(
    (formItem: FormOptions) => {
      let operateValue = [...values];
      if (operateValue.includes(formItem.label)) {
        operateValue = operateValue.filter(ele => ele !== formItem.label);
      } else {
        operateValue.push(formItem.label);
      }
      setValue(name, operateValue)
      setValues(operateValue)
    },
    [name, setValue, values]
  );

  console.log('values', values, getValues(name));
  console.log("errors", errors);

  return (
    <Grid item xs={12}>
      <FormControl
        className={s.fieldset}
        component="fieldset"
        error={!!errors[name]}
      >
        {label ? (
          <FormLabel className={s.legend} component="legend">
            {label}
          </FormLabel>
        ) : null}
        <FormGroup>
          {options.map((element, index: number) => (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={({ field }) => {
                    return (
                      <MUiCheckbox
                        checked={values.includes(element.label)}
                        onChange={() =>
                          field.onChange(handleSelect(element))
                        }
                      />
                    );
                  }}
                  control={control}
                />
              }
              key={index}
              label={element.label}
            />
          ))}
        </FormGroup>
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default Checkbox;
