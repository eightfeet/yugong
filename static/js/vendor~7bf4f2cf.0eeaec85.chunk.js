(this.webpackJsonpyugong=this.webpackJsonpyugong||[]).push([[45],{985:function(t,e,n){"use strict";var o=n(492),s=n(892),i=n(0),r=n.n(i),p=n(735);function a(t,e){var n={};return e.forEach((function(e){n[e]=t[e]})),n}function h(t){return"function"===typeof t}var c=n(816),u=n.n(c),l=function(t){function e(e){var n=t.call(this,e)||this;return n.echarts=s,n}return Object(o.b)(e,t),e}(function(t){function e(e){var n=t.call(this,e)||this;return n.echarts=e.echarts,n.ele=null,n}return Object(o.b)(e,t),e.prototype.componentDidMount=function(){this.renderNewEcharts()},e.prototype.componentDidUpdate=function(t){var e=this.props.shouldSetOption;if(!h(e)||e(t,this.props)){if(!u()(t.theme,this.props.theme)||!u()(t.opts,this.props.opts)||!u()(t.onEvents,this.props.onEvents))return this.dispose(),void this.renderNewEcharts();var n=["option","notMerge","lazyUpdate","showLoading","loadingOption"];if(!u()(a(this.props,n),a(t,n))){var o=this.updateEChartsOption();if(!u()(t.style,this.props.style)||!u()(t.className,this.props.className))try{o.resize()}catch(s){console.warn(s)}}}},e.prototype.componentWillUnmount=function(){this.dispose()},e.prototype.getEchartsInstance=function(){return this.echarts.getInstanceByDom(this.ele)||this.echarts.init(this.ele,this.props.theme,this.props.opts)},e.prototype.dispose=function(){if(this.ele){try{Object(p.clear)(this.ele)}catch(t){console.warn(t)}this.echarts.dispose(this.ele)}},e.prototype.renderNewEcharts=function(){var t=this.props,e=t.onEvents,n=t.onChartReady,o=this.updateEChartsOption();this.bindEvents(o,e||{}),h(n)&&n(o),this.ele&&Object(p.bind)(this.ele,(function(){try{o.resize()}catch(t){console.warn(t)}}))},e.prototype.bindEvents=function(t,e){function n(e,n){"string"===typeof e&&h(n)&&t.on(e,(function(e){n(e,t)}))}for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n(o,e[o])},e.prototype.updateEChartsOption=function(){var t=this.props,e=t.option,n=t.notMerge,o=void 0!==n&&n,s=t.lazyUpdate,i=void 0!==s&&s,r=t.showLoading,p=t.loadingOption,a=void 0===p?null:p,h=this.getEchartsInstance();return h.setOption(e,o,i),r?h.showLoading(a):h.hideLoading(),h},e.prototype.render=function(){var t=this,e=this.props,n=e.style,s=e.className,i=void 0===s?"":s,p=Object(o.a)({height:300},n);return r.a.createElement("div",{ref:function(e){t.ele=e},style:p,className:"echarts-for-react "+i})},e}(i.PureComponent));e.a=l}}]);