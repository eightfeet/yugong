(this.webpackJsonpyugong=this.webpackJsonpyugong||[]).push([[66,166,236],{748:function(t,e,o){"use strict";var i=o(4),n=function(t){function e(){var o=null!==t&&t.apply(this,arguments)||this;return o.type=e.type,o}return Object(i.b)(e,t),e.type="tooltip",e.dependencies=["axisPointer"],e.defaultOption={zlevel:0,z:60,show:!0,showContent:!0,trigger:"item",triggerOn:"mousemove|click",alwaysShowContent:!1,displayMode:"single",renderMode:"auto",confine:null,showDelay:0,hideDelay:100,transitionDuration:.4,enterable:!1,backgroundColor:"#fff",shadowBlur:10,shadowColor:"rgba(0, 0, 0, .2)",shadowOffsetX:1,shadowOffsetY:2,borderRadius:4,borderWidth:1,padding:null,extraCssText:"",axisPointer:{type:"line",axis:"auto",animation:"auto",animationDurationUpdate:200,animationEasingUpdate:"exponentialOut",crossStyle:{color:"#999",width:1,type:"dashed",textStyle:{}}},textStyle:{color:"#666",fontSize:14}},e}(o(29).a);e.a=n},787:function(t,e,o){"use strict";var i=o(4),n=o(0),s=o(31),r=o(50),a=o(61),h=o(387),l=o(41),d=o(214),p=o(57),u=Object(d.e)(d.b,"transition"),f=Object(d.e)(d.a,"transform"),c="position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;"+(s.a.transform3dSupported?"will-change:transform;":"");function g(t,e,o){var i=t.toFixed(0)+"px",n=e.toFixed(0)+"px";if(!s.a.transformSupported)return o?"top:"+n+";left:"+i+";":[["top",n],["left",i]];var r=s.a.transform3dSupported,a="translate"+(r?"3d":"")+"("+i+","+n+(r?",0":"")+")";return o?"top:0;left:0;"+f+":"+a+";":[["top",0],["left",0],[d.a,a]]}function y(t,e,o){var i=[],a=t.get("transitionDuration"),h=t.get("backgroundColor"),d=t.get("shadowBlur"),c=t.get("shadowColor"),g=t.get("shadowOffsetX"),y=t.get("shadowOffsetY"),_=t.getModel("textStyle"),m=Object(p.d)(t,"html"),x=g+"px "+y+"px "+d+"px "+c;return i.push("box-shadow:"+x),e&&a&&i.push(function(t,e){var o="cubic-bezier(0.23,1,0.32,1)",i=" "+t/2+"s "+o,n="opacity"+i+",visibility"+i;return e||(i=" "+t+"s "+o,n+=s.a.transformSupported?","+f+i:",left"+i+",top"+i),u+":"+n}(a,o)),h&&(s.a.canvasSupported?i.push("background-color:"+h):(i.push("background-color:#"+Object(r.toHex)(h)),i.push("filter:alpha(opacity=70)"))),Object(n.each)(["width","color","radius"],(function(e){var o="border-"+e,n=Object(l.k)(o),s=t.get(n);null!=s&&i.push(o+":"+s+("color"===e?"":"px"))})),i.push(function(t){var e=[],o=t.get("fontSize"),i=t.getTextColor();i&&e.push("color:"+i),e.push("font:"+t.getFont()),o&&e.push("line-height:"+Math.round(3*o/2)+"px");var s=t.get("textShadowColor"),r=t.get("textShadowBlur")||0,a=t.get("textShadowOffsetX")||0,h=t.get("textShadowOffsetY")||0;return s&&r&&e.push("text-shadow:"+a+"px "+h+"px "+r+"px "+s),Object(n.each)(["decoration","align"],(function(o){var i=t.get(o);i&&e.push("text-"+o+":"+i)})),e.join(";")}(_)),null!=m&&i.push("padding:"+Object(l.j)(m).join("px ")+"px"),i.join(";")+";"}function _(t,e,o,i,n){var s=e&&e.painter;if(o){var r=s&&s.getViewportRoot();r&&Object(h.c)(t,r,document.body,i,n)}else{t[0]=i,t[1]=n;var a=s&&s.getViewportRootOffset();a&&(t[0]+=a.offsetLeft,t[1]+=a.offsetTop)}t[2]=t[0]/e.getWidth(),t[3]=t[1]/e.getHeight()}var m=function(){function t(t,e,o){if(this._show=!1,this._styleCoord=[0,0,0,0],this._enterable=!0,this._firstShow=!0,this._longHide=!0,s.a.wxa)return null;var i=document.createElement("div");i.domBelongToZr=!0,this.el=i;var n=this._zr=e.getZr(),r=this._appendToBody=o&&o.appendToBody;_(this._styleCoord,n,r,e.getWidth()/2,e.getHeight()/2),r?document.body.appendChild(i):t.appendChild(i),this._container=t;var h=this;i.onmouseenter=function(){h._enterable&&(clearTimeout(h._hideTimeout),h._show=!0),h._inContent=!0},i.onmousemove=function(t){if(t=t||window.event,!h._enterable){var e=n.handler,o=n.painter.getViewportRoot();Object(a.e)(o,t,!0),e.dispatch("mousemove",t)}},i.onmouseleave=function(){h._inContent=!1,h._enterable&&h._show&&h.hideLater(h._hideDelay)}}return t.prototype.update=function(t){var e=this._container,o=Object(d.c)(e,"position"),i=e.style;"absolute"!==i.position&&"absolute"!==o&&(i.position="relative"),t.get("alwaysShowContent")&&this._moveIfResized(),this.el.className=t.get("className")||""},t.prototype.show=function(t,e){clearTimeout(this._hideTimeout),clearTimeout(this._longHideTimeout);var o=this.el,i=o.style,n=this._styleCoord;o.innerHTML?i.cssText=c+y(t,!this._firstShow,this._longHide)+g(n[0],n[1],!0)+"border-color:"+Object(l.c)(e)+";"+(t.get("extraCssText")||"")+";pointer-events:"+(this._enterable?"auto":"none"):i.display="none",this._show=!0,this._firstShow=!1,this._longHide=!1},t.prototype.setContent=function(t,e,o,i,s){var r=this.el;if(null!=t){var a="";if(Object(n.isString)(s)&&"item"===o.get("trigger")&&!Object(d.d)(o)&&(a=function(t,e,o){if(!Object(n.isString)(o)||"inside"===o)return"";var i=t.get("backgroundColor"),s=t.get("borderWidth");e=Object(l.c)(e);var r,a,h="left"===(r=o)?"right":"right"===r?"left":"top"===r?"bottom":"top",d=Math.max(1.5*Math.round(s),6),p="",u=f+":";Object(n.indexOf)(["left","right"],h)>-1?(p+="top:50%",u+="translateY(-50%) rotate("+(a="left"===h?-225:-45)+"deg)"):(p+="left:50%",u+="translateX(-50%) rotate("+(a="top"===h?225:45)+"deg)");var c=a*Math.PI/180,g=d+s,y=g*Math.abs(Math.cos(c))+g*Math.abs(Math.sin(c)),_=e+" solid "+s+"px;";return'<div style="'+["position:absolute;width:"+d+"px;height:"+d+"px;",(p+=";"+h+":-"+Math.round(100*((y-Math.SQRT2*s)/2+Math.SQRT2*s-(y-g)/2))/100+"px")+";"+u+";","border-bottom:"+_,"border-right:"+_,"background-color:"+i+";"].join("")+'"></div>'}(o,i,s)),Object(n.isString)(t))r.innerHTML=t+a;else if(t){r.innerHTML="",Object(n.isArray)(t)||(t=[t]);for(var h=0;h<t.length;h++)Object(n.isDom)(t[h])&&t[h].parentNode!==r&&r.appendChild(t[h]);if(a&&r.childNodes.length){var p=document.createElement("div");p.innerHTML=a,r.appendChild(p)}}}else r.innerHTML=""},t.prototype.setEnterable=function(t){this._enterable=t},t.prototype.getSize=function(){var t=this.el;return[t.offsetWidth,t.offsetHeight]},t.prototype.moveTo=function(t,e){var o=this._styleCoord;if(_(o,this._zr,this._appendToBody,t,e),null!=o[0]&&null!=o[1]){var i=this.el.style,s=g(o[0],o[1]);Object(n.each)(s,(function(t){i[t[0]]=t[1]}))}},t.prototype._moveIfResized=function(){var t=this._styleCoord[2],e=this._styleCoord[3];this.moveTo(t*this._zr.getWidth(),e*this._zr.getHeight())},t.prototype.hide=function(){var t=this,e=this.el.style;e.visibility="hidden",e.opacity="0",s.a.transform3dSupported&&(e.willChange=""),this._show=!1,this._longHideTimeout=setTimeout((function(){return t._longHide=!0}),500)},t.prototype.hideLater=function(t){!this._show||this._inContent&&this._enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(Object(n.bind)(this.hide,this),t)):this.hide())},t.prototype.isShow=function(){return this._show},t.prototype.dispose=function(){this.el.parentNode.removeChild(this.el)},t}(),x=o(100),v=o(34);function b(t){return Math.max(0,t)}function w(t){var e=b(t.shadowBlur||0),o=b(t.shadowOffsetX||0),i=b(t.shadowOffsetY||0);return{left:b(e-o),right:b(e+o),top:b(e-i),bottom:b(e+i)}}function T(t,e,o,i){t[0]=o,t[1]=i,t[2]=t[0]/e.getWidth(),t[3]=t[1]/e.getHeight()}var C=function(){function t(t){this._show=!1,this._styleCoord=[0,0,0,0],this._enterable=!0,this._zr=t.getZr(),T(this._styleCoord,this._zr,t.getWidth()/2,t.getHeight()/2)}return t.prototype.update=function(t){t.get("alwaysShowContent")&&this._moveIfResized()},t.prototype.show=function(){this._hideTimeout&&clearTimeout(this._hideTimeout),this.el.show(),this._show=!0},t.prototype.setContent=function(t,e,o,i,s){n.isObject(t)&&Object(v.c)(""),this.el&&this._zr.remove(this.el);var r=o.getModel("textStyle");this.el=new x.a({style:{rich:e.richTextStyles,text:t,lineHeight:22,backgroundColor:o.get("backgroundColor"),borderRadius:o.get("borderRadius"),borderWidth:1,borderColor:i,shadowColor:o.get("shadowColor"),shadowBlur:o.get("shadowBlur"),shadowOffsetX:o.get("shadowOffsetX"),shadowOffsetY:o.get("shadowOffsetY"),textShadowColor:r.get("textShadowColor"),textShadowBlur:r.get("textShadowBlur")||0,textShadowOffsetX:r.get("textShadowOffsetX")||0,textShadowOffsetY:r.get("textShadowOffsetY")||0,fill:o.get(["textStyle","color"]),padding:Object(p.d)(o,"richText"),verticalAlign:"top",align:"left"},z:o.get("z")}),this._zr.add(this.el);var a=this;this.el.on("mouseover",(function(){a._enterable&&(clearTimeout(a._hideTimeout),a._show=!0),a._inContent=!0})),this.el.on("mouseout",(function(){a._enterable&&a._show&&a.hideLater(a._hideDelay),a._inContent=!1}))},t.prototype.setEnterable=function(t){this._enterable=t},t.prototype.getSize=function(){var t=this.el,e=this.el.getBoundingRect(),o=w(t.style);return[e.width+o.left+o.right,e.height+o.top+o.bottom]},t.prototype.moveTo=function(t,e){var o=this.el;if(o){var i=this._styleCoord;T(i,this._zr,t,e),t=i[0],e=i[1];var n=o.style,s=b(n.borderWidth||0),r=w(n);o.x=t+s+r.left,o.y=e+s+r.top,o.markRedraw()}},t.prototype._moveIfResized=function(){var t=this._styleCoord[2],e=this._styleCoord[3];this.moveTo(t*this._zr.getWidth(),e*this._zr.getHeight())},t.prototype.hide=function(){this.el&&this.el.hide(),this._show=!1},t.prototype.hideLater=function(t){!this._show||this._inContent&&this._enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(n.bind(this.hide,this),t)):this.hide())},t.prototype.isShow=function(){return this._show},t.prototype.dispose=function(){this._zr.remove(this.el)},t}(),S=o(5),O=o(92),M=o(489),j=o(25),I=o(47),k=o(283),D=o(58),B=o(112),z=o(6),A=o(51),H=o(33),X=o(22),Y=o(220),P=o(227),R=o(115),L=n.bind,W=n.each,N=S.p,U=new O.a({shape:{x:-1,y:-1,width:2,height:2}}),F=function(t){function e(){var o=null!==t&&t.apply(this,arguments)||this;return o.type=e.type,o}return Object(i.b)(e,t),e.prototype.init=function(t,e){if(!s.a.node){var o=t.getComponent("tooltip"),i=o.get("renderMode");this._renderMode=Object(z.i)(i),this._tooltipContent="richText"===this._renderMode?new C(e):new m(e.getDom(),e,{appendToBody:o.get("appendToBody",!0)})}},e.prototype.render=function(t,e,o){if(!s.a.node){this.group.removeAll(),this._tooltipModel=t,this._ecModel=e,this._api=o,this._alwaysShowContent=t.get("alwaysShowContent");var i=this._tooltipContent;i.update(t),i.setEnterable(t.get("enterable")),this._initGlobalListener(),this._keepShow(),this._updatePosition="html"===this._renderMode?Object(R.c)(L(this._doUpdatePosition,this),50):this._doUpdatePosition}},e.prototype._initGlobalListener=function(){var t=this._tooltipModel.get("triggerOn");k.a("itemTooltip",this._api,L((function(e,o,i){"none"!==t&&(t.indexOf(e)>=0?this._tryShow(o,i):"leave"===e&&this._hide(i))}),this))},e.prototype._keepShow=function(){var t=this._tooltipModel,e=this._ecModel,o=this._api;if(null!=this._lastX&&null!=this._lastY&&"none"!==t.get("triggerOn")){var i=this;clearTimeout(this._refreshUpdateTimeout),this._refreshUpdateTimeout=setTimeout((function(){!o.isDisposed()&&i.manuallyShowTip(t,e,o,{x:i._lastX,y:i._lastY,dataByCoordSys:i._lastDataByCoordSys})}))}},e.prototype.manuallyShowTip=function(t,e,o,i){if(i.from!==this.uid&&!s.a.node){var n=E(i,o);this._ticket="";var r=i.dataByCoordSys,a=function(t,e,o){var i=Object(z.t)(t).queryOptionMap,n=i.keys()[0];if(!n||"series"===n)return;var s,r=Object(z.v)(e,n,i.get(n),{useDefault:!1,enableAll:!1,enableNone:!1}).models[0];if(!r)return;if(o.getViewOfComponentModel(r).group.traverse((function(e){var o=Object(X.a)(e).tooltipConfig;if(o&&o.name===t.name)return s=e,!0})),s)return{componentMainType:n,componentIndex:r.componentIndex,el:s}}(i,e,o);if(a){var h=a.el.getBoundingRect().clone();h.applyTransform(a.el.transform),this._tryShow({offsetX:h.x+h.width/2,offsetY:h.y+h.height/2,target:a.el,position:i.position,positionDefault:"bottom"},n)}else if(i.tooltip&&null!=i.x&&null!=i.y){var l=U;l.x=i.x,l.y=i.y,l.update(),Object(X.a)(l).tooltipConfig={name:null,option:i.tooltip},this._tryShow({offsetX:i.x,offsetY:i.y,target:l},n)}else if(r)this._tryShow({offsetX:i.x,offsetY:i.y,position:i.position,dataByCoordSys:r,tooltipOption:i.tooltipOption},n);else if(null!=i.seriesIndex){if(this._manuallyAxisShowTip(t,e,o,i))return;var d=Object(M.a)(i,e),p=d.point[0],u=d.point[1];null!=p&&null!=u&&this._tryShow({offsetX:p,offsetY:u,target:d.el,position:i.position,positionDefault:"bottom"},n)}else null!=i.x&&null!=i.y&&(o.dispatchAction({type:"updateAxisPointer",x:i.x,y:i.y}),this._tryShow({offsetX:i.x,offsetY:i.y,position:i.position,target:o.getZr().findHover(i.x,i.y).target},n))}},e.prototype.manuallyHideTip=function(t,e,o,i){var n=this._tooltipContent;!this._alwaysShowContent&&this._tooltipModel&&n.hideLater(this._tooltipModel.get("hideDelay")),this._lastX=this._lastY=this._lastDataByCoordSys=null,i.from!==this.uid&&this._hide(E(i,o))},e.prototype._manuallyAxisShowTip=function(t,e,o,i){var n=i.seriesIndex,s=i.dataIndex,r=e.getComponent("axisPointer").coordSysAxesInfo;if(null!=n&&null!=s&&null!=r){var a=e.getSeriesByIndex(n);if(a)if("axis"===V([a.getData().getItemModel(s),a,(a.coordinateSystem||{}).model],this._tooltipModel).get("trigger"))return o.dispatchAction({type:"updateAxisPointer",seriesIndex:n,dataIndex:s,position:i.position}),!0}},e.prototype._tryShow=function(t,e){var o=t.target;if(this._tooltipModel){this._lastX=t.offsetX,this._lastY=t.offsetY;var i=t.dataByCoordSys;if(i&&i.length)this._showAxisTooltip(i,t);else if(o){var n,s;this._lastDataByCoordSys=null,Object(P.a)(o,(function(t){return null!=Object(X.a)(t).dataIndex?(n=t,!0):null!=Object(X.a)(t).tooltipConfig?(s=t,!0):void 0}),!0),n?this._showSeriesItemTooltip(t,n,e):s?this._showComponentItemTooltip(t,s,e):this._hide(e)}else this._lastDataByCoordSys=null,this._hide(e)}},e.prototype._showOrMove=function(t,e){var o=t.get("showDelay");e=n.bind(e,this),clearTimeout(this._showTimout),o>0?this._showTimout=setTimeout(e,o):e()},e.prototype._showAxisTooltip=function(t,e){var o=this._ecModel,i=this._tooltipModel,s=[e.offsetX,e.offsetY],r=V([e.tooltipOption],i),a=this._renderMode,h=[],d=Object(p.c)("section",{blocks:[],noHeader:!0}),u=[],f=new p.a;W(t,(function(t){W(t.dataByAxis,(function(t){var e=o.getComponent(t.axisDim+"Axis",t.axisIndex),i=t.value;if(e&&null!=i){var s=B.e(i,e.axis,o,t.seriesDataIndices,t.valueLabelOpt),r=Object(p.c)("section",{header:s,noHeader:!n.trim(s),sortBlocks:!0,blocks:[]});d.blocks.push(r),n.each(t.seriesDataIndices,(function(n){var d=o.getSeriesByIndex(n.seriesIndex),p=n.dataIndexInside,c=d.getDataParams(p);if(!(c.dataIndex<0)){c.axisDim=t.axisDim,c.axisIndex=t.axisIndex,c.axisType=t.axisType,c.axisId=t.axisId,c.axisValue=D.c(e.axis,{value:i}),c.axisValueLabel=s,c.marker=f.makeTooltipMarker("item",l.c(c.color),a);var g=Object(Y.b)(d.formatTooltip(p,!0,null));g.markupFragment&&r.blocks.push(g.markupFragment),g.markupText&&u.push(g.markupText),h.push(c)}}))}}))})),d.blocks.reverse(),u.reverse();var c=e.position,g=r.get("order"),y=Object(p.b)(d,f,a,g,o.get("useUTC"),r.get("textStyle"));y&&u.unshift(y);var _="richText"===a?"\n\n":"<br/>",m=u.join(_);this._showOrMove(r,(function(){this._updateContentNotChangedOnAxis(t,h)?this._updatePosition(r,c,s[0],s[1],this._tooltipContent,h):this._showTooltipContent(r,m,h,Math.random()+"",s[0],s[1],c,null,f)}))},e.prototype._showSeriesItemTooltip=function(t,e,o){var i=this._ecModel,n=Object(X.a)(e),s=n.seriesIndex,r=i.getSeriesByIndex(s),a=n.dataModel||r,h=n.dataIndex,d=n.dataType,u=a.getData(d),f=this._renderMode,c=t.positionDefault,g=V([u.getItemModel(h),a,r&&(r.coordinateSystem||{}).model],this._tooltipModel,c?{position:c}:null),y=g.get("trigger");if(null==y||"item"===y){var _=a.getDataParams(h,d),m=new p.a;_.marker=m.makeTooltipMarker("item",l.c(_.color),f);var x=Object(Y.b)(a.formatTooltip(h,!1,d)),v=g.get("order"),b=x.markupFragment?Object(p.b)(x.markupFragment,m,f,v,i.get("useUTC"),g.get("textStyle")):x.markupText,w="item_"+a.name+"_"+h;this._showOrMove(g,(function(){this._showTooltipContent(g,b,_,w,t.offsetX,t.offsetY,t.position,t.target,m)})),o({type:"showTip",dataIndexInside:h,dataIndex:u.getRawIndex(h),seriesIndex:s,from:this.uid})}},e.prototype._showComponentItemTooltip=function(t,e,o){var i=Object(X.a)(e),s=i.tooltipConfig.option||{};if(n.isString(s)){s={content:s,formatter:s}}var r=[s],a=this._ecModel.getComponent(i.componentMainType,i.componentIndex);a&&r.push(a),r.push({formatter:s.content});var h=t.positionDefault,l=V(r,this._tooltipModel,h?{position:h}:null),d=l.get("content"),u=Math.random()+"",f=new p.a;this._showOrMove(l,(function(){var o=n.clone(l.get("formatterParams")||{});this._showTooltipContent(l,d,o,u,t.offsetX,t.offsetY,t.position,e,f)})),o({type:"showTip",from:this.uid})},e.prototype._showTooltipContent=function(t,e,o,i,s,r,a,h,d){if(this._ticket="",t.get("showContent")&&t.get("show")){var p=this._tooltipContent,u=t.get("formatter");a=a||t.get("position");var f=e,c=this._getNearestPoint([s,r],o,t.get("trigger"),t.get("borderColor")).color;if(u)if(n.isString(u)){var g=t.ecModel.get("useUTC"),y=n.isArray(o)?o[0]:o;f=u,y&&y.axisType&&y.axisType.indexOf("time")>=0&&(f=Object(H.h)(y.axisValue,f,g)),f=l.f(f,o,!0)}else if(n.isFunction(u)){var _=L((function(e,i){e===this._ticket&&(p.setContent(i,d,t,c,a),this._updatePosition(t,a,s,r,p,o,h))}),this);this._ticket=i,f=u(o,i,_)}else f=u;p.setContent(f,d,t,c,a),p.show(t,c),this._updatePosition(t,a,s,r,p,o,h)}},e.prototype._getNearestPoint=function(t,e,o,i){return"axis"===o||n.isArray(e)?{color:i||("html"===this._renderMode?"#fff":"none")}:n.isArray(e)?void 0:{color:i||e.color||e.borderColor}},e.prototype._doUpdatePosition=function(t,e,o,i,s,r,a){var h=this._api.getWidth(),l=this._api.getHeight();e=e||t.get("position");var p=s.getSize(),u=t.get("align"),f=t.get("verticalAlign"),c=a&&a.getBoundingRect().clone();if(a&&c.applyTransform(a.transform),n.isFunction(e)&&(e=e([o,i],r,s.el,c,{viewSize:[h,l],contentSize:p.slice()})),n.isArray(e))o=N(e[0],h),i=N(e[1],l);else if(n.isObject(e)){var g=e;g.width=p[0],g.height=p[1];var y=j.g(g,{width:h,height:l});o=y.x,i=y.y,u=null,f=null}else if(n.isString(e)&&a){var _=function(t,e,o,i){var n=o[0],s=o[1],r=Math.ceil(Math.SQRT2*i)+8,a=0,h=0,l=e.width,d=e.height;switch(t){case"inside":a=e.x+l/2-n/2,h=e.y+d/2-s/2;break;case"top":a=e.x+l/2-n/2,h=e.y-s-r;break;case"bottom":a=e.x+l/2-n/2,h=e.y+d+r;break;case"left":a=e.x-n-r,h=e.y+d/2-s/2;break;case"right":a=e.x+l+r,h=e.y+d/2-s/2}return[a,h]}(e,c,p,t.get("borderWidth"));o=_[0],i=_[1]}else{_=function(t,e,o,i,n,s,r){var a=o.getSize(),h=a[0],l=a[1];null!=s&&(t+h+s+2>i?t-=h+s:t+=s);null!=r&&(e+l+r>n?e-=l+r:e+=r);return[t,e]}(o,i,s,h,l,u?null:20,f?null:20);o=_[0],i=_[1]}if(u&&(o-=Z(u)?p[0]/2:"right"===u?p[0]:0),f&&(i-=Z(f)?p[1]/2:"bottom"===f?p[1]:0),Object(d.d)(t)){_=function(t,e,o,i,n){var s=o.getSize(),r=s[0],a=s[1];return t=Math.min(t+r,i)-r,e=Math.min(e+a,n)-a,t=Math.max(t,0),e=Math.max(e,0),[t,e]}(o,i,s,h,l);o=_[0],i=_[1]}s.moveTo(o,i)},e.prototype._updateContentNotChangedOnAxis=function(t,e){var o=this._lastDataByCoordSys,i=this._cbParamsList,s=!!o&&o.length===t.length;return s&&W(o,(function(o,r){var a=o.dataByAxis||[],h=(t[r]||{}).dataByAxis||[];(s=s&&a.length===h.length)&&W(a,(function(t,o){var r=h[o]||{},a=t.seriesDataIndices||[],l=r.seriesDataIndices||[];(s=s&&t.value===r.value&&t.axisType===r.axisType&&t.axisId===r.axisId&&a.length===l.length)&&W(a,(function(t,e){var o=l[e];s=s&&t.seriesIndex===o.seriesIndex&&t.dataIndex===o.dataIndex})),i&&n.each(t.seriesDataIndices,(function(t){var o=t.seriesIndex,n=e[o],r=i[o];n&&r&&r.data!==n.data&&(s=!1)}))}))})),this._lastDataByCoordSys=t,this._cbParamsList=e,!!s},e.prototype._hide=function(t){this._lastDataByCoordSys=null,t({type:"hideTip",from:this.uid})},e.prototype.dispose=function(t,e){s.a.node||(this._tooltipContent.dispose(),k.b("itemTooltip",e))},e.type="tooltip",e}(A.a);function V(t,e,o){var i,s=e.ecModel;o?(i=new I.a(o,s,s),i=new I.a(e.option,i,s)):i=e;for(var r=t.length-1;r>=0;r--){var a=t[r];a&&(a instanceof I.a&&(a=a.get("tooltip",!0)),n.isString(a)&&(a={formatter:a}),a&&(i=new I.a(a,i,s)))}return i}function E(t,e){return t.dispatchAction||n.bind(e.dispatchAction,e)}function Z(t){return"center"===t||"middle"===t}e.a=F}}]);