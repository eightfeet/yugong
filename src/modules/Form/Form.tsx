import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data: any) => console.log(errors, data);

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

    return (
        <Wrapper {...props}>
            <form onSubmit={handleSubmit(onSubmit)} className={s.root}>
                <input
                    {...register('firstName', {
                        required: '请输入姓名',
                        pattern: /^[A-Za-z]+$/i,
                        max: 11,
                    })}
                />
                <p>{errors.firstName?.message}</p>
                <input {...register('lastName')} placeholder="Last name" />
                <select {...register('category')}>
                    <option value="">Select...</option>
                    <option value="A">Category A</option>
                    <option value="B">Category B</option>
                </select>

                <input type="submit" />
            </form>
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
