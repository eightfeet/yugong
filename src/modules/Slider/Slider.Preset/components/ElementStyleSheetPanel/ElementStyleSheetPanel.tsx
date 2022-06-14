import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { Collapse } from 'antd';
import s from './ElementStyleSheetPanel.module.scss';
import Transform from '~/components/MiniDashboard/Transfrom';
import Display from './../Display';
import Font from '~/components/MiniDashboard/Font';
import BackgroundGroup from '~/components/MiniDashboard/BackgroundGroup';
import Border from '~/components/MiniDashboard/Border';
import Animation from '~/components/MiniDashboard/Animation';
import Shadow from '~/components/MiniDashboard/Shadow';
import { ElementStyleContext, StyleType } from '../../ElementStyleContext';

const { Panel } = Collapse;

interface Props {
  path: string;
}

const ElementStyleSheetPanel: React.FC<Props> = ({ path }) => {
  const selected = useSelector((state: RootState) => state.activationItem);
  const unit = useSelector((state: RootState) => state.pageData.unit);

  const onChange = useCallback(
    (result: any, type: StyleType) => {
      console.log(result, type);
    },
    [],
  );

  const getDefaultData = useCallback(
    (type: StyleType) => selected?.style?.[path]?.[type],
    [path, selected?.style],
  );

  return (
    <ElementStyleContext.Provider
      value={{
        unit,
        onChange,
        getDefaultData,
        path,
      }}
    >
      <div className={s.root}>
        {path ? (
          <Collapse accordion bordered={false}>
            <Panel header="布局" key="display">
              <Display />
            </Panel>
            <Panel header="文字" key="font">
              <Font />
            </Panel>
            <Panel header="背景" key="backgroundGroup">
              <BackgroundGroup />
            </Panel>
            <Panel header="圆角与描边" key="border">
              <Border />
            </Panel>
            <Panel header="投影" key="textShadow_boxShadow">
              <Shadow />
            </Panel>
            <Panel header="变换" key="transform">
              <Transform />
            </Panel>
            <Panel header="动画" key="animate">
              <Animation />
            </Panel>
          </Collapse>
        ) : null}
      </div>
    </ElementStyleContext.Provider>
  );
};

export default ElementStyleSheetPanel;
