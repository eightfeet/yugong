import { useEffect, useMemo, useRef } from "react";
const routter = require('@byhealth/lottery/dist/lib/roulette');

interface Params {
    [keys: string]: any
}

const useGame = (params: Params) => {
    const targetNode = useRef<HTMLElement>();
    const game = useRef<any>();

    const exportGame = useMemo(() => game.current, [])

    useEffect(() => {
        if (targetNode.current) {
            game.current = new routter.Game(params);
        }
        return () => {
            if (game.current) {
                game.current?.distory()
            }
        }
    }, [params, targetNode])

    return [exportGame, targetNode]
}

export default useGame;