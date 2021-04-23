import { Grid } from '@material-ui/core';
import MUiTextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';
import { FormItem } from '../formTypes';

interface TextFidleProps extends FormItem {
    type: 'text' | 'date' | 'datetime' | 'time' | 'select';
}

const timeTypes = ['date', 'datetime', 'time'];

const TextField: React.FC<TextFidleProps> = ({
    form,
    name,
    type,
    options,
    ...other
}) => {
    const {
        control,
        formState: { errors },
    } = form;

    const typeProps: any = {};
    if (timeTypes.includes(type)) {
        typeProps.InputLabelProps = {
            shrink: true,
        };
        if (type === 'datetime') {
            typeProps.type = 'datetime-local';
        } else {
            typeProps.type = type;
        }
    } else if (type === 'select') {
        typeProps.select = true;
        typeProps.SelectProps = {
            native: true,
        };
    } else {
        typeProps.type = type;
    }

    return (
        <Grid item xs={12}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <MUiTextField
                        fullWidth
                        {...typeProps}
                        {...other}
                        error={!!errors[name]}
                        helperText={errors[name]?.message}
                        {...field}
                    >
                        <>
                            <option value={undefined}>请选择</option>
                            {options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </>
                    </MUiTextField>
                )}
            />
        </Grid>
    );
};

export default TextField;
