import { useEffect } from 'react';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { AxisOptions, Chart } from 'react-charts'

import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Charts.config';
import createStyles, { ClassesKey } from './Charts.createStyles';
import React from 'react';
import dayjs from 'dayjs';

export type ChartsProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

type MyDatum = { date: Date | string, stars: number }

const Charts: React.FC<ChartsProps> = (props) => {
  const {
    registersFunction,
    eventDispatch,
    classes,
  } = props;

  const data = [
    {
      label: '收入比',
      data: [
        {
          date: dayjs('2022-01-04').format('DD年MM月YYYY'),
          stars: 23467238,
        },
        {
          date: dayjs('2022-02-04').format('DD年MM月YYYY'),
          stars: 112344256,
        },
        {
          date: dayjs('2022-03-04').format('DD年MM月YYYY'),
          stars: 2003655,
        },
        {
          date: dayjs('2022-04-04').format('DD年MM月YYYY'),
          stars: 23467238,
        },
        {
          date: dayjs('2022-05-04').format('DD年MM月YYYY'),
          stars: 112344256,
        },
        {
          date: dayjs('2022-06-04').format('DD年MM月YYYY'),
          stars: 2003655,
        },
        {
          date: dayjs('2022-07-04').format('DD年MM月YYYY'),
          stars: 2003655,
        },
        {
          date: dayjs('2022-08-04').format('DD年MM月YYYY'),
          stars: 23467238,
        },
        {
          date: dayjs('2022-09-04').format('DD年MM月YYYY'),
          stars: 112344256,
        },
        {
          date: dayjs('2022-10-04').format('DD年MM月YYYY'),
          stars: 2003655,
        },
      ],
    },
  ]

  const primaryAxis = React.useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: datum => datum.date,
      formatters: {
        
      }
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: datum => datum.stars,
        elementType: 'area'
    },
    ],
    []
  )

  console.log(primaryAxis, secondaryAxes);
  

  // First setup registers
  useEffect(() => {
    registersFunction({
      
    })
  }, [registersFunction])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper {...props} maxWidth maxHeight>
      <Chart
       options={{
         data,
         primaryAxis,
         secondaryAxes,
       }}
     />
    </Wrapper>
  )
}

export default PresetModule<ChartsProps>(Charts, config, createStyles);
