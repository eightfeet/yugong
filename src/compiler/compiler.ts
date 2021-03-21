import description from "./description";
import { createInlineStyles } from "@eightfeet/modal";
import { store } from "~/redux/store";
import unitToPx from "~/core/unitToPx";

interface objType {
  [key: string]: any;
}

interface resultType {
  result: objType;
  string: string;
}

export const pxToRem = (value: number) => {
  const rootFontsize = window
    .getComputedStyle(document.body)
    .getPropertyValue("font-size")
    .replace("px", "");
  return value / Number(rootFontsize);
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
  const unit = store.getState().controller.unit;
  // 转换单位
  const toUnit = store.getState().controller.toUnit;

  // step1：将value值转化为px单位值
  const pxNumValue = unitToPx(`${value}${unit || ""}`);
  // step2：value px单位转换为 toUnit单位
  let unitNumValue = 0;
  switch (toUnit) {
    case "px":
      unitNumValue = pxNumValue;
      break;
    case "rem":
      unitNumValue = pxToRem(pxNumValue);
      break;
    case "vh":
      unitNumValue = pxToVh(pxNumValue);
      break;
    case "vw":
      unitNumValue = pxToVh(pxNumValue);
      break;
    default:
      unitNumValue = pxNumValue;
  }

  return { value: `${unitNumValue}${toUnit || "px"}`, unit: toUnit || "px" };
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
  const unit = store.getState().controller.unit;
  if (value === undefined || value === null) {
    // 空值处理
    return { value: undefined, unit: undefined };
  } else if (descUnit === unit) {
    // 此单位变量可编辑等待处理
    return changeToUnit(value); // 处理可编辑单位值
  } else {
    // 其他处理
    return { value: `${value}${descUnit || ""}`, unit: descUnit };
  }
};

export const display = function (styleObj: objType): resultType {
  const result: objType = {};
  for (const key in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
      const element = styleObj[key];
      let newKey = key;
      if (key === "margin" || key === "padding") {
        const data = element.map((el: any) => {
          const val = parseInt(el, 10);
          if (isNaN(val)) {
            return el || 0;
          } else {
            return changeToUnit(el).value;
          }
        });
        result[newKey] = data.join(" ");
      } else {
        result[newKey] = conversionValue(element, key, "display").value;
      }
    }
  }
  return {
    result,
    string: createInlineStyles(result) || "",
  };
};

export const backgroundGradient = function (styleObj: objType): resultType {
  let type: string = "linear-gradient";
  const result: objType = {};

  const puppet: objType = {
    moz: [null],
    webkit: [null],
    normal: [null],
  };

  const getParame0 = (element: any): string => {
    if (element === "left") return "to right";
    if (element === "top") return "to bottom";
    if (element === "-45deg") return "135deg";
    if (element === "center") {
      type = "radial-gradient";
      return "ellipse at center";
    }
    return element;
  };

  for (const key in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
      const element = styleObj[key];
      if (key === "gradientDirections") {
        puppet.moz[0] = puppet.webkit[0] = element;
        puppet.normal[0] = getParame0(element);
      }

      if (key === "gradient") {
        (element as any[]).forEach(({ color, transition }) => {
          if (color !== undefined && transition !== undefined) {
            const group = `${
              conversionValue(color, "color", "backgroundGradient", "gradient")
                .value
            } ${
              conversionValue(
                transition,
                "transition",
                "backgroundGradient",
                "gradient"
              ).value
            }`;
            puppet.moz.push(group);
            puppet.webkit.push(group);
            puppet.normal.push(group);
          }
        });
      }
    }
  }

  let prefixResult = [];
  for (const key in puppet) {
    if (Object.prototype.hasOwnProperty.call(puppet, key)) {
      const resultItem = puppet[key].join(", ");

      if (key === "normal") {
        prefixResult.push(`background: ${type}(${resultItem});`);
        result[`background`] = `${type}(${resultItem})`;
      } else {
        prefixResult.push(`background: -${key}-${type}(${resultItem});`);
      }
    }
  }

  return {
    result,
    string: prefixResult.join(" "),
  };
};

