import { message } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userResult } from '~/api';
import Login from '~/components/Login';
import { Dispatch } from '~/redux/store';
import s from './PageLogin.module.less';

interface Props {
    
}

const PageLogin:React.FC<Props> = () => {
    const { setAuth } = useDispatch<Dispatch>().controller;
    const history = useHistory();
    const onLogin = useCallback(
        (user: userResult) => {
            setAuth({
                isLogin: true,
                session: user
            })
            history.goBack();
            message.success('登录成功')
        },
        [history, setAuth],
    )
    return (
        <div className={s.loginwrap}>
            <div className={s.main}>
                <Login labelCol={5} onLogin={onLogin} />
                <div className={s.space} />
            </div>
        </div>
    )
}

export default PageLogin