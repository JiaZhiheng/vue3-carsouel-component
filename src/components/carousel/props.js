/**
 * Props定义，用于接收父组件传递的属性值
 *
 * @component Carousel
 * @prop {String} direction - 轮播图方向，可选值包括 "horizontal"、"vertical"。
 * @prop {String} effect - 轮播图效果，可选值包括 "scroll"、"fade"、"slide"。
 * @prop {Boolean} turnDirection - 轮播方向，默认为 true。
 * @prop {String} showDots - 是否显示轮播点，可选值包括 "always"、"hover"、"never"。
 * @prop {String} showArrow - 是否显示轮播箭头，可选值包括 "always"、"hover"、"never"。
 * @prop {Number} slidesPerView - 每一页显示的轮播图数量，默认为 1。
 * @prop {Number} spaceBetween - 轮播图之间的间距，默认为 0。
 * @prop {Number} interval - 轮播间隔，单位毫秒，默认为 4000。
 * @prop {String} transitionStyle - 过渡效果的样式，单位秒，必需属性。
 * @prop {Boolean} autoplay - 是否自动播放，默认为 true。
 * @prop {String} dotPlacement - 轮播指示点位置，可选值包括 "top"、"bottom"、"left"、"right"、"top-left"、"top-right"、"bottom-left"、"bottom-right"，默认为 'bottom'。
 * @prop {String} arrowPlacement - 轮播箭头位置，可选值包括 "start"、"center"、"end"、"top-left"、"top-right"、"bottom-left"、"bottom-right"，默认为 'center'。
 * @prop {String} dotType - 轮播指示点样式，可选值包括 "dot"、"line"，默认为 'dot'。
 * @prop {Number} delay - 延时播放时间，默认为 0。
 * @prop {Boolean} loop - 是否循环播放，默认为 true。
 * @prop {String} trigger -触发切换的方式，默认为 'click'。
 * @prop {Number} defaultIndex - 默认显示页，默认为 0。
 *
 * @component CarouselContext
 * @prop {String} direction - 轮播图方向，可选值包括 "horizontal"、"vertical"。
 * @prop {String} effect - 轮播图效果，可选值包括 "scroll"、"fade"、"slide"。
 * @prop {Number} total - 轮播图总数。
 * @prop {Number} indexCounter - 当前轮播图索引。
 * @prop {String} transitionStyle - 过渡效果的样式，单位秒。
 * @prop {Number} slidesPerView - 每一页显示的轮播图数量。
 * @prop {Number} spaceBetween - 轮播图之间的间距。
 *
 * @component CarouselArrow
 * @prop {String} showArrow - 是否显示轮播箭头，可选值包括 "always"、"hover"、"never"。
 * @prop {String} arrowPlacement - 轮播箭头位置，可选值包括 "start"、"center"、"end"、"top-left"、"top-right"、"bottom-left"、"bottom-right"。
 *
 * @component CarouselDots
 * @prop {Number} total - 轮播图总数。
 * @prop {Number} slidesPerView - 每一页显示的轮播图数量。
 * @prop {Number} indexCounter - 当前轮播图索引。
 * @prop {String} dotPlacement - 轮播指示点位置，可选值包括 "top"、"bottom"、"left"、"right"、"top-left"、"top-right"、"bottom-left"、"bottom-right"。
 * @prop {String} dotType - 轮播指示点样式，可选值包括 "dot"、"line"。
 * @prop {String} showDots - 是否显示轮播点，可选值包括 "always"、"hover"、"never"。
 */
export const carouselProps = {
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => {
      return ['horizontal', 'vertical'].includes(value);
    }
  },
  effect: {
    type: String,
    default: 'fade',
    validator: (value) => {
      return ['scroll', 'fade', 'slide'].includes(value);
    }
  },
  turnDirection: {
    type: Boolean,
    default: true
  },
  showDots: {
    type: String,
    default: 'hover',
    validator: (value) => {
      return ['always', 'hover', 'never'].includes(value);
    }
  },
  showArrow: {
    type: String,
    default: 'hover',
    validator: (value) => {
      return ['always', 'hover', 'never'].includes(value);
    }
  },
  slidesPerView: {
    type: Number,
    default: 1
  },
  spaceBetween: {
    type: Number,
    default: 0
  },
  interval: {
    type: Number,
    default: 4000
  },
  transitionStyle: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  dotPlacement: {
    type: String,
    default: 'bottom',
    validator: (value) => {
      return [
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
      ].includes(value);
    }
  },
  arrowPlacement: {
    type: String,
    default: 'center',
    validator: (value) => {
      return [
        'start',
        'center',
        'end',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
      ].includes(value);
    }
  },
  dotType: {
    type: String,
    default: 'line',
    validator: (value) => {
      return ['dot', 'line'].includes(value);
    }
  },
  delay: {
    type: Number,
    default: 0
  },
  loop: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String,
    default: 'click',
    validator: (value) => {
      return ['click', 'hover'].includes(value);
    }
  },
  defaultIndex: {
    type: Number,
    default: 0
  }
};

export const carouselContextProps = {
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => {
      return ['horizontal', 'vertical'].includes(value);
    }
  },
  effect: {
    type: String,
    default: 'fade',
    validator: (value) => {
      return ['scroll', 'fade', 'slide'].includes(value);
    }
  },
  total: Number,
  indexCounter: Number,
  transitionStyle: String,
  slidesPerView: Number,
  spaceBetween: Number
};

export const carouselArrowProps = {
  showArrow: String,
  arrowPlacement: String
};

export const carouselDotsProps = {
  total: Number,
  slidesPerView: Number,
  indexCounter: Number,
  dotPlacement: String,
  dotType: String,
  showDots: String,
  trigger: String
};
