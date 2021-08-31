import theme from './../publicTheme';

theme.GameTheme = {
    // 外框
    wrap: {
        backgroundColor: '#efefef',
    },
    // 开始按钮
    startButton: {},
    // 显示活动信息按钮
    showGameInfoButton: {
        width: '3em',
        height: '3em',
        color: 'rgba(0,0,0,0)',
        backgroundImage:
            'url(http://by-health-portal-2019.oss-cn-shenzhen.aliyuncs.com/images/20190808141018604.png)',
        backgroundSize: '100% 100%',
        borderRadius: '0.64516rem',
    },
    // 活动信息布局
    gameInfoLayout: {},
    // 活动信息外框
    gameInfoWrap: {
        paddingTop: '5em',
    },
    // 活动信息奖品单项
    gameInfoPrizeItem: {
        height: '10em',
    },
    // 活动信息单项图片
    gameInfoPrizeImg: {},
    // 活动信息奖品名称
    gameInfoPrizeName: {
        fontSize: '0.8em',
        color: 'red',
    },
    // 游戏单项
    gameItem: {},
    // 游戏奖项标题
    gamePrizeName: {
        color: 'red',
        height: '1em',
    },
    // 游戏奖项图片
    gamePrizeImg: {},
    // 游戏
    game: {},
    // 修饰层
    modify: [
        {
            top: '-1em',
            left: '-5em',
            height: '8em',
            width: '10em',
            backgroundColor: 'rgba(255,0,0, 0.5)',
        },
        {
            top: '2em',
            left: '-2em',
            height: '8em',
            width: '20em',
            backgroundColor: 'rgba(0,255,0, 0.5)',
        },
    ],
};

export default theme;
