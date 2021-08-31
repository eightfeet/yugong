import theme from './../publicTheme';

theme.GameTheme = {
    wrap: {
        zIndex: 10,
    },
    prizeImage: {},
    prizeTitle: {
        textAlign: 'center',
    },
    modify: [
        {
            backgroundImage:
                'url(https://upload-yyj.by-health.com/upload/images/1210144422897.png)',
            width: '25em',
            height: '49.85em',
            bottom: '-10.5em',
        },
        {
            backgroundImage:
                'url(https://upload-yyj.by-health.com/upload/images/1211151917516.png)',
            animation: 'cardflash 2s steps(1, end) infinite',
            backgroundPosition: '-500% -500%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '22500px 100%',
            width: '750px',
            height: '340px',
            top: '0',
        },
    ],
};

export default theme;
