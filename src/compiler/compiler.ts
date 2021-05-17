import description from './description';
import { createInlineStyles } from '@eightfeet/modal';
import { store } from '~/redux/store';
import unitToPx from '~/core/unitToPx';
import {
    BackgroundCommonTypesOfStyleItems,
    BackgroundGradientTypesOfStyleItems,
    BackgroundGroupTypesOfStyleItems,
    BorderTypesOfStyleItems,
    BoxShadowTypesOfStyleItems,
    DisplayTypesOfStyleItems,
    UnitType,
} from '~/types/appData';
import { compilePlaceholderFromDataSource } from '~/core/getDataFromSource';
import React from 'react';

interface objType {
    [key: string]: any;
}

interface resultType {
    result: React.CSSProperties;
    string: string;
}

export const pxToRem = (value: number) => {
    const rootFontsize = store.getState().controller.bestFont;
    const uiBaseFont = store.getState().pageData.baseFont;
    if (uiBaseFont && rootFontsize) {
        return (value / uiBaseFont) * rootFontsize;
    }
    return value;
};

export const pxToVw = (value: number) => {
    let PVw = window.innerWidth * 0.01;
    return value / PVw;
};

export const pxToVh = (value: number) => {
    let PVh = window.innerHeight * 0.01;
    return value / PVh;
};

/** 转换为目标单位 */
export const changeToUnit = (value: any) => {
    // 变量单位
    const unit = store.getState().pageData.unit;
    // 转换单位
    const toUnit = store.getState().pageData.toUnit;

    // step1：将value值转化为px单位值
    const pxNumValue = unitToPx(`${value}${unit || ''}`);

    // step2：value px单位转换为 toUnit单位
    let unitNumValue = 0;
    switch (toUnit) {
        case 'px':
            unitNumValue = pxNumValue;
            break;
        case 'rem':
            unitNumValue = pxToRem(pxNumValue);
            break;
        case 'vh':
            unitNumValue = pxToVh(pxNumValue);
            break;
        case 'vw':
            unitNumValue = pxToVw(pxNumValue);
            break;
        default:
            unitNumValue = pxNumValue;
    }

    return { value: `${unitNumValue}px`, unit: toUnit || 'px' };
};

/** 获取单位 */
const getUnit: (key: string, type: string, subType?: string) => string = (
    key,
    type,
    subType
) => {
    let items: any[] = [];
    if (subType) {
        items = (description() as { [key: string]: any })[type][subType][key];
    } else {
        items = (description() as { [key: string]: any })[type][key];
    }
    if (!items) return;
    return items[2];
};

/** 数据单位处理 */
const conversionValue: (
    value: string | number,
    key: string,
    type: string,
    subType?: string
) => { value: string | undefined; unit: string | undefined } = (
    value,
    key,
    type,
    subType
) => {
    // 当前描述单位 %，deg等
    const descUnit = getUnit(key, type, subType);
    // 变量单位
    const unit = store.getState().pageData.unit;
    if (value === undefined || value === null) {
        // 空值处理
        return { value: undefined, unit: undefined };
    } else if (descUnit === unit) {
        // 此单位变量可编辑等待处理
        return changeToUnit(value); // 处理可编辑单位值
    } else {
        // 其他处理
        return { value: `${value}${descUnit || ''}`, unit: descUnit };
    }
};

// 获取全局单位
const compileValue = (data: UnitType) => {
    const [value, unit] = data || [];
    if (!value && value !== 0) {
        return undefined;
    }
    // 获取运行时
    const runningTimes = store.getState().runningTimes;
    // 处理空值
    if (unit === '' || unit === null || unit === undefined) {
        return changeToUnit(value).value;
    } else if (unit === '-') {
        return value;
    } else if (unit === 'runningTime') {
        return compilePlaceholderFromDataSource(value.toString(), runningTimes);
    } else {
        return `${value}${unit}`;
    }
};

/**
 * -------------
 * 布局处理
 * -------------
 */
