import { FormGroup, Grid, FormControlLabel, FormControl, FormLabel, FormHelperText } from "@material-ui/core";
import MUiCheckbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import s from './Checkbox.module.less'

interface CheckboxsProps {
  control: any;
  errors?: any;
  label?: string
  name: `${string}` | `${string}.${string}` | `${string}.${number}`;
}

const Checkbox: React.FC<CheckboxsProps & CheckboxProps> = ({
  control,
  errors,
  name,
  label,
  ...other
}) => {
  const [state, setState] = useState();

  const handleChange = useCallback(
    (index) => (event: React.ChangeEvent<HTMLInputElement>) => {
      // setState({ ...state, [event.target.name]: event.target.checked });
      console.log(index, event.target);
    },
    [],
  );


  return (
    <Grid item xs={12}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormControl className={s.fieldset} component="fieldset" error={!!errors} {...field}>
            {label ? <FormLabel className={s.legend} component="legend">{label}</FormLabel> : null}
            <FormGroup>
              <FormControlLabel
                control={<MUiCheckbox checked={true} onChange={handleChange(0)} />}
                label="Gilad Gray"
              />
              <FormControlLabel
                control={<MUiCheckbox checked={false} onChange={handleChange(1)} />}
                label="Jason Killian"
              />
              <FormControlLabel
                control={<MUiCheckbox checked={false} onChange={handleChange(2)} />}
                label="Antoine Llorca"
              />
            </FormGroup>
            <FormHelperText>{errors?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </Grid>
  );
};

export default Checkbox;
