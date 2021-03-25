import { store } from '~/redux/store';

function setRem(width: any, baseonFontsize: any) {
    let clientWidth = document.documentElement.clientWidth;
    const fontSizeValue = baseonFontsize * (clientWidth / width);
    store.dispatch.controller.setBestFont(fontSizeValue);
}

export default setRem;
