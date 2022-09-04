import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ColorResult, RGBColor, SketchPicker } from 'react-color';
import { Row, Col } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import s from './Color.module.less';
import ClassNames from 'classnames';
import { throttle } from 'lodash';
import useSafeCallback from '~/hooks/useSafeCallback';
import ReactDOM from 'react-dom';
import { useEvent } from 'react-use';
import classNames from 'classnames';
const parse = require('color-parse');
interface Props {
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  label?: string;
  onChange?: (result: {
    name: 'color';
    value: ColorResult | undefined;
  }) => void;
  span?: {
    label: number;
    value: number;
  };
}

const Color: React.FC<Props> = ({
  defaultValue,
  value,
  label,
  onChange,
  children,
  span,
  disabled,
  ...other
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState<RGBColor>();
  const [pickWrapStyle, setPickWrapStyle] = useState({});
  const picker = useRef<HTMLDivElement | null>(null);
  const pannelRef = useRef<HTMLDivElement | null>(null);

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

  const removePannel = useCallback(
    () => {
      if (pannelRef.current) {
        document.getElementById('root')?.removeChild(pannelRef.current);
        pannelRef.current = null;
      }
    },
    [],
  )

  const createPannel = useCallback(
    () => {
      removePannel();
      pannelRef.current = document.createElement('div') as HTMLHeadingElement;
      pannelRef.current.id = 'colorpicker';
      document.getElementById('root')?.appendChild(pannelRef.current);
    },
    [removePannel],
  )
  

  const handleClose = useCallback(() => {
    setPickWrapStyle({});
    setDisplayColorPicker(false);
    removePannel();
  }, [removePannel]);

  useEvent('scroll', handleClose, window, {capture: true})

  /**
   * 高频编辑防抖处理
   */
  const refChange = useSafeCallback(onChange);
  const onChangeDebounce = useMemo(
    () =>
      throttle((value) => {
        refChange(value);
      }, 500),
    [refChange],
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
    [onChangeDebounce],
  );

  const renderColor = () => {
    if (!displayColorPicker) return null;
    return ReactDOM.createPortal(
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
          <div onClick={() => handleChange('inherit')} className={s.inherit}>
            移除
          </div>
        </div>
      </div>,
      pannelRef.current!,
    );
  };

  const handleClick = useCallback(
    (e) => {
      if (disabled) return;
      const {x, y, height: h} = e.target.getBoundingClientRect();
      setDisplayColorPicker(!displayColorPicker);
      const WinWidth = window.innerWidth,
        WinHeight = window.innerHeight,
        width = 270,
        height = 390,
        offset = 20;

        let style: CSSProperties = {
          left: x,
          top: y+h,
          position: 'fixed',
          width, height
        };
        // 判断拾色器的窗口位置
        if (x + width > WinWidth) {
          style.left = WinWidth - width - offset
        }

        if (y + height > WinHeight) {
          style.top = y - height - h + offset
        }
  
      setPickWrapStyle(style);
      createPannel();
    },
    [createPannel, disabled, displayColorPicker],
  );

  const displayColor =
    color &&
    `rgba(${(color as any).r}, ${(color as any).g}, ${(color as any).b}, ${
      (color as any).a
    })`;

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
        <>
          <Row className={s.row} gutter={4}>
            {label ? (
              <Col className={s.label} span={span?.label || 7}>
                {label || ''}
              </Col>
            ) : null}
            <Col span={span?.value || 17}>
              <div className={classNames(s.swatch, disabled ? s.disabled : null)} onClick={handleClick}>
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
              </div>
            </Col>
          </Row>
          {renderColor()}
        </>
      )}
    </>
  );
};

export default Color;
