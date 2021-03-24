
function setRem (doc: any, win: any, width: any, baseonFontsize: any) {
	let fontSize = '';
	let docEl = doc.documentElement,
		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
		recalc = function() {
			let clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= width) {
				fontSize = docEl.style.fontSize = baseonFontsize + "px";
			} else {
				fontSize = docEl.style.fontSize = baseonFontsize * (clientWidth /  width) + "px";
			}
		};

	if (!doc.addEventListener) return;
	recalc();
	win.removeEventListener(resizeEvt, recalc, false);
	doc.removeEventListener("DOMContentLoaded", recalc, false);
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener("DOMContentLoaded", recalc, false);
	return fontSize;
}

export default setRem;
