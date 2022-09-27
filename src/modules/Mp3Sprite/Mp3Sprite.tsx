import { Component } from 'react';
import { connect } from 'react-redux';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Mp3Sprite.config';
import createStyles, { ClassesKey } from './Mp3Sprite.createStyles';
import { ArgumentsItem } from '~/types/appData';
import { getArguments, getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import s from './Mp3Sprite.module.less';
import MemoPause from './icons/Pause';
import MemoPlay from './icons/Play';
import MemoNext from './icons/Next';
import MemoPrev from './icons/Prev';
import MemoTrack from './icons/Track';
import classNames from 'classnames';
import MemoCD from './icons/CD';
import { Howl } from 'howler';

interface playListItem {
  name: string,
  start: number,
  duration: number,
}

class Mp3Sprite extends Component<Mp3SpriteProps, State> {
  player: Howl | undefined;
  constructor(props: Mp3SpriteProps) {
    super(props);
    this.state = {
      title: undefined,
      duration: undefined,
      playList: undefined,
      progress: undefined,
      nowTime: undefined,
      isPlaying: false,
      isLoaded: false,
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.props.registersFunction({
      setPlayData: this.setPlayData,
      play: this.play,
      stop: this.stop,
    });
    this.props.eventDispatch().mount();
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
  }

  setPlayData = (...args: ArgumentsItem[]) => {
    const { mp3address, sprite } = getArguments(args) as {
      mp3address: string;
      sprite: playListItem[]
    }

    const spriteObj = {};
    sprite.forEach(element => {
      if (element.name) {
        spriteObj[element.name] = [element.start || 0, element.duration || 0]
      }
    });

    this.setState({ playList: sprite });
    this.player?.unload();
    this.player = new Howl({
      src: [mp3address],
      sprite: spriteObj,
      onplay: (e) => {
        requestAnimationFrame(this.step)
      },
      onend: (e) => {
        this.setState({ isPlaying: false })
      },
      onload: () => {
        const duration = Math.round(this.player?.duration() || 0) * 1000;
        this.setState({ duration })
      }
    });
  };

  step = () => {
    const { playList, currentIndex } = this.state;
    const item = playList?.[currentIndex]
    const howl = this.player;
    // Determine our current seek position.
    const seek = (howl?.seek() || 0) * 1000;
    const t = Math.round(seek) - (item?.start || 0);
    const spriteLength = Math.round((t / (item?.duration || 1) * 100));
    this.setState({ progress: spriteLength, nowTime: Math.round(seek) });
    // If the sound is still playing, continue stepping.
    if (howl?.playing()) {
      requestAnimationFrame(this.step);
    }
  }

  stop = () => {
    this.player?.stop();
    this.setState({ isPlaying: false })
  }

  play = (spriteName: ArgumentsItem) => {
    const sprite = getArgumentsItem(spriteName) as string;
    const { playList } = this.state;
    let index = -1;
    playList?.some((item, ind) => {
      const current = item.name === sprite;
      if (current) index = ind
      return current
    })
    if (index >= 0) {
      this.onItemPlay(index)();
    }
  }

  onPause = () => this.setState({ isPlaying: false })

  onItemPlay = (index: number) => () => {
    const { playList } = this.state;
    if (playList?.length) {
      let currentIndex = index < 0 ? playList.length - 1 : index >= playList.length ? 0 : index;
      this.player?.stop();
      this.player?.play(playList[currentIndex].name);
      this.setState({ currentIndex, isPlaying: true })
    }
  }

  handlePause = () => {
    this.player?.pause();
    this.setState({ isPlaying: false })
  }

  formatTime = (secs: number): string => {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    const { classes } = this.props;
    const { isPlaying, playList, currentIndex, duration, progress, nowTime } = this.state;

    return (
      <Wrapper {...this.props} maxWidth maxHeight>
        <div className={classNames(s.wrap, classes.wrap)}>
          <h3 className={classNames(s.title, classes.title)}>{duration ? `音频总长度${duration}ms` : ''}</h3>
          <div className={classNames(s.player, classes.toolbar)}>
            <div className={classNames(s.prev, classes.prev)} onClick={this.onItemPlay((currentIndex || 0) - 1)}>
              <MemoPrev />
            </div>
            {!isPlaying ? <div className={classNames(s.play, classes.play)} onClick={this.onItemPlay(currentIndex)}>
              <MemoPlay />
            </div> :
              <div className={classNames(s.pause, classes.pause)} onClick={this.handlePause}>
                <MemoPause />
              </div>}
            <div className={classNames(s.next, classes.next)} onClick={this.onItemPlay((currentIndex || 0) + 1)}>
              <MemoNext />
            </div>
          </div>
          <div className={classes.info}>
            <div className={classNames(s.progresswrap, classes.progress)}>
              <div className={s.progress}>
                <MemoTrack width={progress || 0} />
              </div>
              <div className={s.progressnum}>
                <span>
                  {nowTime || playList?.[currentIndex]?.start || 0}ms
                </span>
                <span>
                  {(playList?.[currentIndex]?.start || 0) + (playList?.[currentIndex]?.duration || 0)}ms
                </span>
              </div>
            </div>
            {playList?.length ? <div className={classNames(s.list, classes.list)}>
              {
                playList?.map((item, index) => <div className={s.item} key={index} onClick={this.onItemPlay(index)}>
                  <p className={classNames({
                    [classes.item]: true,
                    [s.current]: index === currentIndex,
                    [classes.currentitem]: index === currentIndex,
                  })}>
                    <span>
                      <MemoCD animate={index === currentIndex && !!isPlaying} />
                    </span>
                    {item.name}
                  </p>
                </div>)
              }
            </div> : null}
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
  playList?: playListItem[];
  title?: string;
  duration?: number;
  progress?: number;
  isPlaying?: boolean;
  isLoaded?: boolean;
  nowTime?: number;
  currentIndex: number
};

// typeof Props
type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export type Mp3SpriteProps = ModuleBaseProps<
  { [keys in ClassesKey]: string },
  { [keys in ExposeEventsKeys]: Function }
> &
  StateProps &
  DispatchProps;

export default connect(
  mapState,
  mapDispatch,
)(PresetModule<Mp3SpriteProps>(Mp3Sprite, config, createStyles));
