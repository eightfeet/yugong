/*
 *配合jss设置class
 */
 export const setClass = (targetId: string, userClass: string) => {
    const rootDom = document.getElementById(targetId);
    if (rootDom) {
        rootDom.className = userClass;
    }
};

