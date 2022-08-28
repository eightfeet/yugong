import { Component } from 'react';
import { connect } from 'react-redux';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsArray, ArgumentsMixed } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './ChartBarAndLine.config';
import createStyles, { ClassesKey } from './ChartBarAndLine.createStyles';
import { isEqual } from 'lodash';

class ChartBarAndLine extends Component<ChartBarAndLineProps, State> {
  canvas: HTMLCanvasElement | null;
  chart: any;
  constructor(props: ChartBarAndLineProps) {
    super(props)
    this.state = {
      labels: [],
      dataGroup: [],
      options: {}
    }
    this.canvas = null;
    this.chart = null;
  }

  componentDidMount() {
    const {setLabel, setDataGroup, setOptions} = this;
    this.props.registersFunction({
      setLabel,
      setDataGroup,
      setOptions
    })
    this.props.eventDispatch().mount()
  }

  setLabel = (label: ArgumentsArray) => {
    const data = getArgumentsItem(label) as string[];
    this.setState({
      labels: data
    });
  }

  setDataGroup = (dataGroup: ArgumentsMixed) => {
    const data = getArgumentsItem(dataGroup) as any[];
    this.setState({
      dataGroup: data
    });
  }

  setOptions = (options: ArgumentsMixed) => {
    const data = getArgumentsItem(options) as any[];
    this.setState({
      options: data
    });
  }

  buildChart = () => {
    if (!this.canvas) return;
    const {labels, dataGroup, options} = this.state;
    const chartData: ChartData = {
      labels,
      datasets: dataGroup,
    };
    const config: ChartConfiguration = {
      type: 'line',
      data: chartData,
      options: options
    };
    this.chart?.destroy();
    this.chart = new Chart(
      this.canvas,
      config
    );
  }

  componentDidUpdate(prevProps: any) {
    if(isEqual(prevProps, this.props)) {
      this.buildChart();
    }
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
    this.chart?.destroy();
  }

  render() {
    const canvasStyle = {
      width: '100%', height: '100%'
    }
    return (
      <Wrapper {...this.props} maxWidth maxHeight>
        <canvas width={canvasStyle.width} height={canvasStyle.height} ref={ref => this.canvas = ref}></canvas>
      </Wrapper>
    )
  }
}

const mapState = (state: RootState) => ({
})

const mapDispatch = (dispatch: Dispatch) => ({
})

// typeof State
type State = {
  labels: string[];
  dataGroup: any[];
  options: {[keys: string]: any}
}

// typeof Props
type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>

export type ChartBarAndLineProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<ChartBarAndLineProps>(ChartBarAndLine, config, createStyles))
