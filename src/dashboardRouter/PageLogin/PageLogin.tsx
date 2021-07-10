import React from 'react';
import Login from '~/components/Login';
import s from './PageLogin.module.less';

interface Props {
    
}

const PageLogin:React.FC<Props> = ({}) => {
    return (
        <div className={s.loginwrap}>
            <div className={s.main}>
                <Login labelCol={5} />
                <div className={s.space} />
            </div>
        </div>
    )
}

export default PageLogin