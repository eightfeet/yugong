import {
    FormGroup,
    Grid,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormHelperText,
} from '@material-ui/core';
import MUiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import s from './Checkbox.module.less';

interface CheckboxsProps {
    control: any;
    errors?: any;
    label?: string;
    name: `${string}` | `${string}.${string}` | `${string}.${number}`;
    setValue: (name: string, value: boolean) => any;
    getValues: any;
    options: {
        label: string;
        checked: boolean;
    }[];
}

const Checkbox: React.FC<CheckboxsProps> = ({
    control,
    errors,
    name,
    label,
    options
}) => {

    const handleChange = useCallback(
        (index) => (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(1111)
        },
        []
    );

    return (
        <Grid item xs={12}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <FormControl
                        className={s.fieldset}
                        component="fieldset"
                        error={!!errors}
                        {...field}
                    >
                        {label ? (
                            <FormLabel className={s.legend} component="legend">
                                {label}
                            </FormLabel>
                        ) : null}
                        <FormGroup>
                            {options.map(({ checked, label }, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <MUiCheckbox
                                            onChange={handleChange(index)}
                                            checked={checked}
                                        />
                                    }
                                    label={label}
                                />
                            ))}
                        </FormGroup>
                        <FormHelperText>{errors?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </Grid>
    );
};

export default Checkbox;
