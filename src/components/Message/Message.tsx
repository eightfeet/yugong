import { Snackbar } from '@material-ui/core';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';

class Message {
    MessageNode: HTMLDivElement;
    constructor() {
        this.MessageNode = document.createElement('div');
        document.body.appendChild(this.MessageNode);
    }

    /**
     * create
     */
    public create(message?: string) {
        ReactDOM.render(
            <Snackbar open autoHideDuration={1000} message={message} />,
            this.MessageNode
        );
    }
}

export default new Message();
