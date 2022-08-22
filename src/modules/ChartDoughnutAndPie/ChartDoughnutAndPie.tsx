import { Component } from 'react';
import { connect } from 'react-redux';
import Chart, { ChartConfiguration, ChartData } from 'chart.js/auto';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsArray, ArgumentsMixed } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './ChartDoughnutAndPie.config';
import createStyles, { ClassesKey } from './ChartDoughnutAndPie.createStyles';
import { isEqual } from 'lodash';

class ChartDoughnutAndPie extends Component<ChartDoughnutAndPieProps, State> {
  canvas: HTMLCanvasElement | null;
  chart: Chart | null;
  constructor(props: ChartDoughnutAndPieProps) {
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
    const { labels } = this.state;
    const config: ChartConfiguration<'doughnut' | 'pie'> = {
      type: 'pie',
      data: {
        datasets: [{
          borderAlign: "inner",
          borderColor: "#fff",
          borderJoinStyle: "round",
          borderRadius: 5,
          borderWidth: 2,
          circumference: 360,
          clip: 0,
          data: [30, 10, 40, 20],
          hoverBorderColor: "red",
          hoverBorderWidth: 0,
          hoverOffset: 4,
          offset: 0,
          rotation: -90,
          spacing: 0,
          weight: 200
        },{
          
          borderAlign: "inner",
          borderColor: "#fff",
          borderJoinStyle: "round",
          borderRadius: 5,
          borderWidth: 2,
          circumference: 360,
          clip: 0,
          data: [10, 40, 20, 30],
          hoverBorderColor: "red",
          hoverBorderWidth: 0,
          hoverOffset: 4,
          offset: 0,
          rotation: -90,
          spacing: 0,
          weight: 200
        }],
        labels,
      },
      options: {
        cutout: 60,
        radius: '100%',
        circumference: 360,
        backgroundColor: ['#FB3640', '#EFCA08', '#43AA8B', '#253D5B'] as any,
      }
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

export type ChartDoughnutAndPieProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
> & StateProps & DispatchProps

export default connect(mapState, mapDispatch)(PresetModule<ChartDoughnutAndPieProps>(ChartDoughnutAndPie, config, createStyles))
