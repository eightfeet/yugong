import React, { useEffect } from 'react';
import { trackPageView } from "~/core/tracking";

interface Props {
    
}

const Home:React.FC<Props> = () => {
    useEffect(() => {
        trackPageView('/首页')
    }, [])

    return (
        <div>
            homePage
        </div>
    )
}

export default Home