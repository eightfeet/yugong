import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { Collapse } from 'antd';
import s from './ElementStyleSheetPanel.module.scss';
import Transform from '~/components/MiniDashboard/Transfrom';
import Display from '../stylesetter/Display';
import Font from '../stylesetter/Font';
import BackgroundGroup from '~/components/MiniDashboard/BackgroundGroup';
import Border from '~/components/MiniDashboard/Border';
import Animation from '~/components/MiniDashboard/Animation';
import Shadow from '~/components/MiniDashboard/Shadow';
import { ElementStyleContext, StyleType } from '../../ElementStyleContext';
import { ContentAndStyleContext } from '../../ContentAndStyleContext';

const { Panel } = Collapse;

interface Props {
  path: string;
}

const ElementStyleSheetPanel: React.FC<Props> = ({ path }) => {
  const { style } = useContext(ContentAndStyleContext)
  const unit = useSelector((state: RootState) => state.pageData.unit);

  const onChange = useCallback(
    (result: any, type: StyleType) => {
      console.log(result, type);
    },
    [],
  );

  return (
    <ElementStyleContext.Provider
      value={{
        unit,
        onChange,
        style,
        path,
      }}
    >
      <div className={s.root}>
        {path ? (
          <Collapse accordion bordered={false}>
            <Panel header="布局" key="display">
              <Display />
            </Panel>
            <Panel style={{position:'relative'}} header="文字" key="font">
              <Font />
            </Panel>
            <Panel style={{position:'relative'}} header="背景" key="backgroundGroup">
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
