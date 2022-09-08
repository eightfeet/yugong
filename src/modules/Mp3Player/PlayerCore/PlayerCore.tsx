import * as React from 'react';
import { Howl, Howler, HowlOptions } from 'howler';
import s from './PlayerCore.module.less';
import deepEqual from 'deep-equal';

export interface IPlayerCoreProps {
  config: HowlOptions;
  getPlayer?: (player: Howl) => {}
}

export interface IPlayerCoreState {
  status?: 'playing' | 'stop' | 'pause';
}

export default class PlayerCore extends React.Component<IPlayerCoreProps, IPlayerCoreState> {
  player: Howl | undefined;
  constructor(props: IPlayerCoreProps){
    super(props);
    this.state = {
      status: undefined
    }
  }
  componentDidMount() {
    this.createPlayer();
  }

  componentWillUpdate(nextProps: IPlayerCoreProps) {
    const { config } = nextProps;
    if (!deepEqual(config, this.props.config)) {
      this.createPlayer();
    }
  }

  componentWillUnmount() {
    this.player?.stop();
    this.player?.unload();
  }

  createPlayer = () => {
    const { config } = this.props;
    if (config && config.src?.length) {
      this.player?.stop();
      this.player?.unload();
      this.player = new Howl({
        ...config,
        html5: true,
        // 有设置自动播放时强制执行
        onplayerror: () => {
          if (config?.autoplay) {
            this.player?.once('unlock', () => {
              this.player?.stop();
              this.player?.play();
            });
          }
        },
      });

      this.props.getPlayer?.(this.player)
    }
  }

  public render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
