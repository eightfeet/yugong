import {
    FormGroup,
    Grid,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormHelperText,
} from '@material-ui/core';
import MUiCheckbox from '@material-ui/core/Checkbox';
import { Controller } from 'react-hook-form';
import { FormItem } from '../formTypes';
import s from './Checkbox.module.less';

interface ValueItem {
    label: string;
    checked: boolean;
}

const Checkbox: React.FC<FormItem> = ({ label, name, form }) => {
    const {
        getValues,
        control,
        formState: { errors },
    } = form;

    const values = getValues(name);

    const handleSelect = ({label}: ValueItem) => {
        const operateValue = [...values];
        operateValue.forEach(item => {
            if (item.label === label) {
                item.checked = !item.checked
            }
        })
        return operateValue;
    };

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
                <FormGroup>
                    {values.map(
                        (
                            element: ValueItem,
                            index: number
                        ) => (
                            <FormControlLabel
                                control={
                                    <Controller
                                        name={name}
                                        render={({ field }) => {
                                            return (
                                                <MUiCheckbox
                                                    checked={element.checked}
                                                    onChange={() =>
                                                        field.onChange(
                                                            handleSelect(
                                                                element
                                                            )
                                                        )
                                                    }
                                                />
                                            );
                                        }}
                                        control={control}
                                    />
                                }
                                key={`${index}${element}`}
                                label={element.label}
                            />
                        )
                    )}
                </FormGroup>
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
        </Grid>
    );
};

export default Checkbox;
