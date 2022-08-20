import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ColorResult, RGBColor, SketchPicker } from 'react-color';
import { Row, Col } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import s from './Color.module.less';
import ClassNames from 'classnames';
import { throttle } from 'lodash';
import useSafeCallback from '~/hooks/useSafeCallback';
const parse = require('color-parse');
interface Props {
  defaultValue?: string;
  value?: string;
  label?: string;
  onChange?: (result: {
    name: 'color';
    value: ColorResult | undefined;
  }) => void;
  span?: {
    label: number,
    value: number,
  }
}

const Color: React.FC<Props> = ({
  defaultValue,
  value,
  label,
  onChange,
  children,
  span,
  ...other
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState<RGBColor>();
  const [pickWrapStyle, setPickWrapStyle] = useState({});
  const picker = useRef(null);

  useEffect(() => {
    const defvalue = defaultValue || value;
    if (defvalue) {
      const optColor: any = {};
      const temp = parse(defvalue);
      if (temp.space) {
        optColor.r = temp.values[0];
        optColor.g = temp.values[1];
        optColor.b = temp.values[2];
        optColor.a = temp.alpha;
        setColor(optColor);
      }
    } else {
      setColor(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback(
    (e) => {
      console.log(e);
      
      setDisplayColorPicker(!displayColorPicker);
      let style: CSSProperties = {
        position: 'absolute',
      };

      const width = window.innerWidth,
        height = window.innerHeight,
        sWidth = 270,
        sHeight = 350,
        X = e.screenX,
        Y = e.screenY;

      // 1、判断拾色器的宽度小于窗口宽度
      if (width > sWidth) {
        if (X + sWidth > width) {
          style = {
            ...style,
            width: sWidth,
            height: sHeight,
            left: 'unset',
            right: -27
          }
        }
      }
      // 2、判断拾色器的高度大于窗口高度
      if (height > sHeight) {
        if (Y + sHeight > height) {
          style = {
            ...style,
          }
        }
      }
      setPickWrapStyle(style);
    },
    [displayColorPicker]
  );

  const handleClose = useCallback(() => {
    setPickWrapStyle({});
    setDisplayColorPicker(false);
  }, []);

  /**
   * 高频编辑防抖处理
   */
  const refChange = useSafeCallback(onChange);
  const onChangeDebounce = useMemo(
    () =>
      throttle((value) => {
        refChange(value);
      }, 500),
    [refChange]
  );


  const handleChange = useCallback(
    (color: ColorResult | 'inherit') => {
      let colorResult: any = color;
      if (color === 'inherit') {
        colorResult = undefined;
        setColor(undefined);
      } else {
        setColor(color.rgb);
      }

      onChangeDebounce({
        name: 'color',
        value: colorResult,
      });
    },
    [onChangeDebounce]
  );


  const renderColor = () => {
    return (
      <>
        {displayColorPicker ? (
          <div className={s.popover}>
            <div className={s.cover} onClick={handleClose} />
            <div
              className={s.wrap}
              style={pickWrapStyle}
              ref={picker}
              onClick={(e) => e.stopPropagation()}
            >
              <SketchPicker
                color={color || undefined}
                width="250px"
                onChange={handleChange}
                className={s.picker}
                presetColors={[
                  '#f44336',
                  '#e91e63',
                  '#9c27b0',
                  '#673ab7',
                  '#3f51b5',
                  '#2196f3',
                  '#03a9f4',
                  '#00bcd4',
                  '#009688',
                  '#4caf50',
                  '#8bc34a',
                  '#cddc39',
                  '#ffeb3b',
                  '#ffc107',
                  '#ff9800',
                  '#ff5722',
                  '#aaaaaa',
                  '#000000',
                  '#fff',
                  'transparent',
                ]}
              />
              <div
                onClick={() => handleChange('inherit')}
                className={s.inherit}
              >
                移除
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  const displayColor = color && `rgba(${(color as any).r}, ${(color as any).g}, ${(color as any).b
    }, ${(color as any).a})`

  return (
    <>
      {children ? (
        <>
          <span {...other} onClick={handleClick}>
            {children}
          </span>
          {renderColor()}
        </>
      ) : (
        <Row className={s.row} gutter={4}>
          {label ? <Col className={s.label} span={span?.label || 7}>
            {label || ''}
          </Col> : null}
          <Col span={span?.value || 17}>
            <div className={s.swatch} onClick={handleClick}>
              {color ? (
                <div
                  className={s.color}
                  style={{
                    backgroundColor: displayColor,
                  }}
                />
              ) : (
                <div className={ClassNames(s.color, s.empty)}>
                  <BgColorsOutlined />
                </div>
              )}
              {renderColor()}
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Color;
