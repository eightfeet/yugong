(this.webpackJsonpyugong=this.webpackJsonpyugong||[]).push([[51],{848:function(n,e,t){"use strict";var i=t(7),o=t(5);Object.defineProperty(e,"__esModule",{value:!0}),e.warning=function(n,e){(0,l.default)(n,"[@ant-design/icons] ".concat(e))},e.isIconDefinition=function(n){return"object"===(0,r.default)(n)&&"string"===typeof n.name&&"string"===typeof n.theme&&("object"===(0,r.default)(n.icon)||"function"===typeof n.icon)},e.normalizeAttrs=d,e.generate=function n(e,t,i){if(!i)return s.default.createElement(e.tag,(0,a.default)({key:t},d(e.attrs)),(e.children||[]).map((function(i,o){return n(i,"".concat(t,"-").concat(e.tag,"-").concat(o))})));return s.default.createElement(e.tag,(0,a.default)((0,a.default)({key:t},d(e.attrs)),i),(e.children||[]).map((function(i,o){return n(i,"".concat(t,"-").concat(e.tag,"-").concat(o))})))},e.getSecondaryColor=function(n){return(0,c.generate)(n)[0]},e.normalizeTwoToneColors=function(n){if(!n)return[];return Array.isArray(n)?n:[n]},e.useInsertStyles=e.iconStyles=e.svgBaseProps=void 0;var a=o(t(8)),r=o(t(109)),c=t(256),s=i(t(0)),l=o(t(1011)),f=t(849),u=o(t(844));function d(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(n).reduce((function(e,t){var i=n[t];if("class"===t)e.className=i,delete e.class;else e[t]=i;return e}),{})}e.svgBaseProps={width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",focusable:"false"};var g="\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";e.iconStyles=g;e.useInsertStyles=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,e=(0,s.useContext)(u.default),t=e.csp;(0,s.useEffect)((function(){(0,f.updateCSS)(n,"@ant-design-icons",{prepend:!0,csp:t})}),[])}}}]);