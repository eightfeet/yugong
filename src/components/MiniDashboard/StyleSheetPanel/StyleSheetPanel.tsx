import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

import { Collapse } from 'antd';
import Display from '../Display';
import Font from '../Font';
import Background from '../Background';

import useMergeAppData from '~/hooks/useMergeAppData';
import s from './StyleSheetPanel.module.scss';
import Shadow from '../Shadow';
import Border from '../Border';
import Transform from '../Transfrom';

const { Panel } = Collapse;

interface Props {
    path: string;
}

const StyleSheetPanel: React.FC<Props> = ({ path }) => {
    const selected = useSelector((state: RootState) => state.activationItem);
    const unit = useSelector((state: RootState) => state.pageData.unit);
    const update = useMergeAppData();
    const rootStyle = `style.${path}`;

    const onChangeFont = useCallback(
        (result: any) => {
            update(result, `${rootStyle}.font`);
        },
        [rootStyle, update]
    );

    const onChangeDisplay = useCallback(
        (result: any) => {
            console.log('result', result);
            update(result, `${rootStyle}.display`);
        },
        [rootStyle, update]
    );

    const onChangeBackgroundCommon = useCallback(
        (result: any) => {
            if (result.type === 'backgroundCommon') {
                update(result.values, `${rootStyle}.backgroundCommon`);
            }
            if (result.type === 'backgroundGradient') {
                update(result.values, `${rootStyle}.backgroundGradient`);
            }
        },
        [rootStyle, update]
    );

    const onChangeShadow = useCallback(
        (result: any) => {
            if (result.type === 'boxShadow') {
                update(result.values, `${rootStyle}.boxShadow`);
            }
            if (result.type === 'textShadow') {
                update(result.values, `${rootStyle}.textShadow`);
            }
        },
        [rootStyle, update]
    );

    const onChangeBorder = useCallback(
        (result: any) => {
            update(result, `${rootStyle}.border`);
        },
        [rootStyle, update]
    );

    const onChangeTransfrom = useCallback(
        (result: any) => {
            console.log(result);
            update(result, `${rootStyle}.transform`);
        },
        [rootStyle, update]
    );

    return (
        <div className={s.root}>
            {path ? (
                <Collapse accordion bordered={false}>
                    <Panel header="布局" key="display">
                        <Display
                            unit={unit}
                            onChange={onChangeDisplay}
                            defaultData={selected?.style?.[path]?.display || {}}
                        />
                    </Panel>
                    <Panel header="文字" key="font">
                        <Font
                            unit={unit}
                            onChange={onChangeFont}
                            defaultData={selected?.style?.[path]?.font || {}}
                        />
                    </Panel>
                    <Panel
                        header="背景"
                        key="backgroundCommon_backgroundGradient"
                    >
                        <Background
                            unit={unit}
                            updateKey={selected.moduleId}
                            onChange={onChangeBackgroundCommon}
                            defaultBGCommonData={
                                selected?.style?.[path]?.backgroundCommon || {}
                            }
                            defaultBGGradient={
                                selected?.style?.[path]?.backgroundGradient ||
                                {}
                            }
                        />
                    </Panel>
                    <Panel header="圆角与描边" key="border">
                        <Border
                            unit={unit}
                            onChange={onChangeBorder}
                            defaultDate={selected?.style?.[path]?.border || {}}
                        />
                    </Panel>
                    <Panel header="投影" key="textShadow_boxShadow">
                        <Shadow
                            unit={unit}
                            onChange={onChangeShadow}
                            defaultValue={{
                                textShadowList:
                                    selected?.style?.[path]?.textShadow,
                                boxShadowList:
                                    selected?.style?.[path]?.boxShadow,
                            }}
                        />
                    </Panel>
                    <Panel header="变换" key="transform">
                        <Transform
                            unit={unit}
                            onChange={onChangeTransfrom}
                            defaultDate={
                                selected?.style?.[path]?.transform || {}
                            }
                        />
                    </Panel>
                </Collapse>
            ) : null}
        </div>
    );
};

export default StyleSheetPanel;
