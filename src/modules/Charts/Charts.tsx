import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactECharts from 'echarts-for-react';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsString } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { Dispatch, RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Charts.config';
import createStyles, { ClassesKey } from './Charts.createStyles';

export type ChartsProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

const Charts: React.FC<ChartsProps> = (props) => {
  const {
    registersFunction,
    eventDispatch,
    classes,
  } = props;
  const { runningTimes } = useSelector((state: RootState) => state);
  const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;
  const [text, setText] = useState('');

  useEffect(() => {
    setRunningTimes({ text: 'runningTimeData' });
  }, [setRunningTimes])

  const handleClick = useCallback(
    (text: ArgumentsString) => {
      const getState = getArgumentsItem(text);
      setText(getState as string)
    },
    [],
  )

  // First setup registers
  useEffect(() => {
    registersFunction({
      handleClick
    })
  }, [handleClick, registersFunction])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const renderCharts = useCallback(
    () => {
      const options = {
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
      };
    
      return <ReactECharts option={options} />;
    },
    [],
  )
  

  return (
    <Wrapper {...props} maxWidth maxHeight>
      {renderCharts()}
    </Wrapper>
  )
}

export default PresetModule<ChartsProps>(Charts, config, createStyles);