export const backgroundCommon = function (styleObj: objType): resultType {
  const rules: { background: any[]; backgroundSize: any[] } = {
    background: [
      null /*backgroundColor*/,
      null /*imageUrl*/,
      null /*repeat*/,
      null /*positionX*/,
      null /*positionY*/,
    ],
    backgroundSize: [null /*sizeX*/, null /*sizeY*/],
  };

  const BGposition: objType = {
    backgroundColor: 0,
    imageUrl: 1,
    repeat: 2,
    positionX: 3,
    positionY: 4,
  };
  const BGSbackgroundSize: objType = {
    sizeX: 0,
    sizeY: 1,
  };

  let positionUnit, sizeXUnit;

  for (const key in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
      const element = styleObj[key];
      const data = conversionValue(element, key, "backgroundCommon");
      if (key === "positionX" || key === "positionY") {
        positionUnit = data.unit || "";
      }
      if (key === "sizeX" || key === "sizeY") {
        sizeXUnit = data.unit || "";
      }
      if (BGposition[key] !== undefined) {
        if (key === "imageUrl") {
          rules.background[BGposition[key]] = `url("${data.value}")`;
        } else {
          rules.background[BGposition[key]] = data.value;
        }
      }
      if (BGSbackgroundSize[key] !== undefined) {
        rules.backgroundSize[BGSbackgroundSize[key]] = data.value;
      }
    }
  }

  const result: objType = {};
  if (rules.background[1]) {
    // imageUrl
    if (
      (!rules.background[3] || rules.background[3] === positionUnit) &&
      rules.background[4]
    ) {
      // positionX positionY
      rules.background[3] = "0%";
    }
    if (
      (!rules.background[4] || rules.background[4] === positionUnit) &&
      rules.background[3]
    ) {
      rules.background[4] = "0%";
    }

    if (
      (!rules.backgroundSize[0] || rules.backgroundSize[0] === sizeXUnit) &&
      rules.backgroundSize[1]
    ) {
      rules.backgroundSize[0] = "auto";
    }
    if (
      (!rules.backgroundSize[1] || rules.backgroundSize[1] === sizeXUnit) &&
      rules.backgroundSize[0]
    ) {
      rules.backgroundSize[1] = "auto";
    }
  } else {
    rules.background[2] = rules.background[3] = rules.background[4] = null;
  }

  result.background = rules.background.filter((item) => !!item).join(" ");
  if (
    rules.background[1] &&
    rules.backgroundSize[0] &&
    rules.backgroundSize[1]
  ) {
    result.backgroundSize = rules.backgroundSize
      .filter((item) => !!item)
      .join(" ");
  }

  return {
    result,
    string: createInlineStyles(result) || "",
  };
};

export const border = function (styleObj: objType): resultType {
  // border-radius: {radiusTopLeft} {radiusTopRight} {radiusBottomLeft} {radiusBottomRight};
  // border{borderPosition}: {borderWidth} {borderStyle} {borderColor};
  let type = "";
  const rules: {
    borderRadius: any[];
    border: any[];
  } = {
    borderRadius: [
      null /*radiusTopLeft*/,
      null /*radiusTopRight*/,
      null /*radiusBottomLeft*/,
      null /*radiusBottomRight*/,
    ],
    border: [null /*borderWidth*/, null /*borderStyle*/, null /*borderColor*/],
  };
  const BRPosition: objType = {
    radiusTopLeft: 0,
    radiusTopRight: 1,
    radiusBottomLeft: 2,
    radiusBottomRight: 3,
  };
  const BPosition: objType = {
    borderWidth: 0,
    borderStyle: 1,
    borderColor: 2,
  };

  for (const key in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
      const element = styleObj[key];
      const value = conversionValue(element, key, "border").value;
      if (BRPosition[key] !== undefined) {
        rules["borderRadius"][BRPosition[key]] = value;
      }
      if (BPosition[key] !== undefined) {
        rules["border"][BPosition[key]] = value;
      }
    }
  }

  const result: objType = {};
  rules.borderRadius.forEach((element, i) => {
    if (element === null || element === undefined) rules.borderRadius[i] = "0";
  });
  const brJoined = rules.borderRadius.join(" ");

  if (brJoined !== "0 0 0 0") {
    result.borderRadius = rules.borderRadius.join(" ");
  }

  const { borderTop, borderRight, borderBottom, borderLeft, border } =
    styleObj.borderPosition || {};
  const boderCss = rules.border.filter((item) => !!item).join(" ");
  if (border) {
    result[`border${type}`] = boderCss;
  } else {
    if (borderTop) result["borderTop"] = boderCss;
    if (borderRight) result["borderRight"] = boderCss;
    if (borderBottom) result["borderBottom"] = boderCss;
    if (borderLeft) result["borderLeft"] = boderCss;
  }

  return {
    result,
    string: createInlineStyles(result) || "",
  };
};

