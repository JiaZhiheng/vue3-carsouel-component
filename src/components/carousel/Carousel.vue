<template>
  <div class="container" :class="direction">
    <carousel-context
      :direction="direction"
      :effect="effect"
      :total="total"
      :index-counter="indexCounter"
      :transition-style="transitionStyle"
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      ref="carouselContext"
    >
      <slot></slot>
    </carousel-context>
    <slot
      name="arrow"
      :currentIndex="currentIndex"
      :total="total"
      :to="to"
      :prev="prev"
      :next="next"
    >
      <carousel-arrow
        :show-arrow="showArrow"
        :arrow-placement="arrowPlacement"
        @prev="prev"
        @next="next"
      >
      </carousel-arrow>
    </slot>
    <slot name="dots" :currentIndex="currentIndex" :total="total" :to="to">
      <carousel-dots
        :show-dots="showDots"
        :dot-type="dotType"
        :dot-placement="dotPlacement"
        :total="total"
        :slides-per-view="slidesPerView"
        :index-counter="indexCounter"
        @to="to"
      >
      </carousel-dots>
    </slot>
  </div>
</template>
<script setup>
import { ref, useSlots, onMounted, onUnmounted, watch, computed } from 'vue';
import CarouselContext from './CarouselContext.vue';
import CarouselArrow from './CarouselArrow.vue';
import CarouselDots from './CarouselDots.vue';
import { throttle } from '../../util/util';

/**
 * Props定义，用于接收父组件传递的属性值
 *
 * @prop {String} direction - 轮播图方向，可选值包括 "horizontal"、"vertical"。
 * @prop {String} effect - 轮播图效果，可选值包括 "scroll"、"fade"、"slide"。
 * @prop {Boolean} turnDirection - 轮播方向，默认为 true。
 * @prop {String} showDots - 是否显示轮播点，可选值包括 "always"、"hover"、"never"。
 * @prop {String} showArrow - 是否显示轮播箭头，可选值包括 "always"、"hover"、"never"。
 * @prop {Number} slidesPerView - 每一页显示的轮播图数量，默认为 1。
 * @prop {Number} spaceBetween - 轮播图之间的间距，默认为 0。
 * @prop {Number} interval - 轮播间隔，单位毫秒，默认为 4000。
 * @prop {String} transitionStyle - 过渡效果的样式，单位秒，必需属性。
 * @prop {Boolean} immediate - 是否立即开始轮播，默认为 false。
 * @prop {Boolean} autoplay - 是否自动播放，默认为 true。
 * @prop {String} dotPlacement - 轮播指示点位置，可选值包括 "top"、"bottom"、"left"、"right"、"top-left"、"top-right"、"bottom-left"、"bottom-right"，默认为 'bottom'。
 * @prop {String} arrowPlacement - 轮播箭头位置，可选值包括 "start"、"center"、"end"、"top-left"、"top-right"、"bottom-left"、"bottom-right"，默认为 'center'。
 * @prop {String} dotType - 轮播指示点样式，可选值包括 "dot"、"line"，默认为 'dot'。
 * @prop {Number} delay - 延时播放时间，默认为 0。
 * @prop {Boolean} loop - 是否循环播放，默认为 true。
 */
const props = defineProps({
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
  immediate: {
    type: Boolean,
    default: false
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
    default: 'bottom',
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
  }
});

const emit = defineEmits(['change']);

const total = useSlots().default()[0].children.length;
const indexCounter = ref(0);
const playIntervalId = ref(null);
const carouselContext = ref(null);

const currentIndex = computed(() => (total - indexCounter.value) % total);

