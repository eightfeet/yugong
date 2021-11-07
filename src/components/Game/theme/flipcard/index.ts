import theme from './../publicTheme';

theme.GameTheme = {
    wrap: {
        zIndex: 10,
    },
    cardWrap: {
    },
    cardInside: {
        borderRadius: '0.2em',
        backgroundColor: 'none',
    },
    cardCover: {
        borderRadius: '0.2em',
        backgroundColor: 'none',
    },
    cardSelected: {
        width: '108%',
        height: '108%',
        top: '-4%',
        left: '-4%',
        zIndex: 50,
    },
    prizeImage: {
        backgroundColor: '#fff',
        border: '1px solid #eee',
        width: '75%',
        margin: '10% auto 8% auto',
    },
    prizeTitle: {
        textAlign: 'center',
    },
};

export default theme;
