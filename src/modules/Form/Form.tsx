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
import TextField from './compoments/TextField';
import Checkbox from './compoments/Checkbox';
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
        name: '',
        check: [{
            label: 'bill',
            checked: false,
        },{
            label: 'luo',
            checked: false,
        },{
            label: 'Manos',
            checked: false,
        },{
            label: 'user120242',
            checked: false,
        }],
    };

    const CHECK_SCHEMA = Yup.object().shape({
        checked: Yup.boolean().oneOf([true], 'Must Accept Cookie Policy')
    })

    const schema = Yup.object().shape({
        name: Yup.string()
            .required('请输入年月日')
            .min(3, '请输入姓名大于30个字符')
            .max(64),
            check: Yup.array().of(CHECK_SCHEMA)
    });
  
    const RHForm = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { handleSubmit, formState } = RHForm;

    return (
        <Wrapper {...props} maxHeight maxWidth>
            <ScopedCssBaseline>
                <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 24 }}>
                    <Grid container spacing={2}>
                        <TextField
                            name="name"
                            label="姓名"
                            type="text"
                            form={RHForm as any}
                        />
                        <Checkbox
                            name="check"
                            label="请选择"
                            options={[{
                              label: '选项1',
                              checked: false
                            },{
                              label: '选项2',
                              checked: false
                            }]}
                            form={RHForm as any}
                        />
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
