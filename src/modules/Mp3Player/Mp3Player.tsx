
import { Component } from 'react';
import { connect } from 'react-redux';
import { Howl, Howler, HowlOptions } from 'howler';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Mp3Player.config';
import createStyles, { ClassesKey } from './Mp3Player.createStyles';
import { AnyObjectType, ArgumentsItem } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';

class Mp3Player extends Component<Mp3PlayerProps, State> {
  player: Howl | undefined;
  constructor(props: Mp3PlayerProps) {
    super(props)
    this.state = {
      configs: undefined
    }
  }

  componentDidMount() {
    this.props.registersFunction({
      setPlayer: this.setPlayer
    })
    this.props.eventDispatch().mount()
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
  }

  componentDidUpdate(previousProps: AnyObjectType, previousStates: AnyObjectType) {
    const { configs } = previousStates;
    if (configs) {
      this.player?.unload()
      this.player = new Howl(configs);
      this.player.play();
    }
  }

  setPlayer = (params: ArgumentsItem) => {
    const configs = getArgumentsItem(params) as HowlOptions;
    this.setState({ configs });
  }

  render() {
    const { classes } = this.props;
    return (
      <Wrapper {...this.props}>
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
  configs?: HowlOptions;
}

// typeof Props
type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>

export type Mp3PlayerProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<Mp3PlayerProps>(Mp3Player, config, createStyles))
