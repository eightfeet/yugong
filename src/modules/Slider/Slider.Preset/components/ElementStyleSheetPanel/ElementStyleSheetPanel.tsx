import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Collapse } from 'antd';
import { RootState } from '~/redux/store';
import Display from '../stylesetter/Display';
import Font from '../stylesetter/Font';
import BackgroundGroup from '../stylesetter/BackgroundGroup';
import Border from '../stylesetter/Border';
import Transform from '../stylesetter/Transfrom';
import Animation from '../stylesetter/Animation';
import Shadow from '../stylesetter/Shadow';
import { ElementStyleContext, StyleType } from '../../ElementStyleContext';
import { ContentAndStyleContext } from '../../ContentAndStyleContext';
import s from './ElementStyleSheetPanel.module.scss';

const { Panel } = Collapse;

interface Props {
}

const ElementStyleSheetPanel: React.FC<Props> = () => {
  const { style, setContentAndStyle } = useContext(ContentAndStyleContext)
  const unit = useSelector((state: RootState) => state.pageData.unit);

  const onChange = useCallback(
    (result: any, type: StyleType) => {
      const currentStyle = {
        ...style,
        [type]: result
      }
      setContentAndStyle?.('style', currentStyle);
    },
    [setContentAndStyle, style],
  );

  return (
    <ElementStyleContext.Provider
      value={{
        unit,
        onChange,
        style,
      }}
    >
      <div className={s.root}>
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
      </div>
    </ElementStyleContext.Provider>
  );
};

export default ElementStyleSheetPanel;
