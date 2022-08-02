
import { Component } from 'react';
import { connect } from 'react-redux';
import Chart, { ChartConfiguration, ChartData, ChartOptions } from 'chart.js/auto';
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
      labels: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日',
      ]
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

    const chartData: ChartData = {
      labels: labels,
      datasets: [{
        label: '生产量',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'yellow',
          'blue',
        ],
        borderColor: 'rgba(255, 255, 255)',
        data: [0, 10, 5, 2, 20, 30, 45],
        showLine: true
      },
      {
        label: '产值',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'yellow',
          'blue',
        ],
        borderColor: 'rgba(255, 255, 0)',
        data: [5, 10, 15, 20, 20, 10, 15],
        showLine: true
      }
      ],

    };

    const chartOptopns: ChartOptions<'bubble'> = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '标题',
          align: 'start'
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            color: 'green',
            borderColor: 'yellow',
            borderWidth: 1,
            lineWidth: 2,
            tickColor: 'red',
            drawTicks: false,
          },
          ticks: {
            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
            callback: function (val, index) {
              // Hide every 2nd tick label
              return index % 2 === 0 ? this.getLabelForValue(val as any) : '';
            },
            color: 'white',
          },
          title: {
            display: true,
            text: '年产值',
            color: 'green',
            font: {
              size: 30
            },
          }
        },
        y: {
          min: -10,
          max: 50,
          grid: {
            display: false,
            color: 'green',
            borderColor: 'yellow',
            borderWidth: 1,
            lineWidth: 2,
            tickColor: 'red',
            drawTicks: false,
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
  labels: number | string[]
}

// typeof Props
type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>

export type ChartsProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<ChartsProps>(Charts, config, createStyles))
