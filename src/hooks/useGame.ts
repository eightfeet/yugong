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

    const createGame = useCallback(
        async () => loadScript("https://upload-yyj.by-health.com/frond-cdn/region/regions.js").then(() => {
            if (!!Array.isArray(params.prizes)) {
                game.current = new routter.Game(params);
            }
        }),
        [params],
    )

    useEffect(() => {
        if (targetNode.current) {
            
            createGame();
        }
        return () => {
            if (game.current) {
                game.current?.distory()
            }
        }
    }, [createGame, params, targetNode])
    return [game.current, targetNode]
}

export default useGame;