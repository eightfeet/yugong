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
import classNames from 'classnames';

interface RadioGroupProps extends FormItem {
    row?: boolean;
    className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    label,
    fieldName,
    form,
    options = [],
    row,
    className,
}) => {
    const {
        control,
        formState: { errors },
    } = form;
    return (
        <Grid item xs={12} className={classNames(className)}>
            <FormControl
                className={s.fieldset}
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
                            <MUiRadioGroup row={row} aria-label={label} {...field} value={field.value || ''}>
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
                <FormHelperText>{errors[fieldName]?.message}</FormHelperText>
            </FormControl>
        </Grid>
    );
};

export default RadioGroup;
