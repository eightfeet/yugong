import { forwardRef, Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class MessageAlert extends Component<
    {},
    {
        vertical: 'top' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
        open: boolean;
        message: string;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            open: false,
            vertical: 'top',
            horizontal: 'center',
            message: '',
        };
    }
    show = (message: string) => {
        this.setState({
            open: true,
            message,
        });
    };
    hide = () => {
        this.setState({
            open: false,
            message: '',
        });
    };
    render() {
        const { vertical, horizontal, open, message } = this.state;
        return (
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={this.hide}
                message={message}
                key={vertical + horizontal}
            />
        );
    }
}

export default forwardRef((_, ref) => {
    return <MessageAlert ref={ref as any} />;
});
