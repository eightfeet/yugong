import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import s from './Form.module.less';

export interface FormProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Form: Modules<FormProps> = (props) => {
    const { eventEmitter, events = {}, api } = props;

    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find((item) => item.apiId === '');
        requester(apiArguments || {});
    }, [api]);
    // 基本事件
    useEffect(() => {
        // 执行挂载事件
        eventEmitter.emit(events.mount);
        return () => {
            // 执行卸载事件
            eventEmitter.emit(events.unmount);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = useCallback((data: any) => {
        alert(JSON.stringify(data));
    }, []);

    const defaultValues = {
        name: '2017-05-24',
        description: '',
    };

    const schema = Yup.object().shape({
        name: Yup.string()
            .required('请输入年月日')
            .min(3, '请输入姓名大于30个字符')
            .max(64),
        description: Yup.string().required('请输入描述'),
    });

    const { control, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const { errors } = formState;

    return (
        <Wrapper {...props}>
            <ScopedCssBaseline>
                <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 24 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        id="date"
                                        label="姓名"
                                        type="date"
                                        error={!!errors.name}
                                        helperText={
                                            errors.name &&
                                            errors.name.message
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        multiline
                                        label="描述"
                                        margin="dense"
                                        error={!!errors.description}
                                        helperText={
                                            errors.description &&
                                            errors.description.message
                                        }
                                        {...field}
                                    />
                                )}
                                control={control}
                                name="description"
                            />
                        </Grid>
                    </Grid>
                    <button type="submit" disabled={!formState.isValid}>
                        Submit
                    </button>
                </form>
            </ScopedCssBaseline>
        </Wrapper>
    );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Form.exposeFunctions = [];

/**
 * 发布事件的静态描述
 */
Form.exposeEvents = [
    {
        name: 'mount',
        description: '初始化',
    },
    {
        name: 'unmount',
        description: '卸载',
    },
];

/**
 * 发布默认porps
 */
Form.exposeDefaultProps = {};

/**
 * 发布默认Api
 */
Form.exposeApi = [];

export default Form;