const waitingForPlay = ref(false);
/**
 * 轮播图自动播放锁
 * @type {Ref<boolean>}
 * @default false
 * @description
 * 作用：控制轮播图是否可以自动播放，当页面不可见时，自动播放会被暂停。
 * 原因：由于浏览器的性能优化策略，当页面不可见时，浏览器会停止一切与页面渲染相关的操作。
 *      此时 transition 动画停止播放但定时器仍在运行，造成动画与定时器不同步的现象。
 *      当页面重新可见时，浏览器会把前面累计的动画效果全部执行，造成轮播图卡片位置混乱的问题。
 * 目的：解决轮播图卡片位置混乱的问题。
 * 用法：当轮播图需要切换且页面不可见时，将其赋值为 true 视作轮播图 「等待播放」
 *      轮播图 「等待播放」 时回到标签页会调用 init 方法，此时轮播图继续播放。
 * 注意：不要在页面不可见时将 waitingForPlay 赋值为 true。
 *      因为频繁切换标签页时会重复调用 init 方法，导致轮播图重复播放，最终造成卡片重叠的问题。
 *      而要在轮播图切换时将 waitingForPlay 赋值为 true。
 *      即使频繁切换标签页也不会重复调用 init 方法，可以规避轮播图重复播放造成卡片重叠的问题。
 */

// 监听页面可见性变化
function handleVisibilityChange() {
  if (!document.hidden && waitingForPlay.value) {
    waitingForPlay.value = false;
    init();
  }
}

// 检查可见性
function checkVisibility() {
  if (document.hidden) {
    waitingForPlay.value = true;
    return false; // 表示不可见
  } else {
    return true; // 表示可见
  }
}

// 滑动至前一页 (自动)
function toPrev() {
  if (!checkVisibility()) return; // 如果不可见，直接返回
  if (!props.loop && getCurrentIndex() === 0) return; // 如果不循环播放且当前页为第一页，直接返回
  indexCounter.value = (total - getCurrentIndex() + 1) % total;
}

// 滑动至后一页 (自动)
function toNext() {
  if (!checkVisibility()) return; // 如果不可见，直接返回
  if (!props.loop && getCurrentIndex() === total - 1) return; // 如果不循环播放且当前页为最后一页，直接返回
  indexCounter.value = total - getCurrentIndex() - 1;
}

// 滑动至某一页（节流函数内部）
function throttleTo(index) {
  stopPlay();
  indexCounter.value = (total - index) % total;
  startPlay();
}

// 滑动至某一页
function to(index) {
  throttle(throttleTo(index), getTransitionDuration());
}

// 滑动至前一页 (手动)
function prev() {
  if (!props.loop && getCurrentIndex() === 0) return; // 如果不循环播放且当前页为第一页，直接返回
  to(getCurrentIndex() - 1);
}

// 滑动至后一页 (手动)
function next() {
  if (!props.loop && getCurrentIndex() === total - 1) return; // 如果不循环播放且当前页为最后一页，直接返回
  to(getCurrentIndex() + 1);
}

// 获取当前页
function getCurrentIndex() {
  return currentIndex.value;
}

// 获取过渡时间（用于函数节流）
function getTransitionDuration() {
  const child = carouselContext.value.$el.children[0];
  const computedStyles = window.getComputedStyle(child);
  const transitionDuration = computedStyles.transitionDuration;
  const durationInMilliseconds = parseFloat(transitionDuration) * 1000;
  return durationInMilliseconds;
}

// 开始播放
function startPlay() {
  if (!props.autoplay) return;
  playIntervalId.value = setInterval(props.turnDirection ? toNext : toPrev, props.interval);
}

// 暂停播放
function stopPlay() {
  clearInterval(playIntervalId.value);
}

// 初始化
function init() {
  stopPlay();
  if (props.immediate && props.autoplay) props.turnDirection ? toNext() : toPrev();
  startPlay();
}

// 监听页面加载完成事件
onMounted(() => {
  setTimeout(init, props.delay);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  to = throttle(throttleTo, getTransitionDuration()); // 初始化节流后的 to 方法
  /**
   * 为什么要在页面加载完成时初始化节流后的 to 方法？
   * 因为在页面加载完成之前，DOM 还未加载完成，无法获取到元素样式，所以无法获取到过渡时间，会导致节流后的 to 方法无法正常工作。
   * 所以在页面加载完成之后，获取到过渡时间后再初始化节流后的 to 方法。
   */
});

// 监听页面卸载事件
onUnmounted(() => {
  stopPlay();
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});

// 监听卡片变化
watch(
  () => indexCounter.value,
  () => {
    emit('change', currentIndex.value);
  }
);

// 暴露给父组件的属性和方法
defineExpose({
  to,
  prev,
  next,
  getCurrentIndex
});
</script>

<style scoped lang="scss">
.container {
  position: relative;
}
</style>
