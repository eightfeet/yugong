import theme from './../publicTheme';

theme.GameTheme = {
    // 外框
    wrap: {},
    // 封面
    cover: {},
    // 封底
    backCover: {
        backgroundColor: '#48aff0'
    },
    // 封面文字
    coverTexts: {},
    // 封面标题
    coverTitle: {},
    // 封面次标题
    coverSubTitle: {},
    // 游戏结果
    gameResult: {},
    // 获奖名字
    gameResultPrizename: {},
    // 获奖信息
    gameResultAwardMsg: {},
    // 奖品备注
    gameResultMemo: {},
    // 确定操作按钮
    ensureBtn: {},
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
    gameInfoWrap: {},
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
};

export default theme;
