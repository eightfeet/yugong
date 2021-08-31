import { ForwardRefExoticComponent, RefAttributes, useCallback, useEffect, useRef } from 'react';
import {
    Game as BoxRoulette,
    GameConfigType as BoxRouletteConfig,
} from '@byhealth/lottery/dist/games/BoxRoulette';
import { Game as Roulette, GameConfigType as RouletteConfig } from '@byhealth/lottery/dist/games/Roulette';
import { Game as FlipCard, GameConfigType as FlipCardConfig } from '@byhealth/lottery/dist/games/FlipCard';
import { Game as SlotMachine, GameConfigType as SlotMachineConfig } from '@byhealth/lottery/dist/games/SlotMachine';
import { Game as Dice, GameConfigType as DiceConfig } from '@byhealth/lottery/dist/games/Dice';
import { Game as TreasureBox, GameConfigType as TreasureBoxConfig } from '@byhealth/lottery/dist/games/TreasureBox';
import { Game as RedEnvelope, GameConfigType as RedEnvelopeConfig } from '@byhealth/lottery/dist/games/RedEnvelope';
import { Game as Case, GameConfigType as CaseConfig } from '@byhealth/lottery/dist/games/Case';

import loadScript from '~/core/loadScript';

/**获取gameref,包含游戏与中奖记录方法 */
export type GameHandle<T> = T extends ForwardRefExoticComponent<
    RefAttributes<infer T2>
>
    ? T2
    : never;

export interface GameConfigMap {
    boxroulette: BoxRouletteConfig;
    roulette: RouletteConfig;
    flipcard: FlipCardConfig;
    slotmachine: SlotMachineConfig;
    treasurebox: TreasureBoxConfig;
    dice: DiceConfig;
    case: CaseConfig;
    redenvelope: RedEnvelopeConfig;
}

export interface GameMap {
    boxroulette: BoxRoulette;
    roulette: Roulette;
    flipcard: FlipCard;
    slotmachine: SlotMachine;
    treasurebox: TreasureBox;
    dice: Dice;
    case: Case;
    redenvelope: RedEnvelope;
}

export type GameType = keyof GameConfigMap;

const useGame = <T extends GameType>(
    type: T,
    params: GameConfigMap[T],
) => {
    const targetNode = useRef<HTMLElement | null>();
    const game = useRef<GameMap[T]>();
    const lottery = require(`@byhealth/lottery/dist/lib/${type}`);

    loadScript('https://upload-yyj.by-health.com/frond-cdn/region/regions.js');
    const createGame = useCallback(
        (params) => {
            if (!!Array.isArray(params.prizes)) {
                return new lottery.Game({...params, onInit: () => {
                    console.log('创建', game.current);

                }});
            }
        },
        [lottery.Game],
    );

    useEffect(() => {
        if (targetNode.current) {
            game.current = createGame(params);
        }
        return () => {
            if (game.current) {
                // 销毁地址选择
                game.current?.core?.AddressModal?.AddressPicker?.destroy();
                // 销毁游戏
                game.current?.core?.destroy();
            }
        };
    }, [createGame, params, targetNode]);
    const gameArray: [React.MutableRefObject<GameMap[T] | undefined>, React.MutableRefObject<HTMLElement | null | undefined>] = [game, targetNode]
    return gameArray;
};


export default useGame;
