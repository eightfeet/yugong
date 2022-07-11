import {
  EffectCards,
  EffectCreative,
  Parallax, Pagination,
  EffectCoverflow,
  EffectFlip,
  EffectFade,
  Navigation
} from 'swiper'

const createEf = (creativeEffect: any) => ({
  grabCursor: true,
  parallax: true,
  effect: 'creative',
  creativeEffect,
  navigation: true,
  pagination: true,
  modules: [EffectCreative, Parallax]
})
/** Y轴移入/Z轴缩小移出 */
export const effect1 = createEf({
  prev: {
    translate: [0, 0, -400],
  },
  next: {
    translate: [0, "100%", 0],
  },
})
/** X轴移入/Z轴缩小移出 */
export const effect2 = createEf({
  prev: {
    translate: [0, 0, -400],
  },
  next: {
    translate: ["100%", 0, 0],
  },
})
/** X轴放大移入/X轴缩小移出 */
export const effect3 = createEf({
  prev: {
    translate: ["-120%", 0, -500],
  },
  next: {
    translate: ["120%", 0, -500],
  },
})

/** Y轴放大移入/Y轴缩小移出 */
export const effect4 = createEf({
  prev: {
    translate: [0, "-120%", -500],
  },
  next: {
    translate: [0, "120%", -500],
  },
})

/** X轴移入/X轴移出 */
export const effect5 = createEf({
  prev: {
    translate: ["-20%", 0, -1],
  },
  next: {
    translate: ["100%", 0, 0],
  },
})

/** Y轴移入/Y轴移出 */
export const effect6 = createEf({
  prev: {
    translate: [0, "-20%", -1],
  },
  next: {
    translate: [0, "100%", 0],
  },
})

/** X轴翻转进入/X轴翻转退出 */
export const effect7 = createEf({
  prev: {
    translate: [0, 0, -800],
    rotate: [180, 0, 0],
  },
  next: {
    translate: [0, 0, -800],
    rotate: [-180, 0, 0],
  },
})

/** Y轴翻转进入/Y轴翻转退出 */
export const effect8 = createEf({
  prev: {
    translate: [0, 0, -800],
    rotate: [0, 180, 0],
  },
  next: {
    translate: [0, 0, -800],
    rotate: [0, -180, 0],
  },
})

/** X方向翻滚进入/X方向翻滚退出 */
export const effect9 = createEf({
  prev: {
    translate: ["-185%", 0, -800],
    rotate: [0, 0, -90],
  },
  next: {
    translate: ["185%", 0, -800],
    rotate: [0, 0, 90],
  },
})

/** Y方向翻滚进入/Y方向翻滚退出 */
export const effect10 = createEf({
  prev: {
    translate: [0, "-120%", -800],
    rotate: [0, 0, -90],
  },
  next: {
    translate: [0, "120%", -800],
    rotate: [0, 0, 90],
  },
})

/** X方向翻页进入/X方向翻页退出 */
export const effect11 = createEf({
  prev: {
    origin: "left center",
    translate: ["-5%", 0, -200],
    rotate: [0, 100, 0],
  },
  next: {
    origin: "right center",
    translate: ["5%", 0, -200],
    rotate: [0, -100, 0],
  },
})

/** 翻转退出/进入 */
export const effect12 = {
  effect: "flip",
  grabCursor: true,
  pagination: true,
  navigation: true,
  flipEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  modules: [EffectFlip, Pagination, Navigation]
}

/** 透视退出/进入 */
export const effect13 = {
  effect: "coverflow",
  parallax: true,
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  navigation: true,
  pagination: true,
  modules: [EffectCoverflow, Pagination, Parallax]
}

/** 卡牌切换（请将基础/内容溢出设为显示） */
export const effect14 = {
  parallax: true,
  effect: "cards",
  cardsEffect: {
    slideShadows: false,
  },
  grabCursor: true,
  navigation: true,
  pagination: true,
  modules: [EffectCards, Parallax],
}

export const effect15 = {
  parallax: true,
  pagination: {
    clickable: true,
  },
  navigation: true,
  modules: [Parallax, Pagination, Navigation]
}

export const effect16 = {
  effect: "fade",
  pagination: {
    clickable: true,
  },
  navigation: true,
  modules: [EffectFade, Pagination, Navigation]
}
