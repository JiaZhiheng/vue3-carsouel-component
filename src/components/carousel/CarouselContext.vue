<template>
  <div class="card-container" :class="direction">
    <div v-for="(slotContent, index) in slot" :key="slotContent.key" :style="itemStyle(index)" class="card-item"
      ref="card">
      <component :is="slotContent"></component>
    </div>
  </div>
</template>

<script setup>
import { carouselContextProps } from './props';
import { ref, useSlots, computed, watch } from 'vue';

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
const slot = useSlots().default()[0].children.flatMap((child) => (typeof child.type !== 'symbol' ? [child] : child.children));
const props = defineProps(carouselContextProps);
const transitionStyle = ref(props.transitionStyle);
const card = ref(null);

/**
 * 监听 props.direction 和 props.effect 的变化。
 * @description
 * 当 props.direction 变化时，卡片的位置会根据新的方向重新计算。
 * 「上一张卡片」 和 「下一张卡片」 切换到新的位置的过渡过程可能会遮挡到当前卡片，所以需要将过渡时间设置为 0。
 * 当 props.effect 变化时, 卡片的位置也可能会随之产生变化。
 * 特别是涉及到 fade 效果与其他效果切换的时候，卡片的位置、透明度和 z-index 属性都需要重新进行计算。
 * 「下一张卡片」 切换到新的位置的过渡过程可能会掠过当前卡片，所以也需要将过渡时间设置为 0。
 * 
 * 监听 props.indexCounter 的变化。
 * @description
 * 当 props.indexCounter 变化时，卡片的位置会根据新的索引重新计算。
 * 此时需要重新将过渡时间设置为 props.transitionStyle 以保证正常的过渡效果。
 */
watch(
  () => [props.direction, props.effect],
  () => {
    transitionStyle.value = '0';
  }
);

watch(
  () => props.indexCounter,
  () => {
    transitionStyle.value = props.transitionStyle;
  }
);

// 获取 card-container 的宽高
const cardContainerSize = computed(() => {
  const { total, indexCounter, slidesPerView, spaceBetween, direction } = props;
  // 确保 card.value 是一个数组
  if (!Array.isArray(card.value)) {
    return { width: '0px', height: '0px' };
  }

  // 使用 offset 定位切片的起点
  const offset = (total - indexCounter) % total;
  // 计算每个卡片的尺寸列表
  const cardDimensions = card.value.map(item => {
    const rect = item.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  });

  // 计算需要截取的终点索引
  let end = offset + slidesPerView;
  let visibleCards;
  // 判断是否需要从头部继续取值
  if (end <= total) {
    // 截取需要的卡片切片
    visibleCards = cardDimensions.slice(offset, end);
  } else {
    // 截取尾部和头部的卡片切片，并进行合并
    visibleCards = [
      ...cardDimensions.slice(offset, total),
      ...cardDimensions.slice(0, end % total)
    ];
  }

  // 计算总间距
  const totalSpacing = (slidesPerView - 1) * spaceBetween;

  // 根据布局方向计算卡片尺寸
  if (direction === 'horizontal') {
    const totalWidth = visibleCards.reduce((sum, { width }) => sum + width, totalSpacing);
    const maxHeight = Math.max(...visibleCards.map(({ height }) => height));
    return {
      width: `${totalWidth}px`,
      height: `${maxHeight}px`
    };
  } else { // direction === 'vertical'
    const totalHeight = visibleCards.reduce((sum, { height }) => sum + height, totalSpacing);
    const maxWidth = Math.max(...visibleCards.map(({ width }) => width));
    return {
      width: `${maxWidth}px`,
      height: `${totalHeight}px`
    };
  }
});

const config = computed(() =>
  generateCardArray(
    props.total,
    props.slidesPerView,
    props.direction,
    props.effect,
    props.spaceBetween
  )
);

// 生成卡片数组
function generateCardArray(total, slidesPerView, direction, effect, spaceBetween) {
  const cardArray = [];
  function getTransformValue(index, isLast) {
    const offset = isLast
      ? `calc(-100% - ${spaceBetween}px)`
      : `calc(${index * 100}% + ${index * spaceBetween}px)`;
    return direction === 'horizontal' ? `translateX(${offset})` : `translateY(${offset})`;
  }
  for (let i = 0; i < total; i++) {
    const style = {};
    if (effect === 'slide' || effect === 'scroll') {
      if (i <= slidesPerView) {
        style.transform = getTransformValue(i, false);
      } else if (i === total - 1) {
        style.transform = getTransformValue(0, true);
      } else {
        style.display = 'none';
      }
    } else {
      style.opacity = i < slidesPerView ? 1 : 0;
      style.zIndex = i < slidesPerView ? 1 : 0;
    }
    cardArray.push(style);
  }
  return cardArray;
}

function itemStyle(index) {
  return config.value[(index + props.indexCounter) % config.value.length];
}
</script>

<style scoped lang="scss">
.card-container {
  width: v-bind('cardContainerSize.width');
  height: v-bind('cardContainerSize.height');
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  transform: rotate(0);
  cursor: pointer;
}

.card-item {
  position: absolute;
  border-radius: 12px;
  transition: v-bind('transitionStyle');
}
</style>
