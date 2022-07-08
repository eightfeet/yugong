import { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { compilePlaceholderFromDataSource as getResult } from '~/core/getDataFromSource';
import parser from 'html-react-parser';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Lazy,
  Keyboard,
  Mousewheel,
} from 'swiper';

import * as effects from './effect';

// Styles must use direct files imports
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import PresetModule from '~/components/PresetModule';
import { ModuleBaseProps } from '~/components/PresetModule/PresetModule';
import config, { ExposeEventsKeys } from './Slider.config';
import createStyles, { ClassesKey } from './Slider.createStyles';
import classNames from 'classnames';
import s from './Slider.module.less';
import Wrapper from '../Wrapper';
import { ArgumentsItem } from '~/types/appData';
import { getArguments } from '~/core/getArgumentsTypeDataFromDataSource';
import { mockData } from './mock';
import { ChildrenItem, SliderDataItem } from './type';
import { toStyle } from '~/core/helper/toStyles';
import { backgroundGroup } from '~/compiler/compiler';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  Lazy,
  Autoplay,
  Keyboard,
  Mousewheel,
]);

class Slider extends Component<SliderProps, State> {
  swiper: SwiperCore | undefined;
  prefix: string;
  ref: any;
  constructor(props: SliderProps) {
    super(props);
    this.state = {
      datas: [],
      delay: 3000,
      hideNav: false,
      hidePage: false,
      breakInterface: false,
      autoplay: false,
      loop: true,
      speed: 600,
      effect: effects.effect1,
      reSetSW: true,
      direction: 'horizontal',
    };
    this.prefix = `swiper${this.props.moduleId}`;
  }

  componentDidMount() {
    this.props.registersFunction({
      setData: this.setData,
      setSlider: this.setSlider,
    });
    this.props.eventDispatch().mount();
    if (config.exposeFunctions?.[1].arguments)
      this.setData(...config.exposeFunctions[1].arguments);
  }

  componentWillUnmount() {
    this.props.eventDispatch().unmount();
  }

  setData = (...args: ArgumentsItem[]) => {
    const { datas = mockData() } = getArguments(args);
    this.setState({
      datas,
    });
  };

  setSlider = (...args: ArgumentsItem[]) => {
    const {
      navigation,
      pagination,
      delay,
      speed,
      disableOnInteraction,
      effect,
      direction,
      loop,
    } = getArguments(args);
    const data: any = {};
    if (effects[effect]) data.effect = effects[effect];
    if (delay) data.delay = delay;
    if (delay) {
      data.autoplay = true;
    } else {
      data.autoplay = false;
    }
    if (speed) data.speed = speed;
    if (direction) data.direction = direction;

    if (loop === 1) data.loop = true;
    if (loop === 2) data.loop = false;

    if (disableOnInteraction === 1) {
      data.breakInterface = true;
    }
    if (disableOnInteraction === 2) {
      data.breakInterface = false;
    }

    if (navigation === 1) data.hideNav = true;
    if (navigation === 2) data.hideNav = false;

    if (pagination === 1) data.hidePage = true;
    if (pagination === 2) data.hidePage = false;
    data.reSetSW = false;

    this.setState(data, () => this.setState({ reSetSW: true }));
  };

  onStart = (e: any) => {
    if (e.activeIndex === this.state.datas.length) {
      this.props.eventDispatch().onLastOneStart();
    }
  };

  onChangeEnd = (e: SwiperCore) => {
    const { moduleId, type, setRunningTimes } = this.props;
    setRunningTimes({
      [`${type}-${moduleId}-activePage`]: e.realIndex + 1,
    });
    this.props.eventDispatch().afterChange();
    console.log(e);
  };

  renderElement = (
    { content, parallax, style, link }: ChildrenItem,
    index: number,
  ) => {
    const parallaxData = {};

    const newStyle = toStyle(style);

    const con = getResult(content || '');

    for (const key in parallax) {
      if (Object.prototype.hasOwnProperty.call(parallax, key)) {
        const element = parallax[key];
        if (element && key !== 'delay') {
          parallaxData[`data-swiper-parallax-${key}`] = element;
        }
      }
    }

    return (
      <div
        {...parallaxData}
        style={{
          ...newStyle,
          ...(parallax?.delay
            ? { transitionDelay: `${parallax?.delay}ms` }
            : {}),
        }}
        key={index}
      >
        {parser(con)}
      </div>
    );
  };

  render() {
    if (!this.state.reSetSW) return null;
    const { classes } = this.props;
    const {
      hideNav,
      hidePage,
      autoplay,
      breakInterface,
      loop,
      delay,
      speed,
      effect,
      direction,
      datas,
    } = this.state;
    const nav = hideNav ? { navigation: false } : {};
    const page = hidePage ? { pagination: false } : { pagination: true };
    const pageStyle = (data: any) => backgroundGroup(data || {}).result;

    return (
      <Wrapper {...this.props} maxWidth maxHeight>
        <Swiper
          className={classNames(s.sliderwrap, classes.sliderWrap)}
          ref={this.swiper}
          mousewheel={true}
          direction={direction}
          speed={speed}
          onSlideNextTransitionStart={this.onStart}
          keyboard
          lazy
          autoplay={
            autoplay
              ? {
                  delay: delay,
                  disableOnInteraction: breakInterface,
                }
              : false
          }
          loop={loop}
          {...(effect as any)}
          {...nav}
          {...page}
          onInit={(e) => (this.swiper = e)}
          onSlideChangeTransitionEnd={this.onChangeEnd}
        >
          {datas.map((item, index) => (
            <SwiperSlide
              key={index}
              className={classNames(s.swiperslide, classes.slideItem)}
              style={pageStyle(item.backgroundGroup)}
            >
              <div className={classNames(s.content, classes.content)}>
                {item.childrens?.map(this.renderElement)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
    );
  }
}

// typeof State
type State = {
  datas: SliderDataItem[];
  delay: number;
  hideNav: boolean;
  hidePage: boolean;
  breakInterface: boolean;
  autoplay: boolean;
  loop: boolean;
  speed: number;
  effect: { [key: string]: any };
  reSetSW: boolean;
  direction: string;
};

export type SliderProps = ModuleBaseProps<
  { [keys in ClassesKey]: string },
  { [keys in ExposeEventsKeys]: Function }
>;

export default PresetModule<SliderProps>(Slider, config, createStyles);
