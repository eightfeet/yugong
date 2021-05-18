export default (function getPrefix() {
    var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) ||
            ((styles as any).OLink === '' && ['', 'o']))[1];
    return pre;
})()
