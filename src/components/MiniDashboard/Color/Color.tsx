import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ColorResult, RGBColor, SketchPicker } from 'react-color';
import { Row, Col } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import s from './Color.module.less';
import ClassNames from 'classnames';
import { throttle } from 'lodash';
import useSafeCallback from '~/hooks/useSafeCallback';
const parse = require('color-parse');
interface Props {
    defaultColor?: string;
    label?: string;
    onChange: (result: {
        name: 'color';
        value: ColorResult | undefined;
    }) => void;
    span?: {
        label: number,
        value: number,
    }
}

const Color: React.FC<Props> = ({
    defaultColor,
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
        if (defaultColor) {
            const optColor: any = {};
            const temp = parse(defaultColor);
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
    }, [defaultColor]);

    const handleClick = useCallback(
        (e) => {
            setDisplayColorPicker(!displayColorPicker);
            const style: any = {
                position: 'absolute',
            };

            const width = document.body.offsetWidth,
                height = document.body.offsetHeight,
                sWidth = 270,
                sHeight = 350,
                X = e.screenX,
                Y = e.screenY;

            // 1、判断拾色器的宽度小于窗口宽度
            if (width > sWidth) {
                if (X + sWidth > width) {
                    style.position = 'fixed';
                    style.right = `10px`;
                }
            }
            // 2、判断拾色器的高度大于窗口高度
            if (height > sHeight) {
                if (Y + sHeight > height) {
                    style.position = 'fixed';
                    style.bottom = `10px`;
                }
            }
            setPickWrapStyle(style);
        },
        [displayColorPicker]
    );

    const handleClose = useCallback(() => {
        setDisplayColorPicker(false);
    }, []);

    /**
     * 高频编辑防抖处理
     */
     const refChange = useSafeCallback(onChange);
     const onChangeDebounce = useMemo(
        () =>
            throttle((value) => {
                refChange.current?.(value);
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

    const displayColor = color && `rgba(${(color as any).r}, ${(color as any).g}, ${
      (color as any).b
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
                    <Col className={s.label} span={span?.label || 7}>
                        {label || ''}
                    </Col>
                    <Col span={ span?.value || 17}>
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
