import { Grid } from "@material-ui/core";
import MUiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Controller } from "react-hook-form";

interface CheckboxsProps {
  control: any;
  errors?: any;
  name: `${string}` | `${string}.${string}` | `${string}.${number}`;
}

const Checkbox: React.FC<CheckboxsProps & CheckboxProps> = ({
  control,
  errors,
  name,
  ...other
}) => (
  <Grid item xs={12}>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <MUiCheckbox
          {...field}
        />
      )}
    />
  </Grid>
);

export default Checkbox;