export const display = (styleObj: DisplayTypesOfStyleItems): resultType => {
    const result: objType = {};
    // typeA
    const unitType = ['width', 'height', 'left', 'top', 'right', 'bottom'];
    // typeB
    const unitTypeDeep = ['margin', 'padding'];

    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            if (unitType.includes(key)) {
                // 编译处理结果
                const val = compileValue(element);
                if (val) {
                    result[key] = val;
                }
            } else if (unitTypeDeep.includes(key)) {
                // 二次规则
                const oprateData = element as UnitType[];
                const hasValue = (oprateData || []).some((item) => item && !!item[0]);
                
                // 有值再做处理
                if (hasValue) {
                    const tempResult: any[] = [];
                    oprateData.forEach((item, index) => {
                        tempResult[index] = compileValue(item) || 0;
                    });
                    result[key] = tempResult.join(' ');
                }
            } else {
                if (element) {
                    result[key] = element;
                }
            }
        }
    }
    return {
        result,
        string: createInlineStyles(result) || '',
    };
};

/**
 * -------------
 * 文字处理
 * -------------
 */
export const font = function (styleObj: objType): resultType {
    const rules: objType = {
        fontStyle: 'fontStyle',
        fontWeight: 'fontWeight',
        fontSize: 'fontSize',
        lineHeight: 'lineHeight',
        color: 'color',
        letterSP: 'letterSpacing',
        decoration: 'textDecoration',
        align: 'textAlign',
    };
    const unitType = ['fontSize', 'lineHeight', 'letterSP'];
    const result: objType = {};
    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            if (unitType.includes(key)) {
                // 编译处理结果
                const val = compileValue(element);
                if (val) {
                    result[rules[key]] = val;
                }
            } else {
                if (element) {
                    result[rules[key]] = element;
                }
            }
        }
    }
    
    const str = createInlineStyles(result) || '';
    return {
        result,
        string: str,
    };
};

/**
 * ---------------
 * 背景组处理
 * ---------------
 */
export const backgroundGroup = (backgroundArray: BackgroundGroupTypesOfStyleItems[]): resultType => {
    console.log(333, backgroundArray);
    const result: BackgroundCommonTypesOfStyleItems = {};
    const unitType = ['sizeX', 'sizeY', 'positionX', 'positionY'];
    const values = {};

    backgroundArray.forEach(background => {
        for (const key in background) {
            if (Object.prototype.hasOwnProperty.call(background, key)) {
                const element = background[key];
                console.log(element);
            }
        }
    })

    return {
        result: values,
        string: createInlineStyles(values) || '',
    };
}



/**
 * -------------
 * 常规背景处理
 * -------------
 */
export const backgroundCommon = (
    styleObj: BackgroundCommonTypesOfStyleItems
): resultType => {
    const result: BackgroundCommonTypesOfStyleItems = {};
    const unitType = ['sizeX', 'sizeY', 'positionX', 'positionY'];

    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            if (unitType.includes(key)) {
                // 编译处理结果
                const val = compileValue(element);
                if (val) {
                    result[key] = val;
                }
            } else if (key === 'imageUrl') {
                if (element) {
                    result[key] = `url("${element}")`;
                }
            } else {
                if (element) {
                    result[key] = element;
                }
            }
        }
    }

    const background: any[] = [
        result.backgroundColor || '' /*backgroundColor*/,
        result.imageUrl || '' /*imageUrl*/,
        result.repeat || '' /*repeat*/,
        result.positionX || '0' /*positionX*/,
        result.positionY || '0' /*positionY*/,
    ].filter((item) => !!item?.length);

    const backgroundSize: string = [
        result.sizeY ? result.sizeX || 'auto' : result.sizeX || '' /*sizeX*/,
        result.sizeX ? result.sizeY || 'auto' : result.sizeY || '' /*sizeY*/,
    ]
        .filter((item) => !!item?.length)
        .join(' ');

    const values: any = {};

    if (background?.length) {
        values.background = background.join(' ');
    }

    if (backgroundSize?.length) {
        values.backgroundSize = backgroundSize;
    }

    return {
        result: values,
        string: createInlineStyles(values) || '',
    };
};

/**
 * -------------
 * 渐变背景处理
 * -------------
 */
