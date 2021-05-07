import { useEffect, useRef } from "react";
const routter = require('@byhealth/lottery/dist/lib/roulette');

interface Params {
    [keys: string]: any
}

const useGame = (params: Params) => {
    const targetNode = useRef<HTMLElement>();
    const game = useRef<any>()
    useEffect(() => {
        game.current = new routter.Game(params)
        return () => {
            if (game.current) {
                game.current?.distory()
            }
        }
    }, [params])

    return [game.current, targetNode]
}

export default useGame;