import {
  FormGroup,
  Grid,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import MUiCheckbox from "@material-ui/core/Checkbox";
import classNames from "classnames";
import { useCallback } from "react";
import { Controller } from "react-hook-form";
import isType from "~/core/helper/isType";
import { FormItem, FormOptions } from "../formTypes";
import s from "./CheckboxGroup.module.less";

interface CheckboxGroupProps extends FormItem {
  row?: boolean;
  className?: string;
  disabled?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  fieldName,
  form,
  options = [],
  row,
  disabled,
  className
}) => {
  const {
    control,
    formState: { errors },
  } = form;


  const handleSelect = useCallback(
    (element: FormOptions, opreatValue) => {
      if (!isType(opreatValue, "Array")) {
        return [element.value]
      } else if(opreatValue.includes(element.value)) {
        return opreatValue.filter((item: any) => item !== element.value);
      } else {
        opreatValue.push(element.value);
        return [...opreatValue];
      }
    },
    []
  );

  return (
    <Grid item xs={12} className={classNames(className)}>
      <FormControl
        className={s.fieldset}
        disabled={disabled}
        component="fieldset"
        error={!!errors[fieldName]}
      >
        {label ? (
          <FormLabel className={s.legend} component="legend">
            {label}
          </FormLabel>
        ) : null}

        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => {
            return (
              <FormGroup row={row}>
                {options.map((element, index: number) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <MUiCheckbox
                        onChange={(event: any) => {
                          field.onChange(handleSelect(element, field.value));
                        }}
                        checked={Array.isArray(field.value) && field.value.includes(element.value)}
                      />
                    }
                    label={element.label}
                  />
                ))}
              </FormGroup>
            );
          }}
        />
        <FormHelperText>{errors[fieldName]?.message}</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default CheckboxGroup;
