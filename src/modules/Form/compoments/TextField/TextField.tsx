import { Grid } from '@material-ui/core';
import MUiTextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { FormItem } from '../formTypes';

interface TextFidleProps extends FormItem {
    type: 'text' | 'date' | 'datetime' | 'time' | 'select';
    className?: string;
    variant?: string;
    disabled?: boolean;
    maxLength?: string;
}

const timeTypes = ['date', 'datetime', 'time'];

const TextField: React.FC<TextFidleProps> = ({
    form,
    fieldName,
    type,
    options,
    className,
    variant,
    disabled,
    maxLength,
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
        typeProps.InputLabelProps = {
            shrink: true,
        };
    } else {
        typeProps.type = type;
    }

    return (
        <Grid item xs={12} className={classNames(className)}>
            <Controller
                control={control}
                name={fieldName}
                render={({ field }) => (
                    <MUiTextField
                        fullWidth
                        variant={variant || 'standard'}
                        disabled={disabled}
                        {...typeProps}
                        {...other}
                        error={!!errors[fieldName]}
                        helperText={errors[fieldName]?.message}
                        {...field}
                        value={field.value || ''}
                        inputProps={{ maxLength }}
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
