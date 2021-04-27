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
     * Default
     */
    public default(message: JSX.Element | string) {
        this.msgRef.current?.show(message, { 
            variant: 'default'
        })
    }

    /**
     * Success
     */
     public success(message: JSX.Element | string) {
        this.msgRef.current?.show(message, { 
            variant: 'success'
        })
    }

    /**
     * Error
     */
     public error(message: JSX.Element | string) {
        this.msgRef.current?.show(message, { 
            variant: 'error'
        })
    }

    /**
     * Warning
     */
     public warning(message: JSX.Element | string) {
        this.msgRef.current?.show(message, { 
            variant: 'warning'
        })
    }

    /**
     * Info
     */
     public info(message: JSX.Element | string) {
        this.msgRef.current?.show(message, { 
            variant: 'info'
        })
    }

}

export default new Message();
