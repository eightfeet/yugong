import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useCallback, useEffect, useRef, useState } from 'react';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { getArguments, getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { AnyObjectType, ArgumentsItem } from '~/types/appData';
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

  const [remainingTime, setRemainingTime] = useState<string>();

  const [isZh, setIsZh] = useState(true);

  const [isEnded, setIsEnded] = useState(false);

  const [prefix, setPrefix] = useState<string>('距离开抢：');

  const [suffix, setSuffix] = useState<string>('敬请期待！');

  const [endTime, setEndTime] = useState<string>()

  const timer = useRef<any>();

  const setTimmer = useCallback(
    (timerConfig: ArgumentsItem) => {
      const { endTime, prefix, suffix, isZh } = getArgumentsItem(timerConfig) as AnyObjectType;
      setIsZh(isZh);
      setPrefix(prefix);
      setSuffix(suffix);
      setEndTime(endTime);
    },
    [],
  )

  // First setup registers
  useEffect(() => {
    registersFunction({ setTimmer })
  }, [registersFunction, setTimmer])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRemainingTime = useCallback(
    (remainingTime: string) => {
      const diffTimes = dayjs(remainingTime).diff(dayjs());
      if (diffTimes <= 0) {
        clearInterval(timer.current)
        setIsEnded(true)
        return;
      }
      if (isEnded === true) {
        setIsEnded(false)
      }
      const durationTime = dayjs.duration(diffTimes);
      const FYear = `Y${isZh ? '年' : '-'}`;
      const FMonth = `M${isZh ? '月' : '-'}`;
      const FDay = `D${isZh ? '天 ' : ' '}`;
      const FHour = `H${isZh ? '时' : ':'}`;
      const FMinute = `m${isZh ? '分' : ':'}`;
      const FSecond = `s${isZh ? '秒' : ''}`;
      let formatArr: string[] = [];
      if (durationTime.get('year') > 0) {
        formatArr = [FYear, FMonth, FDay, FHour, FMinute, FSecond];
      } else if (durationTime.get('month') > 0) {
        formatArr = [FMonth, FDay, FHour, FMinute, FSecond];
      } else if (durationTime.get('day') > 0) {
        formatArr = [FDay, FHour, FMinute, FSecond];
      } else {
        formatArr = [FHour, FMinute, FSecond];
      }
      const result = durationTime.format(formatArr.join(''));
      setRemainingTime(result)
    },
    [isEnded, isZh],
  );

  useEffect(() => {
    if (isEnded === true) eventDispatch().finished();
    if (isEnded === false) eventDispatch().waited();
  }, [eventDispatch, isEnded])


  useEffect(() => {
    if (endTime) {
      timer.current = setInterval(() => {
        getRemainingTime(endTime);
      }, 1000)
    }
    return () => {
      clearInterval(timer.current)
    }
  }, [endTime, getRemainingTime])

  return (
    <Wrapper {...props} itemAlign='bottom'>
      <div>
        {isEnded || !remainingTime ?
          null :
          <div className={props.classes.text}>
            {prefix}{remainingTime}{suffix}
          </div>}
      </div>
    </Wrapper>
  )
}

export default PresetModule<CountdownTimerProps>(CountdownTimer, config, createStyles);

