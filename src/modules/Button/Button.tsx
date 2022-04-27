import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import PresetModule from '~/components/PresetModule';
import { ClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsItem, ArgumentsString } from '~/types/appData';
import { getArguments, getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import requester from '~/core/fetch';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Button.config';
import createStyles, { ClassesKey } from './Button.createStyles';
import s from './Button.module.less';
import { useLongPress } from 'react-use';


export type ButtonProps = ClassModuleBaseProps<
  { [keys in ClassesKey]: string; },
  { [keys in ExposeEventsKeys]: Function; }
>

const defaultOptions = {
  isPreventDefault: false,
  delay: 2000,
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    registersFunction,
    eventDispatch,
    classes,
  } = props;
  const { api } = props;
  const [text, setText] = useState<string>();
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [displayState, setDisplayState] = useState<string>();

  useEffect(() => {
    eventDispatch().mount()
    return () => {
      eventDispatch().unmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 设置按钮
  const setButton = useCallback(
    (
      ...args: ArgumentsItem[]
    ) => {
      const resArg = getArguments(args);
      const {buttonText, disabled, hidden} = resArg;
      setText(buttonText);
      setDisabled(disabled);
      setHidden(hidden);
    },
    []
  );

  // 设置按钮显示样式
  const setButtonDisplay = useCallback((state: ArgumentsString) => {
    const getState = getArgumentsItem(state);
    setDisplayState(getState as string);
}, []);

  // 点击事件
  const onClick = useCallback(async () => {
    const apiArguments = api?.find((item) => item.apiId === 'beforeClick');
    // api 参数交由requester自行处理
    await requester(apiArguments || {});
    eventDispatch().click();
  }, [api, eventDispatch]);

  // 双击事件
  const onDoubleClick = useCallback(async () => {
    const apiArguments = api?.find(
      (item) => item.apiId === 'beforeDoubleClick'
    );
    if (apiArguments) {
      await requester(apiArguments || {});
    }
    eventDispatch().doubleClick();
  }, [api, eventDispatch]);

  // 长按事件
  const onLongPress = useCallback(async () => {
    const apiArguments = api?.find(
      (item) => item.apiId === 'beforeLongPress'
    );
    if (apiArguments) {
      await requester(apiArguments || {});
    }
    eventDispatch().longPress();
  }, [api, eventDispatch]);

  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  useEffect(() => {
    registersFunction({
      setButton, setButtonDisplay
    })
  }, [registersFunction, setButton, setButtonDisplay])

  return (
    <Wrapper {...props} maxWidth maxHeight>
      {!hidden ? (
        <button
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          {...longPressEvent}
          className={classNames(s.btn, classes.button, {
            [classes.disabled]: displayState === 'disabled',
            [classes.focus]: displayState === 'focus',
            [classes.active]: displayState === 'active',
            [classes.hover]: displayState === 'hover',
          })}
          disabled={disabled}
        >
          {text || '按钮'}
        </button>
      ) : null}
    </Wrapper>
  )
}

export default PresetModule<ButtonProps>(Button, config, createStyles);
