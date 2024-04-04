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
const cardSize = computed(() => {
  const { total, indexCounter, slidesPerView, spaceBetween } = props;
  const offset = (total - indexCounter) % total;
  const cardSizeList = card.value.map((item) => {
    const { width, height } = item.getBoundingClientRect();
    return {
      width: `${width}px`,
      height: `${height}px`
    };
  });

  const arr = cardSizeList.slice(offset, slidesPerView + offset);
  if (props.direction === 'horizontal') {
    const cardWidth = arr.reduce((prev, { width }) => prev + parseInt(width), 0);
    const spaceTotal = (slidesPerView - 1) * spaceBetween;
    const width = cardWidth + spaceTotal;
    const height = Math.max(...arr.map(({ height }) => parseInt(height)));
    return {
      width: `${width}px`,
      height: `${height}px`
    };
  }
  if (props.direction === 'vertical') {
    const cardHeight = arr.reduce((prev, { height }) => prev + parseInt(height), 0);
    const spaceTotal = (slidesPerView - 1) * spaceBetween;
    const height = cardHeight + spaceTotal;
    const width = Math.max(...arr.map(({ width }) => parseInt(width)));
    return {
      width: `${width}px`,
      height: `${height}px`
    };
  }
});

// 宽度 * 卡片数量 + （卡片数量 - 1） * 间隙

// const cardSize = computed(() => {
//   return `calc(${100 / props.slidesPerView}% - ${
//     (props.spaceBetween * (props.slidesPerView - 1)) / props.slidesPerView
//   }px)`;
// });

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
  width: v-bind('cardSize.width');
  height: v-bind('cardSize.height');
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