export const backgroundGradient = function (
    styleObj: BackgroundGradientTypesOfStyleItems
): resultType {
    //渐变类型,线性或径向
    let type: 'linear-gradient' | 'radial-gradient' = 'linear-gradient';

    // 临时傀儡数据
    const puppet: { [keys: string]: any[] } = {
        moz: [],
        webkit: [],
        normal: [],
    };

    /**
     * 生成css渐变方法首参，（确定渐变方向/方式）
     * 径向方向时需要修改css方法名为 radial-gradient
     */
    const getCssGradientFun = (directions: any): string => {
        switch (directions) {
            case 'left':
                return 'to right';
            case 'top':
                return 'to bottom';
            case '-45deg':
                return '135deg';
            case 'center':
                type = 'radial-gradient';
                return 'ellipse at center';
            default:
                return directions;
        }
    };

    const { gradientDirections, gradient } = styleObj;
    // step1组装方向到puppet
    if (gradientDirections) {
        puppet.moz[0] = puppet.webkit[0] = gradientDirections;
        puppet.normal[0] = getCssGradientFun(gradientDirections);
    }
    // step2组装位置到puppet
    if (gradient) {
        gradient.forEach(({ color, transition }) => {
            if (color !== undefined && transition !== undefined) {
                const group = `${
                    conversionValue(
                        color,
                        'color',
                        'backgroundGradient',
                        'gradient'
                    ).value
                } ${
                    conversionValue(
                        transition,
                        'transition',
                        'backgroundGradient',
                        'gradient'
                    ).value
                }`;
                puppet.moz.push(group);
                puppet.webkit.push(group);
                puppet.normal.push(group);
            }
        });
    }
    // 无值时
    if (
        puppet.moz.length === 0 ||
        puppet.webkit.length === 0 ||
        puppet.normal.length === 0
    ) {
        return {
            result: {},
            string: '',
        };
    }
    // 组装css
    const result: objType = {};
    let prefixResult = [];
    for (const key in puppet) {
        if (Object.prototype.hasOwnProperty.call(puppet, key)) {
            const resultItem = puppet[key].join(', ');

            if (key === 'normal') {
                prefixResult.push(`background: ${type}(${resultItem});`);
                result[`background`] = `${type}(${resultItem})`;
            } else {
                prefixResult.push(
                    `background: -${key}-${type}(${resultItem});`
                );
            }
        }
    }

    return {
        result,
        string: prefixResult.join(' '),
    };
};

interface BorderCompil extends BorderTypesOfStyleItems {
    position?: string[];
}

export const border = function (styleObj: BorderTypesOfStyleItems): resultType {
    // border-radius: {radiusTopLeft} {radiusTopRight} {radiusBottomLeft} {radiusBottomRight};
    // border{borderPosition}: {borderWidth} {borderStyle} {borderColor};

    const unitType = [
        'radiusTopLeft',
        'radiusTopRight',
        'radiusBottomLeft',
        'radiusBottomRight',
        'borderWidth',
    ];

    const result: BorderCompil = {};
    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            if (unitType.includes(key)) {
                // 编译处理结果
                const val = compileValue(element);
                if (val) {
                    result[key] = val;
                }
            } else if (key === 'borderPosition') {
                const arr: any = Object.keys(element).filter(
                    (item) => element[item] !== false
                );
                result.position = arr;
                // element
            } else {
                if (element) {
                    result[key] = element;
                }
            }
        }
    }

    const values: any = {};
    const borderRadiusArrays = [
        result.radiusTopLeft || 0,
        result.radiusTopRight || 0,
        result.radiusBottomRight || 0,
        result.radiusBottomLeft || 0,
    ];
    if (borderRadiusArrays.filter((item) => item !== 0)) {
        values.borderRadius = borderRadiusArrays.join(' ');
    }

    if (result.position?.length !== 0) {
        result.position?.forEach((item) => {
            values[item] = [
                result.borderWidth || '',
                result.borderStyle || '',
                result.borderColor,
            ].join(' ');
        });
    }

    return {
        result: values,
        string: createInlineStyles(values) || '',
    };
};

export const boxShadow = function (
    boxShadowArray: (BoxShadowTypesOfStyleItems & { hiddenItem: boolean })[]
): resultType {
    const position: objType = {
        inset: 0,
        shiftRight: 1,
        shiftDown: 2,
        blur: 3,
        spread: 4,
        color: 5,
    };

    const rules: any[] = [];
    const unitType: string[] = ['blur', 'shiftDown', 'shiftRight', 'spread'];

    boxShadowArray.forEach((boxShadowItem: objType) => {
        let rule: any[] = [];
        rule.length = 6;
        for (const key in boxShadowItem) {
            if (Object.prototype.hasOwnProperty.call(boxShadowItem, key)) {
                const element = boxShadowItem[key];
                if (unitType.includes(key)) {
                    // 编译处理结果
                    const val = compileValue(element);
                    if (val) {
                        rule[position[key]] = val;
                    }
                } else if (key !== 'hiddenItem') {
                    if (element || element === false) {
                        rule[position[key]] = element;
                    }
                }
            }
        }

        rule[0] = !!rule[0] ? 'inset' : null;

        if (!rule[1]) rule[1] = '0';
        if (!rule[2]) rule[2] = '0';
        if (!rule[3]) rule[3] = '0';
        if (!rule[4]) rule[4] = '0';
        if (rule[5]) {
            rules.push(rule.filter((e) => !!e).join(' '));
        }
    });

    const result: objType = {};
    result.boxShadow = rules.join(', ');

    const prefixResult = [];
    const str = createInlineStyles(result);
    prefixResult.push(`-webkit-${str}`);
    prefixResult.push(str);

    return {
        result,
        string: prefixResult.join(''),
    };
};

