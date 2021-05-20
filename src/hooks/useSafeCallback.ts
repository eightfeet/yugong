import { useCallback, useEffect, useRef } from 'react';

function useSafeCallback<T extends (...args: any[]) => any>(fn?: T): T {
    const ref = useRef<T | undefined>(fn);
    const safeCallback = useCallback((...args: any[]) => {
        return ref.current?.(...args);
    }, []);
    useEffect(() => {
        ref.current = fn;
        return () => {
            ref.current = undefined;
        };
    }, [fn]);
    return safeCallback as any;
}

export default useSafeCallback;

