import { useEffect, useRef } from 'react';

function useSafeCallback<T>(fn: T) {
    const ref = useRef<T>(fn);
    useEffect(() => {
        ref.current = fn;
    }, [fn]);
    return ref;
}

export default useSafeCallback;
