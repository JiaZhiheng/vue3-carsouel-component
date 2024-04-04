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
        :trigger="trigger"
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
import { throttle } from './util/util.js';
import { carouselProps } from './props';

const props = defineProps(carouselProps);
const emit = defineEmits(['change']);
const total = useSlots()
  .default()
  .flatMap((child) => (typeof child.type !== 'symbol' ? [child] : child.children)).length;

const indexCounter = ref(total - props.defaultIndex);
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
  if (props.effect === 'scroll') props.turnDirection ? toNext() : toPrev();
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


