import { Component } from 'react';
import { connect } from 'react-redux';
import Chart, { ChartConfiguration, ChartData, ChartOptions } from 'chart.js/auto';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsArray, ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './ChartBarAndLine.config';
import createStyles, { ClassesKey } from './ChartBarAndLine.createStyles';

class ChartBarAndLine extends Component<ChartBarAndLineProps, State> {
  canvas: HTMLCanvasElement | null;
  chart: Chart | null;
  constructor(props: ChartBarAndLineProps) {
    super(props)
    this.state = {
      labels: []
    }
    this.canvas = null;
    this.chart = null;
  }

  componentDidMount() {
    this.props.registersFunction({
      setLabel: this.setLabel
    })
    this.props.eventDispatch().mount()
    this.props.setRunningTimes({ text: 'runningTimeData' })
  }

  setLabel = (label: ArgumentsArray) => {
    const data = getArgumentsItem(label) as string[];
    this.setState({
      labels: data
    });
  }

  buildChart = () => {
    if (!this.canvas) return;
    const {labels} = this.state;
    const chartData: ChartData = {
      labels,
      datasets: [
        {
          // 专属
          type: 'bar',
          borderRadius: 8,
          // 公共
          label: '生产量',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          borderColor: 'rgba(255, 255, 255)',
          borderWidth: 2,
          data: [0, 20, 5, 8, 20, 30, 45, 30],
          pointStyle: 'rect',
        },
        {
          type: 'line',
          // 专属
          borderDash: [5,5],
          showLine: true,
          fill: true,
          // 公共
          label: '产值',
          backgroundColor: 'rgba(0, 255, 255, 0.5)',
          borderColor: 'rgba(255, 255, 255)',
          data: [5, 10, 15, null, null, 10, 15],
          pointStyle: 'circle',
          pointRadius: 10,
          pointHoverRadius: 15
        },
      ],
    };

    const chartOptopns: ChartOptions<'line'> = {
      // 数据方向
      indexAxis: 'x',
      responsive: true,
      plugins: {
        tooltip: {
          backgroundColor: 'green'
        },
        legend: {
          labels: {
            usePointStyle: true,
            color: 'white'
          },
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            color: 'white',
            borderColor: 'yellow',
            borderWidth: 1,
            lineWidth: 2,
            tickColor: 'red',
            drawTicks: false,
          },
          ticks: {
            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
            // callback: function (val, index) {
            //   // Hide every 2nd tick label
            //   return index % 3 === 0 ? this.getLabelForValue(val as any) : '';
            // },
            color: 'white',
          }
        },
        y: {
          grid: {
            display: true,
            color: 'white',
            borderColor: 'yellow',
            borderWidth: 1,
            lineWidth: 1,
            tickColor: 'red',
            drawTicks: false,
          },
          ticks: {
            color: 'white'
          }
        }
      },
      elements: {
        line: {
          fill: false,
          backgroundColor: 'rgba(255,0,0,0.2)',
          borderColor: 'rgba(255,0,0,0.2)',
        },
      }
    }

    const config: ChartConfiguration = {
      type: 'line',
      data: chartData,
      options: chartOptopns
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
    this.chart?.destroy();
  }

  handleClick = (text: ArgumentsString) => {
    const getState = getArgumentsItem(text);
  }

  render() {
    const { classes, style } = this.props;
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
  runningTimes: state.runningTimes,
})

const mapDispatch = (dispatch: Dispatch) => ({
  setRunningTimes: dispatch.runningTimes.setRunningTimes,
})

// typeof State
type State = {
  labels: string[]
}

// typeof Props
type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>

export type ChartBarAndLineProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<ChartBarAndLineProps>(ChartBarAndLine, config, createStyles))
