import theme from './../publicTheme';

theme.GameTheme = {
    wrap: {
        zIndex: 10,
    },
    cardWrap: {
        padding: '0',
    },
    cardInside: {
        backgroundColor: 'transparent',
        borderRadius: '0.2em',
    },
    cardCover: {
        borderRadius: '0.2em',
        backgroundImage: "url('./assets/flip/mailprize.png')",
        backgroundSize: '100% 100%',
        backgroundColor: 'transparent',
    },
    cardSelected: {
        backgroundImage: "url('./assets/flip/mailprizeselected.png')",
        backgroundSize: '100% 100%',
        backgroundColor: 'transparent',
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
        color: '#666',
        fontSize: '0.8em',
    },
};

export default theme;
