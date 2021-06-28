import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useRef,
    useState,
} from 'react';

function useRefState<S>(
    initialState: S
): [S, Dispatch<SetStateAction<S>>, Readonly<MutableRefObject<S>>] {
    const refState = useRef<S>(initialState);
    const [state, setState] = useState<S>(initialState);
    const updater = useCallback((value: SetStateAction<S>) => {
        const nextState =
            typeof value === 'function'
                ? (value as (v: S) => S)(refState.current)
                : value;
        refState.current = nextState;
        setState(nextState);
    }, []);

    return [state, updater, refState];
}

export default useRefState;
