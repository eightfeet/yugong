import { Howl } from 'howler';

export interface PlayerCorePlayList {
  title: string;
  file: string;
  howl: Howl | undefined;
}

export type PlayTypeAndLoadType = ((parame: {
  title: string;
  duration: number;
}, howl: Howl) => void);

export interface PlayerCoreParameTers {
  playList: PlayerCorePlayList[];
  onPlay?: PlayTypeAndLoadType;
  onProgress?: (progress: number) => void;
  onLoad?: PlayTypeAndLoadType;
  onEnd?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}


class PlayerCore {
  playList: PlayerCorePlayList[];
  index = 0;
  onPlay: PlayTypeAndLoadType | undefined;
  onLoad: PlayTypeAndLoadType | undefined;
  onEnd: (() => void) | undefined;
  onPause: (() => void) | undefined;
  onStop: (() => void) | undefined;
  onProgress: ((progress: number) => void) | undefined;
  constructor(parameters: PlayerCoreParameTers) {
    this.playList = parameters.playList;
    this.onPlay = parameters.onPlay;
    this.onLoad = parameters.onLoad;
    this.onEnd = parameters.onEnd;
    this.onPause = parameters.onPause;
    this.onStop = parameters.onStop;
    this.onProgress = parameters.onProgress;
  }

  public play = (index?: number) => {
    index = typeof index === 'number' ? index : this.index;
    const data = this.playList[index];
    let sound: Howl | undefined = undefined;

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.file],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: () => { 
          // Display the duration.
          const duration = Math.round(sound?.duration() || 0);
          const { title, howl, } = this.playList[index!];
          const parame = {
            title,
            duration,
          }
          this.onPlay?.(parame, howl!);
          requestAnimationFrame(this.step)
          // Start updating the progress of the track.
          // requestAnimationFrame(self.step.bind(self));

        },
        onload: () => {
          // Display the duration.
          const duration = Math.round(sound?.duration() || 0);
          const { title, howl, } = this.playList[index!];
          const parame = {
            title,
            duration,
          }
          this.onLoad?.(parame, howl!);
         },
        onend: () => {
          this.skip('next');
        },
        onpause: () => this.onPause?.(),
        onstop: () => { },
        onseek: () => { },
      });
    }
    // Begin playing the sound.
    sound.play();
    this.index = index;
  };

  /**
   * pause
   */
  public pause = () => {
    this.playList[this.index].howl?.pause();
  };

  /**
   * Skip to the next or previous track.
   * @param  {String} direction 'next' or 'prev'.
   */
  public skip = (direction: 'next' | 'prev') => {
    // Get the next track based on the direction of the track.
    let index = 0;
    if (direction === 'prev') {
      index = this.index - 1;
      if (index < 0) {
        index = this.playList.length - 1;
      }
    } 

    if (direction === 'next') {
      index = this.index + 1;
      if (index >= this.playList.length) {
        index = 0;
      }
    }
    
    this.skipTo(index);
  };

  

 /**
 * Skip to a specific track based on its playlist index.
 */
  public skipTo = (nextIndex: number) => {
    const { playList, index } = this;
    // Stop the current track.
    if (playList[index].howl) {
      playList[index].howl?.stop();
    }
    // Reset progress.
    //  progress.style.width = '0%';
    // Play the new track.
    this.play(nextIndex);
  };

  /**
   * volume
   */
  public volume = (val: number) => {
    Howler.volume(val);
  }

  /**
   * seek
   */
  public seek = (per: number) => {
    const { playList, index } = this;
    const sound = playList[index].howl;
    // Convert the percent into a seek position.
    if (sound?.playing()) {
      sound.seek(sound.duration() * per);
    }
  }

  /**
   * step
   */
  public step = () => {
    const howl = this.playList[this.index].howl;
    // Determine our current seek position.
    const seek = howl?.seek() || 0;
    const t = Math.round(seek);
    this.onProgress?.(t + 1)
    // If the sound is still playing, continue stepping.
    if (howl?.playing()) {
      requestAnimationFrame(this.step);
    }
  }

  /**
   * stop
   */
  public stop() {
    const howl = this.playList[this.index].howl;
    howl?.stop();
  }

  /**
   * togglePlaylist
   */
  public togglePlaylist() {

  }

  /**
   * toggleVolume
   */
  public toggleVolume() {

  }

  /**
   * Format the time from seconds to M:SS.
   * @param  {Number} secs Seconds to format.
   * @return {String}      Formatted time.
   */
  public formatTime = (secs: number) => {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

}

export default PlayerCore;
