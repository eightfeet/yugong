import { useCallback, useState } from 'react';
import requester from '~/core/fetch';
import { useLongPress } from 'react-use';
import EventEmitter from '~/core/EventEmitter';
import {
    AppDataElementsTypes,
    ArgumentsBoolean,
    ArgumentsString,
} from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import s from './Button.module.less';
import useStyles from './Button.useStyles';
import classNames from 'classnames';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import config from './Button.config';
import useLifeCycle from '~/hooks/useLifeCycle';

export interface ButtonProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Button: Modules<ButtonProps> = (props) => {
    const { api, style, moduleId } = props;
    const [text, setText] = useState();
    const [disabled, setDisabled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [displayState, setDisplayState] = useState<string>();

    const userClass = useStyles(style);
    const defaultOptions = {
        isPreventDefault: false,
        delay: 2000,
    };

    // 设置按钮
    const setButton = useCallback(
        (
            buttonText: ArgumentsString,
            disabled: ArgumentsBoolean,
            hidden: ArgumentsBoolean
        ) => {
            const getText = getArgumentsItem(buttonText);
            const isDisable = getArgumentsItem(disabled);
            const isHidden = getArgumentsItem(hidden);
            setText(getText as any);
            setDisabled(isDisable as boolean);
            setHidden(isHidden as boolean);
        },
        []
    );

    // 设置按钮显示样式
    const setButtonDisplay = useCallback((state: ArgumentsString) => {
        const getState = getArgumentsItem(state);
        setDisplayState(getState as string);
    }, []);

    // 向eventEmitter注册事件，向外公布
    const [eventsDispatch] = useLifeCycle(
        moduleId,
        {
            mount: '初始化',
            unmount: '卸载',
            click: '点击',
            doubleClick: '双击',
            longPress: '长按',
        },
        { setButton, setButtonDisplay }
    );

    // 点击事件
    const onClick = useCallback(async () => {
        const apiArguments = api?.find((item) => item.apiId === 'beforeClick');
        // api 参数交由requester自行处理
        await requester(apiArguments || {});
        eventsDispatch.click();
    }, [api, eventsDispatch]);

    // 双击事件
    const onDoubleClick = useCallback(async () => {
        const apiArguments = api?.find(
            (item) => item.apiId === 'beforeDoubleClick'
        );
        if (apiArguments) {
            await requester(apiArguments || {});
        }
        eventsDispatch.doubleClick();
    }, [api, eventsDispatch]);

    // 长按事件
    const onLongPress = useCallback(async () => {
        const apiArguments = api?.find(
            (item) => item.apiId === 'beforeLongPress'
        );
        if (apiArguments) {
            await requester(apiArguments || {});
        }
        eventsDispatch.longPress();
    }, [api, eventsDispatch]);

    const longPressEvent = useLongPress(onLongPress, defaultOptions);

    return (
        <Wrapper {...props} maxWidth maxHeight>
            {!hidden ? (
                <button
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    {...longPressEvent}
                    className={classNames(s.btn, userClass.button, {
                        [userClass.disabled]: displayState === 'disabled',
                        [userClass.focus]: displayState === 'focus',
                        [userClass.active]: displayState === 'active',
                        [userClass.hover]: displayState === 'hover',
                    })}
                    disabled={disabled}
                >
                    {text || '按钮'}
                </button>
            ) : null}
        </Wrapper>
    );
};

// bind static
for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        Button[key] = config[key];
    }
}

export default Button;
