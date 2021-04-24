import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from './compoments/TextField';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import CheckboxGroup from './compoments/CheckboxGroup';
import RadioGroup from './compoments/RadioGroup';

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

    /**========================================================== */

    const defaultValues = {
        name: '',
        check: [],
        radio: null,
        picker: '',
        time: '',
        datetime: '',
        date: '',
    };

    const schema = Yup.object().shape({
        name: Yup.string().required('请填写姓名'),
        check: Yup.array().min(1, '请至少选择一项'),
        radio: Yup.mixed().required('请选择'),
    });

    const RHForm = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { handleSubmit, reset } = RHForm;

    const onSubmit = useCallback((data) => {
        console.log(data);
    }, []);

    const onReset = useCallback(() => {
        reset();
        // 处理checkbox toDo 这样处理不作用
        // setValue('check', []);
    }, [reset]);

    return (
        <Wrapper {...props} maxHeight maxWidth>
            <ScopedCssBaseline>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    onReset={onReset}
                    style={{ padding: 24 }}
                >
                    <Grid container spacing={2}>
                        <TextField
                            fieldName="name"
                            label="姓名"
                            type="text"
                            form={RHForm as any}
                        />
                        <TextField
                            fieldName="picker"
                            label="姓名"
                            type="select"
                            options={[
                                {
                                    label: '选项1',
                                    value: 1,
                                },
                                {
                                    label: '选项2',
                                    value: 2,
                                },
                            ]}
                            form={RHForm as any}
                        />
                        <TextField
                            fieldName="time"
                            label="时间"
                            type="time"
                            form={RHForm as any}
                        />
                        <TextField
                            fieldName="date"
                            label="日期"
                            type="date"
                            form={RHForm as any}
                        />
                        <TextField
                            fieldName="datetime"
                            label="日期时间"
                            type="datetime"
                            form={RHForm as any}
                        />
                        <CheckboxGroup
                            fieldName="check"
                            row
                            label="请选择"
                            options={[
                                {
                                    label: '选项1',
                                },
                                {
                                    label: '选项2',
                                },
                            ]}
                            form={RHForm as any}
                        />
                        <RadioGroup
                            fieldName="radio"
                            row
                            label="RadioGroup 选择"
                            options={[
                                {
                                    label: '选项1',
                                    value: '1111',
                                },
                                {
                                    label: '选项2',
                                    value: '2222',
                                },
                            ]}
                            form={RHForm as any}
                        />
                    </Grid>

                    <button type="submit">提交</button>
                    <button type="reset">重置</button>
                </form>
            </ScopedCssBaseline>
        </Wrapper>
    );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Form.exposeFunctions = [
    {
        name: 'setData',
        description: '设置表单',
        arguments: [
            {
                type: 'object',
                name: 'img',
                describe: '图片url',
                data: {
                    url: '',
                    alt: '',
                },
                fieldName: 'img',
            },
        ],
    },
];

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
