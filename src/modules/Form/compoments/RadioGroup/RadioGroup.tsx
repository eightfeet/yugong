import {
    Grid,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormHelperText,
} from '@material-ui/core';
import MUiRadioGroup from '@material-ui/core/RadioGroup';
import MUiRadio from '@material-ui/core/Radio';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormItem } from '../formTypes';
import s from './RadioGroup.module.less';

interface RadioGroupProps extends FormItem {
    row?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    label,
    name,
    form,
    options = [],
    row,
}) => {
    const {
        control,
        formState: { errors },
    } = form;

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
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        return (
                            <MUiRadioGroup row={row} aria-label={label} {...field}>
                                {options.map((element, index: number) => (
                                    <FormControlLabel
                                        key={index}
                                        value={element.value}
                                        control={<MUiRadio />}
                                        label={element.label}
                                    />
                                ))}
                            </MUiRadioGroup>
                        );
                    }}
                />
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
        </Grid>
    );
};

export default RadioGroup;
