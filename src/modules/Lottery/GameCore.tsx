import classNames from 'classnames';
import React from 'react';
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
  type: keyof GameMap
}

const GameCore: React.FC<Props> = (props) => {
  const { MId, game, records, rules, styles, type } = props;
  useStyles(MId, styles, type);
  
  return (
    <>
      <Game
        parentId={`${MId}_wrap`}
        targetId={MId}
        {...game}
      />
      <GameRecords id={`${MId}_records`} {...records} />
      <GameModal
        id={`${MId}_rules`}
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
