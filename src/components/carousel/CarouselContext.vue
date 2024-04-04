<template>
  <div class="card-container" :class="direction">
    <div
      v-for="(slotContent, index) in slot"
      :key="slotContent.key"
      :style="itemStyle(index)"
      class="card-item"
      ref="card"
    >
      <component :is="slotContent"></component>
    </div>
  </div>
</template>

<script setup>
import { carouselContextProps } from './props';
import { ref, useSlots, computed, watch } from 'vue';

const slot = useSlots()
  .default()[0]
  .children.flatMap((child) => (typeof child.type !== 'symbol' ? [child] : child.children));

const props = defineProps(carouselContextProps);

const transitionStyle = ref(props.transitionStyle);

const card = ref(null);

watch(
  () => props.direction,
  () => {
    transitionStyle.value = '0';
  }
);

watch(
  () => props.effect,
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

  // 截取需要的卡片切片
  const visibleCards = cardDimensions.slice(offset, offset + slidesPerView);

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
