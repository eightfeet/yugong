import { useCallback, useEffect, useState } from 'react';
import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsItem } from '~/types/appData';
import { getArguments } from '~/core/getArgumentsTypeDataFromDataSource';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Text.config';
import createStyles, { ClassesKey } from './Text.createStyles';
import classNames from 'classnames';
import s from './Text.module.less';

export type TextProps = ModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

const Text: React.FC<TextProps> = (props) => {
  const {
    registersFunction,
    eventDispatch,
    classes,
  } = props;
  const [textArea, setTextArea] = useState<any>([]);
  const [autoNumber, setAutoNumber] = useState(false);

  // 设置文本
  const setText = useCallback((...args: ArgumentsItem[]) => {
    // args: ArgumentsItem, autoNumber: ArgumentsItem
    const data = getArguments(args);
    const { textArray, autoNumber } = data;
    if (autoNumber === 1) setAutoNumber(true);
    if (autoNumber === 2) setAutoNumber(false);
    setTextArea(textArray);
  }, []);

  // First setup registers
  useEffect(() => {
    registersFunction({
      setText
    })
  }, [setText, registersFunction])

  // Second, distributing events
  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 得到一个初始值
  useEffect(() => {
    const args0 = config.exposeFunctions![0].arguments![0];
    const args1 = config.exposeFunctions![0].arguments![1];
    setText(args0, args1);
  }, [setText])

  return (
    <Wrapper {...props} maxWidth maxHeight itemAlign="top">
      <ul className={classNames(s.text, classes.wrap)}>
        {textArea.map((item: any, index: number) => (
          <li key={index} className={classes.paragraph}>
            {autoNumber ? <span>{index + 1}</span> : null} {item}
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

export default PresetModule<TextProps>(Text, config, createStyles);
