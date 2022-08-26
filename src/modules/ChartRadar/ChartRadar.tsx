import { Component } from 'react';
import { connect } from 'react-redux';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsArray, ArgumentsMixed } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './ChartRadar.config';
import createStyles, { ClassesKey } from './ChartRadar.createStyles';
import { isEqual } from 'lodash';

class ChartRadar extends Component<ChartRadarProps, State> {
  canvas: HTMLCanvasElement | null;
  chart: Chart | null;
  constructor(props: ChartRadarProps) {
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
    const { setLabel, setDataGroup, setOptions } = this;
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
    const { labels, options } = this.state;
    const config: ChartConfiguration<'radar'> = {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'My Second Dataset',
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)',
          borderCapStyle: 'butt',
          borderDash: [3, 5],
          borderDashOffset: 5,
          borderJoinStyle: 'bevel',
          borderWidth: 3,
          hoverBackgroundColor: '',
          hoverBorderCapStyle: 'butt',
          hoverBorderColor: '#eee',
          hoverBorderDash: [5, 5],
          hoverBorderDashOffset: 10,
          hoverBorderJoinStyle: 'bevel',
          hoverBorderWidth: 5,
          clip: 3,
          order: 4,
          tension: 0,
          pointBorderWidth: 5,
          pointHitRadius: 6,
          pointHoverBorderWidth: 6,
          pointHoverRadius: 5,
          pointRadius: 6,
          pointRotation: 10,
          pointStyle: '',
          spanGaps: true,
        }]
      },
      options,
    };
    this.chart?.destroy();
    this.chart = new Chart(
      this.canvas,
      config
    );
  }

  componentDidUpdate(prevProps: any) {
    if (isEqual(prevProps, this.props)) {
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
  options: { [keys: string]: any }
}

// typeof Props
type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>

export type ChartRadarProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<ChartRadarProps>(ChartRadar, config, createStyles))
