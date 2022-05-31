import classNames from 'classnames';
import * as React from 'react';
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
import { GameProps } from './GameType';
import { Game as GameParams } from '@byhealth/lottery/dist/games/Roulette';
import loadScript from '~/core/loadScript';
import s from './Game.module.scss';
const routter = require('@byhealth/lottery/dist/lib/roulette');

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

export interface IGameProps {}

export const gametypes = [
  'boxroulette',
  'roulette',
  'flipcard',
  'slotmachine',
  'treasurebox',
  'dice',
  'case',
  'redenvelope',
];
interface Game {
  game:any
}
class Game extends React.Component<GameProps> {
  rootDom: React.RefObject<HTMLDivElement>;
  game: any;
  constructor(props: GameProps) {
    super(props);
    this.rootDom = React.createRef();
  }

  componentWillMount() {
    loadScript('https://upload-yyj.by-health.com/frond-cdn/region/regions.js');
  }
  
  componentDidMount() {
    this.game = this.createGame(this.getParams());
  }

  componentDidUpdate(prevProps: GameProps) {
    if (prevProps.prizes !== this.props.prizes) {
      this.game = this.createGame(this.getParams());
    }
  }
  
  /**
   * 开始抽奖
   */
  public gameStart = () => {
    const { prizes, start } = this.props;
    if (!prizes?.length) {
      console.error('(props) 没有奖品 prizes: Prize[]');
      return Promise.reject();
    }
    if (!start) {
      console.error('(props) 没有抽奖方法 start: () => Promise<PrizeType>');
      return Promise.reject();
    }
    return start();
  };

  /**
   * 保存地址
   */
  public gameSaveAddress = (data: any) => {
    const { saveAddress } = this.props;
    if (!saveAddress) {
      console.error(
        '(props) 没有保存地址方法 saveAddress: (data: Address) => Promise<void>',
      );
      return Promise.reject();
    } else {
      return saveAddress(data);
    }
  };

  /**
   * 
   * @returns 抽奖参数
   */
  getParams = () => {
    const {
      type,
      targetId,
      parentId,
      cardIdRequest,
      receiverInfo,
      prizes,
      onCancel,
      onEnsure,
      onShowSuccess,
      onShowFailed,
      onShowAddress,
      failedModalTitle,
      submitFailedText,
      successModalTitle,
      submitSuccessText,
      submitAddressText,
      playerPhone,
      checkVerificationCode,
      successModalAnimation,
    } = this.props;
    const theme = require(`./theme/${
      type && gametypes.includes(type) ? type : 'case'
    }`).default;

    return {
      targetId,
      parentId: parentId || 'gameparentid',
      // 填写收货地址时是否验证身份证: this.cardIdRequest = 1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
      cardIdRequest: cardIdRequest || 1,
      style: theme,
      start: this.gameStart,
      saveAddress: this.gameSaveAddress,
      receiverInfo: receiverInfo || {},
      prizes: prizes || [],
      onCancel,
      loading: {
        size: 25,
        length: 5,
        cycle: 0.5,
      },
      onEnsure,
      onShowSuccess,
      onShowFailed,
      onShowAddress,
      failedModalTitle,
      submitFailedText,
      successModalTitle,
      submitSuccessText,
      submitAddressText,
      playerPhone,
      checkVerificationCode,
      SuccessModalAnimation: successModalAnimation,
    };
  };

  /**
   * createGame
   */
  public createGame = (params: any) => {
    const { type } = this.props;
    const lottery = require(`@byhealth/lottery/dist/lib/${type}`);
    if (this.game && this.game.destroy) {
      this.game?.destroy();
    }
    if (this.rootDom.current?.innerHTML) {
      this.rootDom.current.innerHTML = '';
    }
    if (!!Array.isArray(params.prizes)) {
        return new lottery.Game({...params, onInit: () => {
            console.log('创建');
        }});
    }
}

  public render() {
    const { className, parentId } = this.props;
    return (
      <div
        id={parentId || 'gameparentid'}
        ref={this.rootDom}
        className={classNames(s.root, className)}
      />
    );
  }
}


export default Game