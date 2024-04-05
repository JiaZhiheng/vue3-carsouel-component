<template>
  <ul class="dots" :class="[showDots, dotPlacement]">
    <li
      :class="[getItemClass(index), dotType]"
      v-for="(item, index) in carouselItemStatuses"
      @mouseenter="handleEvent('hover', index)"
      @click="handleEvent('click', index)"
    ></li>
  </ul>
</template>

<script setup>
import { carouselDotsProps } from './props';

const props = defineProps(carouselDotsProps);
const carouselItemStatuses = generateCarouselItemStatuses(props.total, props.slidesPerView);
const emit = defineEmits(['to']);

function generateCarouselItemStatuses(total, slidesPerView) {
  return Array.from({ length: total }, (_, i) => (i < slidesPerView ? 'current' : ''));
}

function getItemClass(index) {
  return carouselItemStatuses[(index + props.indexCounter) % carouselItemStatuses.length];
}

function handleEvent(triggerType, index) {
  if (props.trigger === triggerType) {
     emit('to', index);
  }
}
</script>

<style scoped lang="scss">
@mixin dots($direction, $opacity) {
  position: absolute;
  display: flex;
  gap: 8px;
  z-index: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  transition: all 0.3s;
  flex-direction: if($direction == horizontal, row, column);
  opacity: $opacity;
}

@mixin line($direction) {
  display: block;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
  margin: 0;
  padding: 0;
  cursor: pointer;
  width: if($direction == horizontal, 16px, 4px);
  height: if($direction == horizontal, 4px, 16px);
  &.current {
    width: if($direction == horizontal, 24px, 4px);
    height: if($direction == horizontal, 4px, 24px);
    background: rgba(255, 255, 255, 1);
  }
}

@mixin dot {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
  margin: 0;
  padding: 0;
  cursor: pointer;
  &.current {
    background: rgba(255, 255, 255, 1);
  }
}

@mixin dotPlacement($direction) {
  &.top {
    left: 50%;
    top: 18px;
    transform: translateX(-50%) translateY(-50%) rotate(if($direction == horizontal, 0deg, 90deg));
  }
  &.bottom {
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%) translateY(50%) rotate(if($direction == horizontal, 0deg, 90deg));
  }
  &.left {
    top: 50%;
    left: 18px;
    transform: translateX(-50%) translateY(-50%) rotate(if($direction == horizontal, 90deg, 0deg));
  }
  &.right {
    top: 50%;
    right: 18px;
    transform: translateX(50%) translateY(-50%) rotate(if($direction == horizontal, 90deg, 0deg));
  }
  &.top-left {
    top: 18px;
    left: 18px;
  }
  &.top-right {
    top: 18px;
    right: 18px;
  }
  &.bottom-left {
    bottom: 18px;
    left: 18px;
  }
  &.bottom-right {
    bottom: 18px;
    right: 18px;
  }
}

@mixin showDots($direction, $opacity) {
  &.dots {
    @include dots($direction, $opacity);

    .line {
      @include line($direction);
    }

    .dot {
      @include dot;
    }
  }
}

@mixin direction($direction) {
  .hover {
    @include showDots($direction, 0);
  }

  .always {
    @include showDots($direction, 1);
  }

  .dots {
    @include dotPlacement($direction);
  }
}

.horizontal {
  @include direction(horizontal);
}

.vertical {
  @include direction(vertical);
}

.never {
  display: none;
}

.container {
  &.horizontal,
  &.vertical {
    &:hover .dots {
      opacity: 1;
    }
  }
}
</style>



