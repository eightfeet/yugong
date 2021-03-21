/*(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.unitToPx = factory());
})(this, function(){});*/

// cache con, el for reused
let con: HTMLDivElement, el: HTMLDivElement;
// high sample will more accurate?
const sample = 100;

function initElements() {
  con = document.createElement("div");
  con.style.position = "absolute";
  con.style.width = "0";
  con.style.height = "0";
  con.style.visibility = "hidden";
  con.style.overflow = "hidden";
  el = document.createElement("div");
  con.appendChild(el);
}

function pxPerUnit(unit: string, element: any) {
  if (!con) {
    initElements();
  }
  el.style.width = `${sample}${unit}`;
  (element || document.body).appendChild(con);
  // 获取100采样单位的真实宽高
  const dimension = el.getBoundingClientRect();
  // 删除采样元素
  con?.parentNode?.removeChild(con);
  return dimension.width / sample;
}

function toPx(length: string, element?: any) {
  var unitRe = /^\s*([+-]?[\d\.]*)\s*(.*)\s*$/i;
  var match = unitRe.exec(length);
  let valid = undefined,
    unit = '',
    val = 0;
  if (match != null && match.length > 2) {
    var bare = match[1] === "";
    val = bare ? 1 : Number(match[1]);
    unit = match[2];
    valid = !isNaN(val) && unit;
  }
  if (!valid) {
    throw new TypeError("Error parsing length");
  }
  return unit === "px" ? val : pxPerUnit(unit, element) * val;
}

export default toPx;
