import { debounce } from 'lodash-es'

// 以1920px 底图为准开发页面
export const setDomFontSize = (): void => {
  let width = document.documentElement.clientWidth || document.body.clientWidth;
  let fontsize = (width <= 1200 ? 1200 : width) / 100 + 'px';
  (document.getElementsByTagName('html')[0].style as any)['font-size'] = fontsize;
}

let setDomFontSizeDebounce = debounce(setDomFontSize, 400)
window.addEventListener('resize', setDomFontSizeDebounce);
