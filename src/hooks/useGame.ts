import { useEffect, useRef } from "react";
import {Game} from '@byhealth/lottery/dist/games/Roulette';
const routter = require('@byhealth/lottery/dist/lib/roulette');

interface Params {
    [keys: string]: any
}

const useGame = (params: Params): [Game, any] => {
    const targetNode = useRef<HTMLElement>();
    const game = useRef<any>();
    useEffect(() => {
        if (targetNode.current) {
            game.current = new routter.Game(params);

            (window as any).game = game.current;
        }
        return () => {
            if (game.current) {
                game.current?.distory()
            }
        }
    }, [params, targetNode])
    return [game.current, targetNode]
}

export default useGame;