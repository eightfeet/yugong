import theme from './../publicTheme'

theme.GameTheme = {
    wrap: {
        zIndex: 10,
    },
    gameImg: {
        fontSize: 'normal',
        height: '70%',
    },
    prize: {
        background: '#eee',
    },
    activated: {
        borderColor: 'green',
    },
    prizeAlias: {
        fontSize: '1em',
    },
    lotteryButton: {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        backgroundImage:
            'url(http://by-health-portal2.oss-cn-beijing.aliyuncs.com/images/20190418151025381.png)',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '80% 80%',
    },
    modify: [{
        width: '1px'
    }]
}

export default theme;
