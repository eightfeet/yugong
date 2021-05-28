import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from './compoments/TextField';
import requester from '~/core/fetch';
import { AppDataElementsTypes, ArgumentsItem } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import CheckboxGroup from './compoments/CheckboxGroup';
import RadioGroup from './compoments/RadioGroup';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { FormArguments } from './compoments/formTypes';
import { compileFormData } from './helper';
import s from './Form.module.less';
import useStyles from './Form.useStyle';
import config from './Form.config';
import classNames from 'classnames';
import useLifeCycle, { UseLifeCycleResult } from '~/hooks/useLifeCycle';

export interface FormProps extends AppDataElementsTypes {
}

interface Config {
    variant?: 'outlined' | 'filled' | 'standard';
    title?: any;
    submittext?: any;
    resettext?: any;
}

const Form: Modules<FormProps> = (props) => {
    const { api, style, moduleId } = props;
    const [defaultValues, setDefaultValues] = useState<{ [key: string]: any }>(
        {}
    );
    const [formLists, setFormLists] = useState<FormArguments[]>();
    const [schema, setSchema] = useState<any>();
    const [config, setConfig] = useState<Config>({});

    const useLifeCycleRef = useRef<UseLifeCycleResult<{ [keys in 'mount' | 'unmount' | 'submit' ]: Function }>>();

    const userClass = useStyles(style);
    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find((item) => item.apiId === '');
        requester(apiArguments || {});
    }, [api]);

    const setFormData = useCallback((name: ArgumentsItem) => {
        const list = getArgumentsItem(name) || [];
        const result = compileFormData(list as FormArguments[]);
        setSchema(result.schema);
        setDefaultValues(result.defaultValue);
        setFormLists(list as FormArguments[]);
    }, []);

    const setFormConfig = useCallback(
        (forminput, formtitle, formsubmittext, formresettext) => {
            const argforminput = getArgumentsItem(forminput);
            const argformtitle = getArgumentsItem(formtitle);
            const argformsubmittext = getArgumentsItem(formsubmittext);
            const argformresettext = getArgumentsItem(formresettext);
            setConfig({
                variant: argforminput as any,
                title: argformtitle,
                submittext: argformsubmittext,
                resettext: argformresettext,
            });
        },
        []
    );

    /**========================================================== */

    const RHForm = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const { handleSubmit, reset } = RHForm;
    // 确保表单只做一次默认数据填充
    const isDefault = useRef(false);
    useEffect(() => {
        if (Object.keys(defaultValues).length && !isDefault.current) {
            isDefault.current = true;
            for (const key in defaultValues) {
                if (Object.prototype.hasOwnProperty.call(defaultValues, key)) {
                    const element = defaultValues[key];
                    RHForm.setValue(key as `${string}`, element);
                }
            }
        }
    }, [RHForm, defaultValues]);

    const setFormItem = useCallback(
        (fieldName: ArgumentsItem, fieldValue: ArgumentsItem) => {
            const argfieldName = getArgumentsItem(fieldName);
            const argfieldValue = getArgumentsItem(fieldValue);
            RHForm.setValue(argfieldName as any, argfieldValue);
        },
        [RHForm]
    );

    useLifeCycleRef.current = useLifeCycle(
        moduleId,
        { mount: '初始化', unmount: '卸载', submit: '提交表单（Api请求后' },
        { setFormData, setFormConfig, setFormItem }
    );

    const onSubmit = useCallback(
        async (data) => {
            const apiArguments = api?.find(
                (item) => item.apiId === 'afterClick'
            );
            if (apiArguments) {
                apiArguments.body = [
                    { type: 'mixed', fieldName: 'formdata', data },
                ];
                await requester(apiArguments || {}, true);
            }
            // 执行提交后续事务
            useLifeCycleRef.current?.[0].submit();
        },
        [api]
    );

    const onReset = useCallback(() => {
        reset();
    }, [reset]);

    return (
        <Wrapper {...props} maxHeight maxWidth itemAlign="top">
            {!!formLists?.length ? (
                <div className={classNames(s.root, userClass.wrap)}>
                    <ScopedCssBaseline classes={{ root: s.rootform }}>
                        <form
                            className={s.form}
                            onSubmit={handleSubmit(onSubmit)}
                            onReset={onReset}
                        >
                            <h3 className={classNames('formheader', s.header)}>
                                {config?.title || 'header'}
                            </h3>
                            <div
                                className={classNames(
                                    'formcontainer',
                                    s.container
                                )}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    className={userClass.formitem}
                                >
                                    {formLists?.map(
                                        ({ type, row, ...other }, index) => {
                                            if (type === 'checkboxgroup') {
                                                return (
                                                    <CheckboxGroup
                                                        key={index}
                                                        row={row}
                                                        {...other}
                                                        type="checkboxgroup"
                                                        form={RHForm as any}
                                                        className={
                                                            userClass.formitem
                                                        }
                                                    />
                                                );
                                            }
                                            if (type === 'radiogroup') {
                                                return (
                                                    <RadioGroup
                                                        key={index}
                                                        row={row}
                                                        {...other}
                                                        type="radiogroup"
                                                        form={RHForm as any}
                                                        className={
                                                            userClass.formitem
                                                        }
                                                    />
                                                );
                                            }
                                            return (
                                                <TextField
                                                    key={index}
                                                    variant={config.variant}
                                                    type={type}
                                                    {...other}
                                                    form={RHForm as any}
                                                    className={
                                                        userClass.formitem
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </Grid>
                            </div>
                            <div className={userClass.footer}>
                                <button
                                    type="submit"
                                    className={classNames(s.button, 'form_ok')}
                                >
                                    {config?.submittext || '提交'}
                                </button>
                                <button
                                    type="reset"
                                    className={classNames(
                                        s.button,
                                        'form_reset'
                                    )}
                                >
                                    {config?.resettext || '重置'}
                                </button>
                            </div>
                        </form>
                    </ScopedCssBaseline>
                </div>
            ) : null}
        </Wrapper>
    );
};

// bind static
for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        Form[key] = config[key];
    }
}

export default Form;
