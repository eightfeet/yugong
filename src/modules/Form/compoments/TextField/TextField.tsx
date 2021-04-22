import { Grid } from "@material-ui/core";
import MUiTextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";
import { FormItem } from "../formTypes";

interface TextFidleProps extends FormItem {
  type: string
}

const TextField: React.FC<TextFidleProps> = ({
  form,
  name,
  ...other
}) => {
  const {control, formState: { errors }} = form
  return (
    <Grid item xs={12}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <MUiTextField
            fullWidth
            {...other}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            {...field}
          />
        )}
      />
    </Grid>
  )
};

export default TextField;

