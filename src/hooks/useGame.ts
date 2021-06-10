import { useCallback, useEffect, useRef } from "react";
import {Game} from '@byhealth/lottery/dist/games/Roulette';
import loadScript from "~/core/loadScript";
const routter = require('@byhealth/lottery/dist/lib/roulette');

interface Params {
    [keys: string]: any
}

const useGame = (params: Params): [Game, any] => {
    const targetNode = useRef<HTMLElement>();
    const game = useRef<any>();
    
    loadScript("https://upload-yyj.by-health.com/frond-cdn/region/regions.js");
    const createGame = useCallback(
        (params) => {
            if (!!Array.isArray(params.prizes)) {
                game.current = new routter.Game(params);
            }
        },
        [],
    )

    useEffect(() => {
        if (targetNode.current) {
            createGame(params);
        }
        return () => {
            if (game.current) {
                game.current?.distory()
            }
        }
    }, [createGame, params, targetNode])
    console.log('gameParames', (window as any).game = game.current);
    return [game.current, targetNode]
}

export default useGame;