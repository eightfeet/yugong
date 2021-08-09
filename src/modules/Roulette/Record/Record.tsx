import React from 'react';
import Modal from '~/components/Modal';
import Cancel from "~/components/Icon/Cancel";
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import s from './Record.module.less';
import classNames from 'classnames';

interface Props {
    visible: boolean;
    onClose: () => any;
    classNameGroup: {
        content: string;
        close: string;
    }
}

const Record:React.FC<Props> = ({
    visible, 
    onClose = () => {},
    classNameGroup
}) => {
    return (
        <Modal visible={visible}>
            <div className={s.modalmain}>
                <div className={classNames(s.close, classNameGroup.close)} onClick={onClose}>
                    <Cancel />
                </div>
                <h3>标题</h3>
                <div className={classNameGroup.content} >
                    <PullToRefresh>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                        </ul>
                    </PullToRefresh>
                </div>
            </div>
        </Modal>
    )
}

export default Record