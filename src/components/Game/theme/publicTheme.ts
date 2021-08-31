import React from 'react';
import closeIcon from './icon-close.png';

const rem = (px: number) => {
    return `${px / 31.25}rem`;
};

export interface ThemeItem {
    [keys: string]: React.CSSProperties | (React.CSSProperties | string)[];
}
/**弹窗蒙层*/
export const overlay: React.CSSProperties = { backgroundColor: 'rgba(225,0,0,0.5)' };
/**弹窗内容 */
export const content: React.CSSProperties = {
    borderRadius: rem(30),
    backgroundColor: '#fbead3',
    width: rem(613),
    backgroundSize: `100% auto`,
    backgroundRepeat: 'no-repeat',
    border: `${rem(5)} solid #f4c070`,
    boxShadow: `inset 0px 0px 0px ${rem(13)} #fbead3, inset 0px 0px 0px ${rem(14)} rgba(268, 205, 182, 0.8)`,
}
/**关闭按钮 */
export const close: React.CSSProperties = {
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${closeIcon})`,
    backgroundSize: '100% 100%',
    height: rem(55),
    width: rem(55),
    zIndex: 101,
    position: 'absolute',
    left: '50%',
    marginLeft: rem(-28),
    top: 'auto',
    bottom: rem(-99),
}
/**弹窗头部 */
export const header: React.CSSProperties = {
    fontSize: rem(32),
    fontWeight: 'bold',
    paddingTop: rem(40),
    border: 0,
    margin: 0,
}
/**提交按钮 */
export const submit: React.CSSProperties = {
    backgroundColor: '#ff5050',
    backgroundSize: '100% 100%',
    fontSize: rem(32),
    fontWeight: 'bold',
    width: rem(362),
    height: rem(102),
    border: `${rem(5)} solid #fff`,
    borderRadius: rem(60),
    color: '#ffffff'
}
/**弹窗底部 */
export const footer: React.CSSProperties = {
    position: 'relative',
    padding: `0 0 ${rem(38)} 0`,
    zIndex: 120,
}
/**地址弹窗 */
export const AddressModalTheme: ThemeItem = {
    overlay: overlay,
    article: {padding: `0 ${rem(49)}`},
    content,
    close,
    header,
    submit,
    footer,
    row: {
        justifyContent: 'center',
        marginBottom: rem(19),
    },
    label: {
        color: '#666666',
        display: 'none !important'
    },
    input: {
        borderRadius: rem(12),
        border: 'none',
        height: rem(87),
        backgroundColor: '#fff',
        color: '#666666',
        boxSizing: 'border-box',
        padding: rem(20),
    },
    textarea: {
        borderRadius: rem(12),
        border: 'none',
        backgroundColor: '#fff',
        color: '#666666',
        boxSizing: 'border-box',
        padding: rem(25),
        minHeight: rem(150),
        marginBottom: rem(21),
    },
};
/**成功弹窗 */
export const SuccessModalTheme: ThemeItem = {
    overlay,
    content,
    close,
    submit,
    article: {
        paddingTop: rem(350),
        position: 'relative',
    },
    prizeAlias: {},
    prizeName: {
        textAlign: 'center',
        padding: `0 ${rem(20)}`,
        marginBottom: rem(20),
    },
    prizeImg: {
        top: 0,
        marginTop: rem(55),
        position: 'absolute',
        width: rem(225),
        marginLeft: rem(-245/2),
        left: '50%',
        boxSizing: 'content-box',
        padding: rem(10),
        backgroundSize: '100% 100%',
        backgroundColor: '#fff',
        borderRadius: rem(20)
    },
    memo: {
        marginBottom: rem(30),
        fontSize: '.9em',
        width: '100%',
        color: '#999999',
    },
    footer
}
/**弱提示信息 */
export const MessageTheme: ThemeItem = {
    wrap: {
        top: rem(100),
    },
    main: {
        backgroundColor: 'rgba(255, 0, 0, 1)',
        padding: rem(20),
        borderRadius: rem(10)
    },
}
/**未中奖弹窗 */
export const FailedModalTheme: ThemeItem = {
    // overlay,
    modalTitle: {
        fontSize: '1em',
        fontWeight: 'bolder',
    },
    content: content,
    contentTop: {
        top: 0,
        height: '5em',
        width: '100%',
        backgroundImage:
            'url(http://by-health-portal2.oss-cn-beijing.aliyuncs.com/images/20190415152440501.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
    },
    contentBottom: {
        bottom: 0,
        height: '5em',
        width: '100%',
        backgroundImage:
            'url(http://by-health-portal2.oss-cn-beijing.aliyuncs.com/images/20190415152556010.png)',
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
    },
    close,
    submit,
    article: {
        paddingTop: '12em',
        position: 'relative',
    },
    footer,
    prizeAlias: {},
    prizeName: {
        textAlign: 'center',
        padding: '0 1em',
        marginBottom: '0.3em',
    },
    prizeImg: {
        top: 0,
        position: 'absolute',
        marginTop: '1em',
        width: '8em',
        marginLeft: '-5.2em',
        left: '50%',
        boxSizing: 'content-box',
        padding: '1.2em',
        backgroundImage:
            'url(http://by-health-portal2.oss-cn-beijing.aliyuncs.com/images/20190415154500464.png)',
        backgroundSize: '100% 100%',
    },
    memo: {
        marginBottom: '1.2em',
        fontSize: '.8em',
        width: '100%',
        color: '#999',
    },
    modify: [],
}
/**loading */
export const LoadingTheme = {
    overlay: {
        backgroundColor: 'transparent',
    },
    content: {
        backgroundColor: 'transparent',
    },
    vertices: {
        backgroundColor: '#8bc34a',
        width: '.4em',
        height: '.4em',
    },
    verticesColors: ['red', 'green', 'blue', 'yellow', 'orange'],
}
/**消息弹窗 */
export const NoticeModalTheme: ThemeItem = {
    overlay,
    content,
    close,
    header: {
        fontSize: rem(32),
        fontWeight: 'bold',
        paddingTop: rem(60),
    },
    submit,
}

const theme: {
    [keys: string]: ThemeItem
} = {
    FailedModalTheme,
    NoticeModalTheme,
    SuccessModalTheme,
    AddressModalTheme,
    MessageTheme,
    LoadingTheme,
};

export default theme;
