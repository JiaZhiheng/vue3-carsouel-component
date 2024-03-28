<template>
  <div class="card-container" :class="direction">
    <div
      v-for="(slotContent, index) in slot"
      :key="slotContent.key"
      :style="itemStyle(index)"
      class="card-item"
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

const cardSize = computed(() => {
  `calc(${100 / props.slidesPerView}% - ${
    (props.spaceBetween * (props.slidesPerView - 1)) / props.slidesPerView
  }px)`;
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
  console.log(cardArray);
  return cardArray;
}

function itemStyle(index) {
  return config.value[(index + props.indexCounter) % config.value.length];
}
</script>

<style scoped lang="scss">
.card-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  transform: rotate(0);
  cursor: pointer;

  &.horizontal {
    .card-item {
      width: v-bind('cardSize');
    }
  }

  &.vertical {
    .card-item {
      height: v-bind('cardSize');
    }
  }
}

.card-item {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  transition: v-bind('transitionStyle');
}
</style>
