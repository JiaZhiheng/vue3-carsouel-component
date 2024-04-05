<template>
  <div class="card-container" :class="direction">
    <div v-for="(slotContent, index) in carouselItems" :key="slotContent.key" :style="getCarouselItemStyle(index)"
      class="card-item" ref="card">
      <component :is="slotContent"></component>
    </div>
  </div>
</template>

<script setup>
import { carouselContextProps } from './props';
import { ref, toRefs, useSlots, computed, watch } from 'vue';

/**
 * 插槽内容
 * @type {Array}
 * @description
 * 轮播图接收的 slot 可能是由 v-for 生成的卡片或者是静态内容书写的卡片。
 * 当 slot 是由 v-for 生成的卡片的时候，useSlots().default()[0].children 会收到 type 属性为 symbol 的 VNode 虚拟节点、
 * 而该节点下的 children 数组才是轮播图需要接收的卡片。
 * 当 slot 是静态内容书写的卡片的时候，useSlots().default()[0].children 则会直接收到 children 数组。
 * 为了统一处理，我们需要对 useSlots().default()[0].children 进行展平处理。
 * 使用 flatMap 方法，将 VNode 虚拟节点下的 children 数组展平。
 * 此时我们就可以得到一个统一的卡片数组。
 */
const carouselItems = useSlots().default()[0].children.flatMap((child) => (typeof child.type !== 'symbol' ? [child] : child.children));
const props = defineProps(carouselContextProps);
const { direction, effect, total, indexCounter, transitionStyle, slidesPerView, spaceBetween } = toRefs(props);
const transition = ref(transitionStyle.value);
const card = ref(null);

/**
 * 监听 direction 和 effect 的变化 
 * @description 
 * 作用：当 direction 和 effect 变化时，更新过渡时间。
 * 原因：当 direction 变化时，卡片的位置会根据新的方向重新计算。
 *      「上一张卡片」 和 「下一张卡片」 切换到新的位置的过渡过程可能会遮挡到当前卡片，所以需要将过渡时间设置为 0。
 *      当 effect 变化时, 卡片的位置也可能会随之产生变化。
 *      特别是涉及到 fade 效果与其他效果切换的时候，卡片的位置、透明度和 z-index 属性都需要重新进行计算。
 *      「下一张卡片」 切换到新的位置的过渡过程可能会掠过当前卡片，所以也需要将过渡时间设置为 0。
 *      当卡片位置调整过后需要重新将过渡时间设置为 transitionStyle 以保证正常的过渡效果。
 * 目的：保证过渡效果的正常进行。
 * 注意：为什么用 setTimeout 不用 nextTick？
 *      使用 nextTick 会导致「下一张卡片」 切换到新的位置的过渡过程可能会掠过当前卡片。
 *      所以需要使用 setTimeout 来保证过渡效果的正常进行。
 */
watch(
  () => [direction.value, effect.value],
  () => {
    transition.value = '0';
    setTimeout(() => {
      transition.value = transitionStyle.value;
    }, 0);
  }
);

// 计算 card-container 尺寸
const carouselContainerSize = computed(() =>
  calculateCarouselContainerSize(
    total.value,
    indexCounter.value,
    slidesPerView.value,
    spaceBetween.value,
    direction.value
  )
);

// 生成轮播卡片样式
const carouselItemStyles = computed(() =>
  generateCarouselItemStyles(
    total.value,
    slidesPerView.value,
    direction.value,
    effect.value,
    spaceBetween.value
  )
);

/**
 * card-container 尺寸计算公式
 * @description
 * 水平轮播图
 *    宽度：显示卡片数量 * 卡片宽度 + (显示卡片数量 - 1) * 间隙宽度
 *    高度：显示卡片高度的最大值
 * 垂直轮播图
 *    宽度：显示卡片宽度的最大值
 *    高度：显示卡片数量 * 卡片高度 + (显示卡片数量 - 1) * 间隙宽度
 */
function calculateCarouselContainerSize(total, indexCounter, slidesPerView, spaceBetween, direction) {
  if (!Array.isArray(card.value)) {
    return { width: '0px', height: '0px' };
  }
  const offset = (total - indexCounter) % total;
  const cardDimensions = card.value.map(item => {
    const rect = item.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  });
  let end = offset + slidesPerView;
  let visibleCards;
  if (end <= total) {
    visibleCards = cardDimensions.slice(offset, end);
  } else {
    visibleCards = [
      ...cardDimensions.slice(offset, total),
      ...cardDimensions.slice(0, end % total)
    ];
  }
  const totalSpacing = (slidesPerView - 1) * spaceBetween;
  if (direction === 'horizontal') {
    const totalWidth = visibleCards.reduce((sum, { width }) => sum + width, totalSpacing);
    const maxHeight = Math.max(...visibleCards.map(({ height }) => height));
    return {
      width: `${totalWidth}px`,
      height: `${maxHeight}px`
    };
  } else {
    const totalHeight = visibleCards.reduce((sum, { height }) => sum + height, totalSpacing);
    const maxWidth = Math.max(...visibleCards.map(({ width }) => width));
    return {
      width: `${maxWidth}px`,
      height: `${totalHeight}px`
    };
  }
}

function generateCarouselItemStyles(total, slidesPerView, direction, effect, spaceBetween) {
  return Array.from({ length: total }).map((_, i) => {
    const style = {};
    const isLast = i === total - 1;
    const offset = isLast ? `calc(-100% - ${spaceBetween}px)` : `calc(${i * 100}% + ${i * spaceBetween}px)`;
    const transformValue = direction === 'horizontal' ? `translateX(${offset})` : `translateY(${offset})`;
    if (effect === 'slide' || effect === 'scroll') {
      style.transform = i <= slidesPerView || isLast ? transformValue : '';
      style.display = i <= slidesPerView || isLast ? '' : 'none';
    } else {
      style.opacity = i < slidesPerView ? 1 : 0;
      style.zIndex = i < slidesPerView ? 1 : 0;
    }
    return style;
  });
}

function getCarouselItemStyle(index) {
  return carouselItemStyles.value[(index + indexCounter.value) % carouselItemStyles.value.length];
}
</script>

<style scoped lang="scss">
.card-container {
  width: v-bind('carouselContainerSize.width');
  height: v-bind('carouselContainerSize.height');
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  cursor: pointer;
}

.card-item {
  position: absolute;
  border-radius: 12px;
  transition: v-bind('transition');
}
</style>
