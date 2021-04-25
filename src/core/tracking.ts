/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
/* eslint-disable no-underscore-dangle */
import loadScript from './loadScript';

declare global {
  interface Window {
    _hmt: any[];
  }
}
let isTracking = false;
/**
 * 百度统计代码
 */
export const initTrack = (id:string) => {
  if (!id) return;
  window._hmt = window._hmt || [];
  window._hmt.push(['_setAutoPageview', false]);
  loadScript(`https://hm.baidu.com/hm.js?${id}`)?.then(() => {
    // 设置统计状态
    isTracking = true
  });
}

export function trackPageView(...params: any[]) {
  if (!isTracking) {
    console.warn('百度统计id未添加，请在页面 -> 百度统计 -> 统计Id，中配置并刷新页面')
    return;
  }
  if (process.env.REACT_APP_PRO !== 'true') {
    if (!params || params.length === 0) {
      console.error('PV/UV统计: 页面地址不能为空');
    } else if (params.length > 1) {
      console.warn(`PV/UV统计: ${params[0]}，其余参数将被省略`);
    } else {
      console.info(`PV/UV统计: ${params[0]}`);
    }
  }
  window._hmt.push(['_trackPageview', ...params]);
}

export function trackEvent(...params: any[]) {
  if (!isTracking) {
    console.warn('百度统计id未添加，请在页面 -> 百度统计 -> 统计Id，中配置并刷新页面')
    return;
  }
  if (process.env.REACT_APP_PRO !== 'true') {
    if (!params) {
      console.error('事件跟踪: 事件标签不能为空');
    } else if (params.length > 3) {
      console.error('事件跟踪: 事件标签数量不能超过3个');
    } else {
      console.info(`事件跟踪: ${JSON.stringify(params.slice(0, 3))}`);
    }
  }
  window._hmt.push(['_trackEvent', ...params]);
}
