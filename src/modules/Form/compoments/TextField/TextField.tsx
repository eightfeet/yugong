import { Grid } from "@material-ui/core";
import MUiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";

interface TextFieldsProps {
  control: any;
  errors: any;
  name: `${string}` | `${string}.${string}` | `${string}.${number}`;
}

const TextField: React.FC<TextFieldsProps & TextFieldProps> = ({
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
        <MUiTextField
          {...other}
          error={!!errors}
          helperText={errors?.message}
          {...field}
        />
      )}
    />
  </Grid>
);

export default TextField;

