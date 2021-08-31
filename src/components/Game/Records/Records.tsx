import Modal from './../Modal';
import React from 'react';
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import classNames from 'classnames';
import s from './Records.module.scss';

export interface RecordsProps {
    className?: string;
    /**显示中奖记录弹窗 */
    visible?: boolean;
    /**关闭中奖记录弹窗 */
    onCancel?: () => void;
    /**中奖记录返回按钮文字 */
    okText?: string;
    /**中奖记录弹窗标题 */
    title?: string;
    /**禁止列表下拉 */
    disablePullDown?: boolean;
    /**列表下拉方法,用于刷新列表 */
    onPullDown?: () => Promise<any>;
    /**禁止列表上拉 */
    disablePullUp?: boolean;
    /**列表上拉方法,用于获取更多数据 */
    onPullUp?: () => Promise<any>;
}

const Records: React.FC<RecordsProps> = ({
    visible,
    onCancel,
    okText,
    title,
    className,
    children,
    onPullDown,
    onPullUp,
    disablePullDown,
    disablePullUp,
}) => {
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            okText={okText || `返回抽奖`}
            onOk={onCancel}
            title={title || `<h3>中奖记录</h3>`}
        >
            <div className={classNames(s.recordswrap, className)}>
                <PullToRefresh
                    disablePullDown={disablePullDown}
                    disablePullUp={disablePullUp}
                    onPullUp={onPullUp}
                    onPullDown={onPullDown}
                >
                    {children}
                </PullToRefresh>
            </div>
        </Modal>
    );
};

Records.displayName = 'Records'

export default Records;
