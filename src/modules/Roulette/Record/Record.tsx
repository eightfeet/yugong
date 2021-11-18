import React, { useState } from 'react';
import Modal from '~/components/Modal';
import Cancel from "~/components/Icon/Cancel";
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import s from './Record.module.less';
import classNames from 'classnames';
import { PrizeTypes } from '../Roulette';

interface Props {
    id?: string;
    visible: boolean;
    onClose: () => any;
    onSaveAddress?: (item: (PrizeTypes | any)) => void;
    classNameGroup?: {
        content: string;
        close: string;
    }
}

const Record:React.FC<Props> = ({
    id,
    visible, 
    onClose = () => {},
    classNameGroup
}) => {
    
    const [list] = useState<(PrizeTypes | any)[]>([1,2,3,4,5,6,7])
    
    return (
        <Modal id={`${id}_record`} visible={visible}>
            <div className={s.modalmain}>
                <div className={classNames(s.close)} onClick={onClose}>
                    <Cancel />
                </div>
                <h3>标题</h3>
                <div className={classNameGroup?.content} >
                    <PullToRefresh>
                        <ul>
                            {list.map(item => (
                                <li>{item}</li>
                            ))}
                        </ul>
                    </PullToRefresh>
                </div>
            </div>
        </Modal>
    )
}

export default Record