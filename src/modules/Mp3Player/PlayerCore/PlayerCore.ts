import { Howl } from 'howler';

interface PlayerCorePlayList {
  title: string;
  file: string;
  howl: Howl | undefined;
}

interface PlayerCoreParameTers {
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
        onplay: () => {},
        onload: () => {},
        onend: () => {},
        onpause: () => {},
        onstop: () => {},
        onseek: () => {},
      });
    }
    // Begin playing the sound.
    sound.play();
  };

  /**
   * pause
   */
  public pause = () => {
    this.playList[this.index].howl?.pause();
  };

  /**
   * skipTo
   */
  public skipTo = () => {
    const { playList, index } = this;
    // Stop the current track.
    if (playList[index].howl) {
      playList[index].howl?.stop();
    }
    // Play the new track.
    this.play(index);
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
