import React from 'react';
import { useHistory } from 'react-router-dom';
import Register from '~/components/Register';
import s from './PageRegister.module.less';

interface Props {
    
}

const PageRegister:React.FC<Props> = ({}) => {
    const history = useHistory();
    return (
        <div className={s.loginwrap}>
            <div className={s.main}>
                <Register labelCol={5} onRegister={() => history.push('/login')} />
                <div className={s.space} />
            </div>
        </div>
    )
}

export default PageRegister