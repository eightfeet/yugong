import theme from './../publicTheme';

theme.GameTheme = {
    wrap: {
        backgroundColor: '#efefef',
    },
    // 显示活动信息按钮
    showGameInfoButton: {
        display: 'none'
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
    // 对照标签
    gameInfoPrizeTag: {
        color: 'green',
    },
    dice: {
        width: '5em',
        height: '5em',
        left: '40vw',
        top: '40vw',
    },
    side: {
        backgroundColor: '#4caf50',
        boxShadow: 'inset 0 0 0.4em #0fa40f',
    },
    dot: {
        backgroundColor: '#fff',
        boxShadow: 'inset 0.2em 0 0.2em rgba(0,0,0,0.1)',
    },
    modify: [],
};

export default theme;
