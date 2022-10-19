import { Component, ReactChild, ReactFragment, ReactPortal } from 'react';
import { connect } from 'react-redux';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsItem } from '~/types/appData';
import { getArguments } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import s from './VideoPlayer.module.less';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './VideoPlayer.config';
import createStyles, { ClassesKey } from './VideoPlayer.createStyles';
import ReactPlayer from 'react-player';
import classNames from 'classnames';

class VideoPlayer extends Component<VideoPlayerProps, State> {
  player: any;
  constructor(props: VideoPlayerProps) {
    super(props);
    this.state = {
      url: [],
      pip: false,
      playing: true,
      controls: true,
      light: '',
      volume: 0.8,
      muted: true,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 10,
      loop: false,
      isInit: false,
    };
  }

  componentDidMount() {
    this.props.registersFunction({
      initPlayer: this.initPlayer,
      play: this.play,
      stop: this.stop,
      pause: this.pause,
    });
    this.props.eventDispatch().mount();
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
  }

  initPlayer = (...args: ArgumentsItem[]) => {
    const data = getArguments(args) as {
      light: string;
      controls: '1' | '2';
      loop: '1' | '2';
      muted: '1' | '2';
      playing: '1' | '2';
      speed: number;
      url: string[];
      volume: number;
    };
    const { light, controls, loop, muted, playing, url, volume, speed } = data;
    this.setState(
      {
        light,
        controls: controls === '1',
        loop: loop === '1',
        muted: muted === '1',
        playing: playing === '1',
        url,
        volume,
        playbackRate: speed,
      },
      () => this.setState({ isInit: true }),
    );
  };

  load = (url: string | string[]) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleStop = () => {
    this.setState({ url: undefined, playing: false });
  };

  handleToggleControls = () => {
    const url = this.state.url;
    if (!url) return;
    this.setState(
      {
        controls: !this.state.controls,
        url: undefined,
      },
      () => this.load(url),
    );
  };

  handleToggleLight = () => {
    this.setState({ light: !this.state.light });
  };

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  handleVolumeChange = (e: { target: { value: string } }) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  handleSetPlaybackRate = (e: { target: { value: string } }) => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };

  handleOnPlaybackRateChange = (speed: string) => {
    this.setState({ playbackRate: parseFloat(speed) });
  };

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip });
  };

  handleSeekMouseDown = () => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e: { target: { value: string } }) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e: { target: { value: string } }) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state: {
    loaded: number;
    loadedSeconds: number;
    played: number;
    playedSeconds: number;
  }) => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState({ ...this.state, ...state });
    }
  };

  handlePlay = () => {
    this.setState({ playing: true }, () => {
      this.props.eventDispatch().onPlay();
    });
  };

  handleEnablePIP = () => {
    this.setState({ pip: true });
  };

  handleDisablePIP = () => {
    this.setState({ pip: false });
  };

  handlePause = () => {
    this.setState({ playing: false }, () => {
      this.props.eventDispatch().onPause();
    });
  };

  handleEnded = () => {
    this.setState({ playing: this.state.loop }, () => {
      this.props.eventDispatch().onEnded();
    });
  };

  handleDuration = (duration: number) => {
    this.setState({ duration });
  };

  handleOnReady = () => this.props.eventDispatch().onReady();
  handleOnError = () => this.props.eventDispatch().onError();
  handleOnStart = () => this.props.eventDispatch().onStart();

  renderLoadButton = (
    url: string,
    label:
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined,
  ) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = (player: ReactPlayer) => {
    this.player = player;
  };

  play = () => {
    try {
      this.player.getInternalPlayer()?.play();
    } catch (error) {
      console.error(error);
    }
  };

  stop = () => {
    const player = this.player.getInternalPlayer();
    try {
      player.pause();
      player.currentTime = 0;
    } catch (error) {
      console.error(error);
    }
  };

  pause = () => {
    const player = this.player.getInternalPlayer();
    try {
      player.pause();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { classes } = this.props;
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      playbackRate,
      pip,
      isInit,
    } = this.state;
    return (
      <Wrapper {...this.props} maxWidth maxHeight>
        <div className={classNames(s.playerwrap, classes.playerwrap)}>
          <div className={classes.player}>
            {isInit ? (
              <ReactPlayer
                ref={this.ref}
                width="100%"
                height="100%"
                url={url}
                pip={pip}
                playing={playing}
                controls={controls}
                light={light}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                onReady={this.handleOnReady}
                onStart={this.handleOnStart}
                onPlay={this.handlePlay}
                onEnablePIP={this.handleEnablePIP}
                onDisablePIP={this.handleDisablePIP}
                onPause={this.handlePause}
                onPlaybackRateChange={this.handleOnPlaybackRateChange}
                onEnded={this.handleEnded}
                onError={this.handleOnError}
                onProgress={this.handleProgress}
                onDuration={this.handleDuration}
              />
            ) : null}
          </div>
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
  /**视频url */
  url?: string | string[];
  pip: boolean;
  /**播放/暂停 */
  playing: boolean;
  /**显示播放器控件 */
  controls: boolean;
  /**封面图 */
  light: boolean | string;
  /**播放器音量0～1*/
  volume: number;
  /**静音播放 */
  muted: boolean;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  /**是否循环 */
  loop: boolean;
  seeking?: boolean;
  isInit: boolean;
};

// typeof Props
type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export type VideoPlayerProps = ModuleBaseProps<
  { [keys in ClassesKey]: string },
  { [keys in ExposeEventsKeys]: Function }
> &
  StateProps &
  DispatchProps;

export default connect(
  mapState,
  mapDispatch,
)(PresetModule<VideoPlayerProps>(VideoPlayer, config, createStyles));
