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

interface CheckboxGroupProps extends FormItem {
  row?: boolean
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, name, form, options = [], row }) => {
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
      console.log(operateValue)
      setValues(operateValue);
      setValue(name, operateValue);
      return (operateValue);
    },
    [name, setValue, values]
  );

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
        <FormGroup row={row}>
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

export default CheckboxGroup;
