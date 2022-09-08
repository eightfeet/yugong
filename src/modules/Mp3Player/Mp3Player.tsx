import { Component } from 'react';
import { connect } from 'react-redux';
import { HowlOptions } from 'howler';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Mp3Player.config';
import createStyles, { ClassesKey } from './Mp3Player.createStyles';
import { ArgumentsItem } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import s from './Mp3Player.module.less';
import PlayerCore from './PlayerCore';
import { PlayerCorePlayList } from './PlayerCore/PlayerCore';

class Mp3Player extends Component<Mp3PlayerProps, State> {
  player: PlayerCore | undefined;
  constructor(props: Mp3PlayerProps) {
    super(props);
    this.state = {
      configs: undefined,
      status: 'stop',
      playList: undefined
    };
  }

  componentDidMount() {
    this.props.registersFunction({
      setPlayer: this.setPlayer,
      setPlayList: this.setPlayList,
      play: this.play
    });
    this.props.eventDispatch().mount();
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
  }

  setPlayer = (params: ArgumentsItem) => {
    const configs = getArgumentsItem(params) as HowlOptions;
    this.setState({ configs });
  };

  setPlayList = (params: ArgumentsItem) => {
    const playList = getArgumentsItem(params) as PlayerCorePlayList[];
    this.setState({ playList });
    this.player = new PlayerCore({
      playList
    });
  };

  play = (index: ArgumentsItem) => {
    const No = getArgumentsItem(index) as number;
    this.player?.play(No || this.player.index)
  }

  render() {
    const { classes } = this.props;
    const { status, configs } = this.state;
    if (!configs) return null;
    return ( 
      <Wrapper {...this.props}>

        <div onClick={() => this.player?.skip('prev')}>
          上一首
        </div>
        <div className={s.player} onClick={() => this.player?.play(0)}>
          播放
        </div>
        <div className={s.player} onClick={() => this.player?.pause()}>
          暂停
        </div>
        <div onClick={() => this.player?.skip('next')}>
          下一首
        </div>
        <div className={s.player} onClick={() => this.player?.volume(0.1)}>
          音量
        </div>
        <div className={s.player} onClick={() => this.player?.seek(0.5)}>
          跳到
        </div>
      </Wrapper>
    );
  }
}

const mapState = (state: RootState) => ({
  runningTimes: state.runningTimes,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setRunningTimes: dispatch.runningTimes.setRunningTimes,
});

// typeof State
type State = {
  configs?: HowlOptions;
  /**正在播放 */
  status?: 'playing' | 'stop' | 'pause';
  playList?: PlayerCorePlayList[];
};

// typeof Props
type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export type Mp3PlayerProps = ModuleBaseProps<
  { [keys in ClassesKey]: string },
  { [keys in ExposeEventsKeys]: Function }
> &
  StateProps &
  DispatchProps;

export default connect(
  mapState,
  mapDispatch,
)(PresetModule<Mp3PlayerProps>(Mp3Player, config, createStyles));
