import { forwardRef, useImperativeHandle } from 'react';
import { SnackbarProvider, useSnackbar, OptionsObject } from 'notistack';
import Slide from '@material-ui/core/Slide';
import isType from '~/core/helper/isType';

function MyApp({ innerRef }: any) {
    const { enqueueSnackbar } = useSnackbar();

    const show = (message: string, options: OptionsObject) => {
        if (isType(message, 'String') && message.length) {
            console.log('options', options)
            enqueueSnackbar(message, {
                ...options,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                TransitionComponent: Slide as any,
            });
        }
    };

    useImperativeHandle(innerRef, () => ({
        show,
    }));

    return null;
}

export default forwardRef((_, ref) => {
    return (
        <SnackbarProvider maxSnack={3} >
            <MyApp innerRef={ref} />
        </SnackbarProvider>
    );
});