export const boxShadow = function (styleObj: objType): resultType {
  // -webkit-box-shadow:{inset} {shiftRight} {shiftDown} {spread} {blur} {color};
  // box-shadow:{inset} {shiftRight} {shiftDown} {spread} {blur} {color};

  const position: objType = {
    inset: 0,
    shiftRight: 1,
    shiftDown: 2,
    blur: 3,
    spread: 4,
    color: 5,
  };

  const rules: any[] = [];

  (window as any).rules = rules;

  styleObj.forEach((SDitem: objType) => {
    let rule: any[] = [];
    rule.length = 6;
    for (const key in SDitem) {
      if (Object.prototype.hasOwnProperty.call(SDitem, key)) {
        const element = SDitem[key];
        const value = conversionValue(element, key, "boxShadow").value;
        rule[position[key]] = value;
      }
    }

    if (rule[0] === "true") {
      rule[0] = "inset";
    }
    if (rule[0] === "false") {
      rule[0] = null;
    }
    if (!rule[1]) rule[1] = "0";
    if (!rule[2]) rule[2] = "0";
    if (!rule[3]) rule[3] = "0";
    if (!rule[4]) rule[4] = "0";
    if (rule[5]) {
      rules.push(rule.filter((e) => !!e).join(" "));
    }
  });

  const result: objType = {};
  result.boxShadow = rules.join(", ");

  const prefixResult = [];
  const str = createInlineStyles(result);
  prefixResult.push(`-webkit-${str}`);
  prefixResult.push(str);

  return {
    result,
    string: prefixResult.join(""),
  };
};

export const textShadow = function (styleObj: objType): resultType {
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

  (window as any).rules = rules;

  styleObj.forEach((TSDitem: objType) => {
    let rule: any[] = [];
    rule.length = 4;
    for (const key in TSDitem) {
      if (Object.prototype.hasOwnProperty.call(TSDitem, key)) {
        const element = TSDitem[key];
        const value = conversionValue(element, key, "textShadow").value;
        rule[position[key]] = value;
      }
    }
    if (!rule[0]) rule[0] = "0";
    if (!rule[1]) rule[1] = "0";
    if (!rule[2]) rule[2] = "0";
    if (rule[3]) {
      rules.push(rule.filter((e) => !!e).join(" "));
    }
  });

  const result: {
    [keys: string]: any;
  } = {};
  result.textShadow = rules.join(", ");

  const str = createInlineStyles(result);
  const prefixResult = [];
  prefixResult.push(`-webkit-${str}`);
  prefixResult.push(str);

  return {
    result,
    string: prefixResult.join(""),
  };
};

export const font = function (styleObj: objType): resultType {
  const rules: objType = {
    fontStyle: "fontStyle",
    fontWeight: "fontWeight",
    fontSize: "fontSize",
    lineHeight: "lineHeight",
    color: "color",
    letterSP: "letterSpacing",
    wordSp: "wordSpacing",
    decoration: "textDecoration",
    align: "textAlign",
  };
  const result: objType = {};
  for (const key in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
      const element = styleObj[key];
      const value = conversionValue(element, key, "font").value;
      if (value) {
        result[rules[key]] = value;
      }
    }
  }

  const str = createInlineStyles(result) || "";

  return {
    result,
    string: str,
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
    rotate: (value: string) => `rotate(${value})`,
  };
  const rules: any[] = [];
  let translateRule: any[] = [null, null];
  let skewRule: any[] = [null, null];

  rules.length = 4;
  const result: objType = {};
  for (const key in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
      const element = styleObj[key];
      const value = conversionValue(element, key, "transform").value;
      if (value) {
        if (singleProp[key]) {
          rules[position[key]] = singleProp[key](value);
        }
        // {translateX}, {translateY}) skew({skewX}, {skewY}
        if (key === "translateX") translateRule[0] = value;
        if (key === "translateY") translateRule[1] = value;
        if (key === "skewX") skewRule[0] = value;
        if (key === "skewY") skewRule[1] = value;
      }
    }
  }

  let translate, skew;

  translate = translateRule
    .map((item) => {
      if (!item) {
        return "0";
      }
      return item;
    })
    .join(", ");

  skew = skewRule
    .map((item) => {
      if (!item) {
        return "0";
      }
      return item;
    })
    .join(", ");

  if (translate !== "0, 0")
    rules[position["translate"]] = `translate(${translate})`;
  if (skew !== "0, 0") rules[position["skew"]] = `skew(${skew})`;

  result["transform"] = rules.filter((item) => !!item).join(" ");

  const str = createInlineStyles(result);
  const prefixResult = [];
  prefixResult.push(`-moz-${str}`);
  prefixResult.push(`-webkit-${str}`);
  prefixResult.push(str);

  return {
    result,
    string: prefixResult.join(" "),
  };
};
