import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import MessageAlert from './MessageAlert';

class Message {
    MessageNode: HTMLDivElement;
    msgRef: React.RefObject<any>;
    constructor() {
        this.MessageNode = document.createElement('div');
        document.body.appendChild(this.MessageNode);
        this.msgRef = createRef();
        ReactDOM.render(<MessageAlert ref={this.msgRef} />, this.MessageNode);
    }

    /**
     * create
     */
    public create(message: JSX.Element | string) {
        this.msgRef.current?.show(message)
    }
}

export default new Message();
