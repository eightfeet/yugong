import { Howl } from 'howler';

export interface PlayerCorePlayList {
  title: string;
  file: string;
  howl: Howl | undefined;
}

export interface PlayerCoreParameTers {
  playList: PlayerCorePlayList[];
}

class PlayerCore {
  playList: PlayerCorePlayList[];
  index = 0;
  constructor(parameters: PlayerCoreParameTers) {
    this.playList = parameters.playList;
  }

  public play = (index: number) => {
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
        onplay: () => { },
        onload: () => { },
        onend: () => {
          this.skip('next');
        },
        onpause: () => { },
        onstop: () => { },
        onseek: () => { console.log(1111);},
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
    const { playList, index } = this;
    const sound = playList[index].howl;
    const seek = sound?.seek() || 0;
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
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

}

export default PlayerCore;
