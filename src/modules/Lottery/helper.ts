import { Prize } from "@byhealth/lottery/dist/types/core";

/*
 *配合jss设置class
 */
 export const setClass = (targetId: string, userClass: string) => {
    const rootDom = document.getElementById(targetId);
    if (rootDom) {
        rootDom.className = userClass;
    }
};

/**
 * 是否图片
 * @param str string
 * @returns boolean
 */
export const isImg = (str: string) => {
    console.log(typeof str, str);
    if (typeof str !== 'string') return false;
    return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(str?.toLocaleLowerCase())
};

/**
 * 从奖品组中获取目标奖品
 * @param id 目标id
 * @param prizes 当前奖品组
 * @returns 操作奖品
 */
export const getPrizeById = (id: string | number, prizes:Prize[]): Prize | undefined => {
    let currentPrize: Prize | undefined = undefined;
      prizes.some((prize) => {
        if (prize.prizeId === id) {
          currentPrize = prize;
          return true;
        }
        return false;
      });
      return currentPrize;
}
