
import { Component } from 'react';
import { connect } from 'react-redux';
import PresetModule from '~/components/PresetModule';
import { ClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config from './ClassModuleTpl.config';
import createStyles from './ClassModuleTpl.createStyles';


type ClassesKey = 'style1' | 'style2';
type EventsKey = 'click';

type State = {
  text: string
}

class ClassModuleTpl extends Component<ClassModuleTplProps, State> {
  constructor(props: ClassModuleTplProps) {
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
          <br />
          &nbsp;
          <span style={{ display: 'inline-block' }} className={classes.style1}>
            style1<br />
            &nbsp;
            <span style={{ display: 'inline-block' }} className={classes.style2}>
              style2
            </span>
            &nbsp;
            <br />
            &nbsp;{this.props.runningTimes.text}&nbsp;
            <br />
            {this.state.text}
            <br />
            &nbsp;
          </span>
          &nbsp;
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


type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>

export type ClassModuleTplProps = ClassModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in EventsKey]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<ClassModuleTplProps>(ClassModuleTpl, config, createStyles))
