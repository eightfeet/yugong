import EventEmitter from "~/core/EventEmitter";
import { AppDataElementsTypes } from "~/types/appData";
import { Modules } from "~/types/modules";
import config from "./Lottery.config";
import Wrapper from "../Wrapper";
import useLifeCycle from "~/hooks/useLifeCycle";
import useStyles from "./Lottery.useStyles";
import Game, { GameRecords } from "~/components/Game";
import { GameHandle, GameMap } from "~/components/Game/useGame";
import { useCallback, useState } from "react";
import { prizes, receiverInfo } from "./mockData";

export interface LotteryProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

const Lottery: Modules<LotteryProps> = (props) => {
  const { style, moduleId } = props;
  // inject class from jss
  // 皮肤设置样式
  const MId = `gametarget${moduleId}`;
  const userClass = useStyles(MId)(style);

  let gameHandle: GameHandle<typeof Game> | undefined = undefined;
  const setGameHandle = useCallback((ref) => {
    gameHandle = ref!;
  }, []);

  const [type, setType] = useState<keyof GameMap>("redenvelope");
  const [showRecord, setShowRecord] = useState(false);

  /**通过其他事件关联抽奖 */
  const lottery = useCallback(() => {
    gameHandle?.game.current?.core.lottery();
  }, [gameHandle]);

  /**保存地址 */
  const handleSaveAddress = useCallback(() => {
    gameHandle?.game.current?.core.AddressModal.showModal((address) => {
      console.log(address);
    });
  }, [gameHandle]);

  /**抽奖方法 */
  const start = useCallback(async () => prizes[3], []);

  /**修改抽奖类型 */
  const onChangeType = useCallback((e) => {
    setType(e.target.value);
  }, []);

  // Register events and publish functions
  const [eventsDispatch] = useLifeCycle(
    moduleId,
    // register events
    {
      mount: "初始化",
      unmount: "卸载",
    },
    // publish functions
    {}
  );

  return (
    <Wrapper {...props}>
      <Game
        parentId={`game${props.moduleId}wrap`}
        targetId={`game${props.moduleId}`}
        className={userClass.wrap}
        type={type}
        cardIdRequest={1}
        ref={setGameHandle}
        start={start}
        prizes={prizes}
        saveAddress={async (data) => console.log(data)}
        onCancel={() => console.log("取消/关闭中奖结果")}
        receiverInfo={receiverInfo}
        submitAddressText="填写地址"
        onEnsure={(data) => console.log("22222", data.prizeName)}
      />
      <GameRecords
            visible={showRecord}
            onCancel={() => setShowRecord(false)}
            okText="确定"
            title="幸运记录"
            disablePullUp={true}
            disablePullDown={false}
            onPullDown={async () => console.log()}
            onPullUp={async () => console.log()}
        >
            这里是中奖记录
        </GameRecords>
        <button onClick={() => setShowRecord(true)}>中奖记录</button>
    </Wrapper>
  );
};

// bind static
for (const key in config) {
  if (Object.prototype.hasOwnProperty.call(config, key)) {
    Lottery[key] = config[key];
  }
}

export default Lottery;
