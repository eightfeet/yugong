
import { Component } from 'react';
import { connect } from 'react-redux';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Charts.config';
import createStyles, { ClassesKey } from './Charts.createStyles';

class Charts extends Component<ChartsProps, State> {
  canvas: HTMLCanvasElement | null;
  chart: Chart | null;
  constructor(props: ChartsProps) {
    super(props)
    this.state = {
      text: ''
    }
    this.canvas = null;
    this.chart = null;
  }

  componentDidMount() {
    this.props.registersFunction({
      handleClick: this.handleClick
    })
    this.props.eventDispatch().mount()
    this.props.setRunningTimes({ text: 'runningTimeData' })
  }

  buildChart = () => {
    if (!this.canvas) return;
    const labels = [
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
      '星期日',
    ];
  
    const data = {
      labels: labels,
      datasets: [{
        label: '生产量',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'yellow',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    };
  
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        
      }
    };
    this.chart?.destroy();
    this.chart = new Chart(
      this.canvas,
      config
    );
  }
  
  componentDidUpdate() {
    this.buildChart();
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
  }

  handleClick = (text: ArgumentsString) => {
    const getState = getArgumentsItem(text);
    this.setState({ text: getState as string })
  }

  render() {
    const { classes, style } = this.props;
    console.log('style', style);
    const canvasStyle = {
      width: '100%', height: '100%'
    }
    return (
      <Wrapper {...this.props} maxWidth maxHeight>
        <canvas style={canvasStyle} ref={ref => this.canvas = ref}></canvas>
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

export type ChartsProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<ChartsProps>(Charts, config, createStyles))
