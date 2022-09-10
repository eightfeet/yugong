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
import { OnPlayType, PlayerCorePlayList } from './PlayerCore/PlayerCore';
import MemoPause from './icons/Pause';
import MemoPlay from './icons/Play';
import MemoNext from './icons/Next';
import MemoPrev from './icons/Prev';
import MemoTrack from './icons/Track';
import classNames from 'classnames';

class Mp3Player extends Component<Mp3PlayerProps, State> {
  player: PlayerCore | undefined;
  constructor(props: Mp3PlayerProps) {
    super(props);
    this.state = {
      title: undefined,
      duration: undefined,
      configs: undefined,
      playList: undefined,
      progress: undefined,
      isPlaying: false,
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
      playList,
      onPlay: this.onPlay,
      onProgress: this.onProgress,
      onPause: this.onPause
    });
  };

  play = (index: ArgumentsItem) => {
    const No = getArgumentsItem(index) as number;
    this.player?.play(No || this.player.index)
  }

  onPlay: OnPlayType = ({ title, duration }) => {
    this.setState({ title, duration, isPlaying: true})
  }

  onPause = () => this.setState({ isPlaying: false })

  onProgress = (progress: number) => {
    this.setState({ progress })
  }

  render() {
    const { classes } = this.props;
    const { configs, duration, title, progress, isPlaying } = this.state;
    
    const pre = Math.ceil(progress! / duration! * 100);
    if (!configs) return null;
    return (
      <Wrapper {...this.props} maxWidth maxHeight>
        <div className={classNames(s.wrap, classes.wrap)}>
          <div className={classNames(s.player, classes.toolbar)}>
            <div className={classNames(s.prev, classes.prev)} onClick={() => this.player?.skip('prev')}>
              <MemoPrev />
            </div>
            {!isPlaying ? <div className={classNames(s.play, classes.play)} onClick={() => this.player?.play()}>
              <MemoPlay />
            </div> :
              <div className={classNames(s.pause, classes.pause)} onClick={() => this.player?.pause()}>
                <MemoPause />
              </div>}
            <div className={classNames(s.next, classes.next)} onClick={() => this.player?.skip('next')}>
              <MemoNext />
            </div>
            {/* <div className={s.player} onClick={() => this.player?.volume(0.1)}>
            音量
          </div>
          <div className={s.player} onClick={() => this.player?.seek(0.5)}>
            跳到
          </div> */}
          </div>
          {isPlaying ? <div className={classNames(s.info, classes.info)}>
            <div className={classNames(s.progresswrap, classes.progress)}>
              <MemoTrack width={pre || 0} />
              {/* <div className={s.progress} style={{ width: `${progress! / duration! * 100}%` }} /> */}
            </div>
            <h3 className={classes.title}>{title}</h3>
            <p className={classes.time}>{`${progress ? `${this.player?.formatTime(progress)}/` : ''}`}{this.player?.formatTime(duration!)}</p>
          </div> : null}
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
  playList?: PlayerCorePlayList[];
  title?: string;
  duration?: number;
  progress?: number;
  isPlaying?: boolean;
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
