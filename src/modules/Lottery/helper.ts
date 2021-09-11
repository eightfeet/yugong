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