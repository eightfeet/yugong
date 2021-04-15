import { useEffect } from "react";

const useKeyDown = (callback: () => void, keyCode: number) => {
    // 确认复制模块
    useEffect(() => {
        // 上下window都监听delete按键，对当前元素进行删除处理
        const win = (document.getElementById('wrapiframe') as HTMLIFrameElement)
            .contentWindow;
        const fn = (key: any) => {
            if (callback instanceof Function && key.keyCode === keyCode) {
                callback()
            }
        };
        if (win) {
            win.addEventListener('keydown', fn, true);
        }
        window.addEventListener('keydown', fn, true);
        return () => {
            window.removeEventListener('keydown', fn, true);
            if (win) {
                win.removeEventListener('keydown', fn, true);
            }
        };
    }, [callback, keyCode]);
}

export default useKeyDown;