export const textShadow = function (textShadowArray: objType): resultType {
    // -webkit-text-shadow:{shiftRight} {blur} {shiftDown} {color};
    // text-shadow:{shiftRight} {shiftDown} {blur} {color};
    const position: {
        [keys: string]: any;
    } = {
        shiftRight: 0,
        shiftDown: 1,
        blur: 2,
        color: 3,
    };

    const rules: any[] = [];
    const unitType: string[] = ['blur', 'shiftDown', 'shiftRight'];

    textShadowArray.forEach((textShadowItem: objType) => {
        let rule: any[] = [];
        rule.length = 4;
        for (const key in textShadowItem) {
            if (Object.prototype.hasOwnProperty.call(textShadowItem, key)) {
                const element = textShadowItem[key];
                if (unitType.includes(key)) {
                    // 编译处理结果
                    const val = compileValue(element);
                    if (val) {
                        rule[position[key]] = val;
                    }
                } else if (key !== 'hiddenItem') {
                    if (element || element === false) {
                        rule[position[key]] = element;
                    }
                }
            }
        }

        if (!rule[0]) rule[0] = '0';
        if (!rule[1]) rule[1] = '0';
        if (!rule[2]) rule[2] = '0';
        if (rule[3]) {
            rules.push(rule.filter((e) => !!e).join(' '));
        }
    });

    const result: {
        [keys: string]: any;
    } = {};
    result.textShadow = rules.join(', ');

    const str = createInlineStyles(result);
    const prefixResult = [];
    prefixResult.push(`-webkit-${str}`);
    prefixResult.push(str);

    return {
        result,
        string: prefixResult.join(''),
    };
};

export const transform = function (styleObj: objType): resultType {
    const position: objType = {
        scale: 0,
        rotate: 1,
        translate: 2,
        skew: 3,
    };
    const singleProp: objType = {
        scale: (value: string) => `scale(${value})`,
        rotate: (value: string) => `rotate(${value}deg)`,
    };
    const unitType: string[] = ['translateX', 'translateY'];
    const rules: any[] = [];
    let translateRule: any[] = [null, null];
    let skewRule: any[] = [null, null];

    rules.length = 4;
    const result: objType = {};
    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            if (unitType.includes(key)) {
                // 编译处理结果
                const val = compileValue(element);
                if (val) {
                    // {translateX}, {translateY}) skew({skewX}, {skewY}
                    if (key === 'translateX') translateRule[0] = val;
                    if (key === 'translateY') translateRule[1] = val;
                }
            } else {
                if (element) {
                    if (singleProp[key]) {
                        rules[position[key]] = singleProp[key](element);
                    }
                    if (key === 'skewX') skewRule[0] = `${element}deg`;
                    if (key === 'skewY') skewRule[1] = `${element}deg`;
                }
            }
        }
    }
    
    let translate, skew;
    translate = translateRule
        .map((item) => {
            if (!item) {
                return '0';
            }
            return item;
        })
        .join(', ');

    skew = skewRule
        .map((item) => {
            if (!item) {
                return '0';
            }
            return item;
        })
        .join(', ');

    if (translate !== '0, 0')
        rules[position['translate']] = `translate(${translate})`;
    if (skew !== '0, 0') rules[position['skew']] = `skew(${skew})`;
    result['transform'] = rules.filter((item) => !!item).join(' ');
    const str = createInlineStyles(result);
    const prefixResult = [];
    prefixResult.push(`-moz-${str}`);
    prefixResult.push(`-webkit-${str}`);
    prefixResult.push(str);
    console.log('result', result);
    
    return {
        result,
        string: prefixResult.join(' '),
    };
};
