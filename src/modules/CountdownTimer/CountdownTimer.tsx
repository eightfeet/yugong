import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './CountdownTimer.config';
import createStyles, { ClassesKey } from './CountdownTimer.createStyles';
dayjs.extend(duration);

export type CountdownTimerProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

const CountdownTimer: React.FC<CountdownTimerProps> = (props) => {
  const {
    registersFunction,
    eventDispatch,
  } = props;

  const [isZh, setIsZh] = useState(true);

  // First setup registers
  useEffect(() => {
    registersFunction({})
  }, [registersFunction])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderTime = (remainingTime: any) => {
    const durationTime = dayjs.duration(remainingTime * 1000);
    const FYear = `YYYY${isZh ? '年' : '-'}`;
    const FMonth = `M${isZh ? '月' : '-'}`;
    const FDay = `D${isZh ? '天 ' : ' '}`;
    const FHour = `H${isZh ? '时' : ':'}`;
    const FMinute = `m${isZh ? '分' : ':'}`;
    const FSecond = `s${isZh ? '秒' : ''}`;
    let formatArr: string[] = [];
    if (durationTime.get('year') > 0) {
      formatArr = [FYear, FMonth, FDay, FHour, FMinute, FSecond];
    } else if (durationTime.get('month') > 0 ) {
      formatArr = [FMonth, FDay, FHour, FMinute, FSecond];
    } else if (durationTime.get('day') > 0) {
      formatArr = [FDay, FHour, FMinute, FSecond];
    } else {
      formatArr = [FHour, FMinute, FSecond];
    }
    return (
      <div className={props.classes.text} style={{flexShrink: 0}}>
        {dayjs.duration(remainingTime * 1000).format(formatArr.join(''))}
      </div>
    );
  };

  return (
    <Wrapper {...props}>
      {renderTime(2000)}
    </Wrapper>
  )
}

export default PresetModule<CountdownTimerProps>(CountdownTimer, config, createStyles);

