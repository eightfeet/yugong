import * as compiler from './compiler';
import { StyleItemsTypes, AnimationTypesOfStyleItems } from '~/types/appData';
import React from 'react';
import { createDraft, finishDraft } from 'immer';

function handlerAnimation(
  animation: AnimationTypesOfStyleItems,
  // 是否进入视区
  inView?: boolean,
): AnimationTypesOfStyleItems {
  const animationDraft = createDraft(animation);
  // 动画元素是否有视觉区域观察者
  // 或者有视觉区域观察者但动画没有设置元素可视时播放时
  // 直接返回动画
  if (inView === void 0 || animationDraft.animationPlayInView !== true)
    return finishDraft(animationDraft);

  // 离开视区时移除动画, 将内容做隐藏处理
  const initAnimate: AnimationTypesOfStyleItems = {
    animationName: 'initanimate',
    animationDuration: 100,
    animationIterationCount: 1,
    animationPlayState: 'paused',
  };
  if (inView === false) {
    return initAnimate;
  }

  // 有视觉区域观察者
  const animationData = finishDraft(animationDraft);
  return animationData;
}

function handler(
  styleGroup: StyleItemsTypes,
  inView?: boolean,
): {
  style: React.CSSProperties;
  strStyle: string;
} {
  if (Object.prototype.toString.call(styleGroup) !== '[object Object]')
    return { style: {}, strStyle: '' };
  const descriptionKeys = [
    'display',
    'backgroundGroup',
    'backgroundCommon',
    'backgroundGradient',
    'border',
    'boxShadow',
    'textShadow',
    'font',
    'transform',
    'animation',
  ];
  const compiledResult = {
    style: {},
    strStyle: '',
  };

  const stringResult: any[] = [];

  for (let index = 0; index < descriptionKeys.length; index++) {
    const descriptionKey = descriptionKeys[index];
    const styleObj = styleGroup[descriptionKey];
    if (
      (Object.prototype.toString.call(styleObj) !== '[object Object]' ||
        Object.keys(styleObj).length < 1) &&
      Object.prototype.toString.call(styleObj) !== '[object Array]'
    ) {
      continue;
    }

    let generateStyle: {
      result: React.CSSProperties;
      string: string;
    } = {
      result: {},
      string: '',
    };
    switch (descriptionKey) {
      case 'display':
        generateStyle = compiler.display(styleObj);
        break;
      case 'backgroundGroup':
        generateStyle = compiler.backgroundGroup(styleObj);
        break;
      // case "backgroundGradient":
      //   generateStyle = compiler.backgroundGradient(styleObj);
      //   break;
      // case "backgroundCommon":
      //   generateStyle = compiler.backgroundCommon(styleObj);
      //   break;
      case 'border':
        generateStyle = compiler.border(styleObj);
        break;
      case 'boxShadow':
        generateStyle = compiler.boxShadow(styleObj);
        break;
      case 'textShadow':
        generateStyle = compiler.textShadow(styleObj);
        break;
      case 'font':
        generateStyle = compiler.font(styleObj);
        break;
      case 'transform':
        generateStyle = compiler.transform(styleObj);
        break;
      case 'animation':
        const data = handlerAnimation(styleObj, inView);
        generateStyle = compiler.animation(data);
        break;
      default:
        break;
    }
    compiledResult.style = { ...compiledResult.style, ...generateStyle.result };
    stringResult.push(generateStyle.string);
  }
  compiledResult.strStyle = stringResult.join(' ');
  return compiledResult;
}

export default handler;
