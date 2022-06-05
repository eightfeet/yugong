import classNames from 'classnames';
import React, { useMemo } from 'react';
import Game, { GameRecords, GameModal } from '~/components/Game';
import { GameProps, GameRef } from '~/components/Game/GameType';
import { RecordsProps } from '~/components/Game/Records/Records';
import s from './Lottery.module.less';
import { GameMap } from '~/components/Game/useGame';
import useStyles from './Lottery.useStyles';
interface Props extends GameProps {
  MId: string;
  game: GameProps & {
    ref: (ref: GameRef | null) => GameRef | null;
  };
  records: RecordsProps & {
    children: React.ReactNode;
  };
  rules: {
    ruleText: string[];
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
  };
  styles: {
    [key: string]: any;
  };
  type: keyof GameMap;
  moduleId: string;
}

const GameCore: React.FC<Props> = (props) => {
  const { moduleId, MId, game, records, rules, styles, type } = props;
  useStyles(moduleId, styles, type);
  const { 
    prizes, 
    start, 
    saveAddress, 
    playerPhone, 
    checkVerificationCode, 
    receiverInfo, 
    cardIdRequest, 
    failedModalTitle,
    submitFailedText,
    successModalTitle,
    submitSuccessText,
    submitAddressText,
    className  } = game;

  const memoGame = useMemo(() => {
    return <Game
      parentId={`${MId}_wrap`}
      targetId={MId}
      {...game}
    />
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    MId, 
    prizes, 
    start, 
    saveAddress, 
    playerPhone, 
    checkVerificationCode, 
    receiverInfo, 
    cardIdRequest, 
    failedModalTitle,
    submitFailedText,
    successModalTitle,
    submitSuccessText,
    submitAddressText,
    className,
  ])
  
  return (
    <>
      {memoGame}
      <GameRecords className={`${MId}_records`} id={`${MId}_records`} {...records} />
      <GameModal
        id={`${MId}_rules`}
        className={`${MId}_rules`} 
        title="活动规则"
        okText="返回抽奖"
        visible={rules.visible}
        onOk={rules.onOk}
        onCancel={rules.onCancel}
      >
        <ol className={classNames(s.rule, `${MId}_rules_list`)}>
          {rules.ruleText.map((item, key) => (
            <li className={`${MId}_rules_list_item`} key={key}>
              {item}
            </li>
          ))}
        </ol>
      </GameModal>
    </>
  );
};

export default GameCore;
