import {
  EffectCards,
  EffectCreative,
  Parallax, Pagination,
  EffectCoverflow,
  EffectFlip,
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

export const slider1 = createEf({
  prev: {
    translate: [0, 0, -400],
  },
  next: {
    translate: ["100%", 0, 0],
  },
})

export const slider2 = createEf({
  prev: {
    translate: ["-120%", 0, -500],
  },
  next: {
    translate: ["120%", 0, -500],
  },
})

export const slider3 = createEf({
  prev: {
    translate: ["-20%", 0, -1],
  },
  next: {
    translate: ["100%", 0, 0],
  },
})


export const slider4 = createEf({
  prev: {
    translate: [0, 0, -800],
    rotate: [180, 0, 0],
  },
  next: {
    translate: [0, 0, -800],
    rotate: [-180, 0, 0],
  },
})

export const slider5 = createEf({
  prev: {
    translate: ["-125%", 0, -800],
    rotate: [0, 0, -90],
  },
  next: {
    translate: ["125%", 0, -800],
    rotate: [0, 0, 90],
  },
})

export const slider6 = createEf({
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

export const slider7 = {
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


export const slider8 = {
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


export const slider9 = {
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

export const slider10 = {
  parallax: true,
  pagination: {
    clickable: true,
  },
  navigation: true,
  modules: [Parallax, Pagination, Navigation]
}