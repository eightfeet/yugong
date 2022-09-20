import { useCallback, useEffect, useState } from 'react';
import { CountUp, Easing } from 'use-count-up';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { getArguments } from '~/core/getArgumentsTypeDataFromDataSource';
import { ArgumentsItem } from '~/types/appData';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './NumberCountUp.config';
import createStyles, { ClassesKey } from './NumberCountUp.createStyles';

export type NumberCountUpProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

interface ConfigParams {
  /**数值 */
  end: number;
  /**开始数据 */
  start: number;
  /**动画持续时间 */
  duration: number;
  /**保留小数点 */
  decimalPlaces: number;
  /**千位分隔符 */
  thousandsSeparator: string;
  /**动画 */
  easing: Easing;
  /**前缀 */
  prefix?: string;
  /**后缀 */
  suffix?: string;
}

const NumberCountUp: React.FC<NumberCountUpProps> = (props) => {
  const {
    registersFunction,
    eventDispatch,
    classes,
  } = props;

  const [config, setConfig] = useState<ConfigParams>();

  const [resetKey, setResetKey] = useState(Date.now());

  const configData = useCallback(
    (...args: ArgumentsItem[]) => {
      const {
        start, duration, decimalPlaces, ...other
      } = getArguments(args) as ConfigParams;
      setConfig({
        start: Number(start),
        duration: Number(duration),
        decimalPlaces: Number(decimalPlaces),
        ...other
      })
    },
    [],
  )

  const resetCount = useCallback(
    () => {
      setResetKey(Date.now())
    },
    [],
  )
  

  // First setup registers
  useEffect(() => {
    registersFunction({
      configData,
      resetCount
    })
  }, [configData, registersFunction, resetCount])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { prefix, suffix, easing, ...countParams } = config || {};
  return (
    <Wrapper {...props}>
      {config ? <>
        <span className={classes.prefix}>
          {prefix}
        </span>
        <span className={classes.numbers}>
          <CountUp
            key={resetKey}
            isCounting={true}
            decimalSeparator="."
            easing={easing}
            {...countParams}
          />
        </span>
        <span className={classes.suffix}>
          {suffix}
        </span>
      </> : null}
    </Wrapper>
  )
}

export default PresetModule<NumberCountUpProps>(NumberCountUp, config, createStyles);
