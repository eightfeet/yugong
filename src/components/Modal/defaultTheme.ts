import React from 'react';

function em(pixel: number) {
  return `${pixel / 31.25}em`;
}

export interface ThemeItem {
  [keys: string]: React.CSSProperties | (React.CSSProperties | string)[];
}
/**弹窗蒙层*/
export const overlay: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.7)',
  left: 0,
  right: 0,
  top: 0,
  bottom: 'unset',
  // hack ios
  height: '120vh',
  position: 'fixed',
};
/**弹窗内容 */
export const content: React.CSSProperties = {
  borderRadius: em(20),
  width: em(613),
  marginBottom: '20vh',
};
/**关闭按钮 */
export const close: React.CSSProperties = {
  backgroundRepeat: 'no-repeat',
  backgroundImage:
    'url(https://upload-yyj.by-health.com/upload/images/1102102650905.png)',
  backgroundSize: '100% 100%',
  height: em(55),
  width: em(55),
};

/**loading */
export const LoadingTheme = {
  // 定义样式 {overlay: 覆盖层, content: 内容区, vertices: 组成节点}
  overlay,
  content: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  vertices: {
    height: '.5em',
    width: '0.1em',
    borderRadius: '1em',
    backgroundColor: 'rgba(0,0,0,0.5)',
    animationDuration: 'green', // 动画周期
    size: '1.5em',
  },
};
/**消息弹窗 */
export const MessageTheme: ThemeItem = {
  
};

export const SubmitTheme: React.CSSProperties = {
  backgroundColor: 'rgb(255, 120, 61)',
};