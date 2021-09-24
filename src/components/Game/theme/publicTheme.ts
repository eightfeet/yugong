import React from 'react';

const rem = (px: number) => {
    return `${px / 31.25}rem`;
};

export interface ThemeItem {
    [keys: string]: React.CSSProperties | (React.CSSProperties | string)[];
}
/**弹窗蒙层*/
export const overlay: React.CSSProperties = {  };
/**弹窗内容 */
export const content: React.CSSProperties = { }
/**关闭按钮 */
export const close: React.CSSProperties = {}
/**弹窗头部 */
export const header: React.CSSProperties = {}
/**提交按钮 */
export const submit: React.CSSProperties = {
}
/**弹窗底部 */
export const footer: React.CSSProperties = {}
/**地址弹窗 */
export const AddressModalTheme: ThemeItem = {
    overlay,
    article: {},
    content,
    close,
    header,
    submit,
    footer,
    row: {},
    label: {},
    input: {},
    textarea: {},
};
/**成功弹窗 */
export const SuccessModalTheme: ThemeItem = {
    overlay,
    modalTitle: {},
    content,
    contentTop: { fontStyle: 'normal' },
    contentBottom: { fontStyle: 'normal' },
    close,
    submit,
    article: {},
    prizeAlias: {},
    prizeName: {},
    prizeImg: {maxWidth: '100%'},
    memo: {},
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
    overlay,
    modalTitle: {},
    content,
    contentTop: { fontStyle: 'normal' },
    contentBottom: { fontStyle: 'normal' },
    close,
    submit,
    article: {},
    footer,
    prizeAlias: {},
    prizeName: {},
    prizeImg: {},
    memo: {},
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
    header: {},
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
