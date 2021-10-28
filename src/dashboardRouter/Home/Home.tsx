import React, { useEffect } from 'react';
import Logo from '~/components/Logo';
import { trackPageView } from "~/core/tracking";
import s from './Home.module.scss'

interface Props {
    
}

const Home:React.FC<Props> = () => {
    useEffect(() => {
        trackPageView('/首页')
    }, [])

    return (
        <div className={s.root}>
            <div>
                <Logo fill="#2626bc" />
            </div>
        </div>
    )
}

export default Home