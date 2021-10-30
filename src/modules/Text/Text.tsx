import { useCallback, useEffect, useState } from 'react';
import requester from '~/core/fetch';
import { AppDataElementsTypes, ArgumentsItem } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import s from './Text.module.less';
import useStyles from './Text.useStyle';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import classNames from 'classnames';
import useLifeCycle from '~/hooks/useLifeCycle';
import config from './Text.config';

export interface TextProps extends AppDataElementsTypes {}

const Text: Modules<TextProps> = (props) => {
    const { api, style, moduleId } = props;
    const [textArea, setTextArea] = useState<any>([]);
    const [autoNumber, setAutoNumber] = useState(false);

    // 样式处理
    const userClass = useStyles(style);

    // 设置文本
    const setText = useCallback((args: ArgumentsItem, autoNumber: ArgumentsItem) => {
        const text = getArgumentsItem(args);
        const isAutoNum = getArgumentsItem(autoNumber);
        if (isAutoNum === 1) setAutoNumber(true);
        if (isAutoNum === 2) setAutoNumber(false);
        setTextArea(text);
    }, []);

    // 初始值
    useEffect(() => {
        const args0 = Text.exposeFunctions![0].arguments![0];
        const args1 = Text.exposeFunctions![0].arguments![1];
        setText(args0, args1);
    }, [setText])

    // 生命周期处理
    useLifeCycle(moduleId, {mount: '初始化', unmount: '卸载'}, {setText})

    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find((item) => item.apiId === '');
        requester(apiArguments || {});
    }, [api]);

    return (
        <Wrapper {...props} maxWidth maxHeight itemAlign="top">
            <ul className={classNames(s.text, userClass.wrap)}>
                {textArea.map((item: any, index: number) => (
                    <li key={index} className={userClass.paragraph}>
                       {autoNumber ? <span>{index + 1}</span> : null} {item}
                    </li>
                ))}
            </ul>
        </Wrapper>
    );
};

// bind static
for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        Text[key] = config[key];
    }
}

export default Text;
