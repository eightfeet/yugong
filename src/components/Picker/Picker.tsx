import React, { useEffect, useRef } from 'react';
import Pic, { Option } from '@eightfeet/picker';

interface Props extends Option {
    visible: boolean
}

const Picker:React.FC<Props> = ({
    ...other
}) => {
    // 创建初始化
    const PicRef = useRef<Pic>(new Pic({
        ...other
    }));

    const checkVisible = useRef<boolean>();
    useEffect(() => {
        checkVisible.current = true;
    }, []);


    return (
        <div>
            
        </div>
    )
}

export default Picker