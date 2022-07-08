
import { Component, LegacyRef } from 'react';
import { connect } from 'react-redux';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './VideoPlayer.config';
import createStyles, { ClassesKey } from './VideoPlayer.createStyles';
import ReactPlayer from 'react-player';

class VideoPlayer extends Component<VideoPlayerProps, State> {
  ref: LegacyRef<ReactPlayer> | undefined;
  constructor(props: VideoPlayerProps) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.props.registersFunction({
      handleClick: this.handleClick
    })
    this.props.eventDispatch().mount()
    this.props.setRunningTimes({ text: 'runningTimeData' })
    console.log(this.ref);
    
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
  }

  handleClick = (text: ArgumentsString) => {
    const getState = getArgumentsItem(text);
    this.setState({ text: getState as string })
  }

  render() {
    const { classes } = this.props;
    return (
      <Wrapper {...this.props}>
        <div onClick={() => this.props.eventDispatch().click()}>
        <ReactPlayer
          ref={this.ref}
          className='react-player'
          url='http://1253730514.vod2.myqcloud.com/e9192d86vodtransgzp1253730514/a04bd9d13701925921951648578/v.f100030.mp4'
          width='100%'
          height='100%'
          playing={true}
        />
        </div>
      </Wrapper>
    )
  }
}

const mapState = (state: RootState) => ({
  runningTimes: state.runningTimes,
})

const mapDispatch = (dispatch: Dispatch) => ({
  setRunningTimes: dispatch.runningTimes.setRunningTimes,
})

// typeof State
type State = {
  text: string
}

// typeof Props
type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>

export type VideoPlayerProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<VideoPlayerProps>(VideoPlayer, config, createStyles))
