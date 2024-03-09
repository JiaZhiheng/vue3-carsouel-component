<template>
  <div :class="[showArrow, arrowPlacement]">
    <div class="arrow arrow-prev" @click="handlePrev">
      <img src="./assets/arrow-prev.svg" alt="prev" />
    </div>
    <div class="arrow arrow-next" @click="handleNext">
      <img src="./assets/arrow-next.svg" alt="next" />
    </div>
  </div>
</template>

<script setup>
import { carouselArrowProps } from './props';

const props = defineProps(carouselArrowProps);
const emit = defineEmits(['prev', 'next']);

function handlePrev() {
  emit('prev');
}

function handleNext() {
  emit('next');
}
</script>

<style scoped lang="scss">
@mixin arrow-base {
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: transparent;
  transition: left 0.3s, top 0.3s, bottom 0.3s, right 0.3s, opacity 0.3s, background-color 0.3s;
  outline: none;
  cursor: pointer;
}

@mixin arrow {
  @include arrow-base;
  position: absolute;
  opacity: 0;
}

@mixin arrow-relative($direction: horizontal, $opacity: 0) {
  @include arrow-base;
  position: relative;
  transform: if($direction == horizontal, translate(0), rotate(90deg));
  opacity: $opacity;
  top: auto;
  bottom: auto;
  left: auto;
  right: auto;
}

@mixin arrow-group($direction, $opacity: 0) {
  position: absolute;
  display: flex;
  flex-direction: if($direction == horizontal, row, column);
  gap: 8px;
  transition: none;
  opacity: $opacity;
}

@mixin arrowCommon($direction: horizontal) {
  .arrow {
    @include arrow;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    &.arrow-prev,
    &.arrow-next {
      transform: if($direction == horizontal, translate(0), rotate(90deg));
      opacity: 1;
    }
  }
}

@mixin arrowPlacement-horizontal($showArrow) {
  &.start {
    .arrow {
      @include arrow;
      top: 10px;
      bottom: auto;
      &.arrow-prev {
        left: if($showArrow == always, 10px, 0);
        transform: translate(0);
        opacity: if($showArrow == always, 1, 0);
      }
      &.arrow-next {
        right: if($showArrow == always, 10px, 0);
        transform: translate(0);
        opacity: if($showArrow == always, 1, 0);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.center {
    .arrow {
      @include arrow;
      top: 50%;
      bottom: 50%;
      &.arrow-prev {
        left: if($showArrow == always, 10px, 0);
        transform: translate(0, -50%);
        opacity: if($showArrow == always, 1, 0);
      }
      &.arrow-next {
        right: if($showArrow == always, 10px, 0);
        transform: translate(0, -50%);
        opacity: if($showArrow == always, 1, 0);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.end {
    .arrow {
      @include arrow;
      top: auto;
      bottom: 10px;
      &.arrow-prev {
        left: if($showArrow == always, 10px, 0);
        transform: translate(0);
        opacity: if($showArrow == always, 1, 0);
      }
      &.arrow-next {
        right: if($showArrow == always, 10px, 0);
        transform: translate(0);
        opacity: if($showArrow == always, 1, 0);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.top-left {
    @include arrow-group(horizontal, 1);
    top: 10px;
    left: 10px;
    .arrow {
      @include arrow-relative(horizontal, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.top-right {
    @include arrow-group(horizontal, 1);
    top: 10px;
    right: 10px;
    .arrow {
      @include arrow-relative(horizontal, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.bottom-left {
    @include arrow-group(horizontal, 1);
    bottom: 10px;
    left: 10px;
    .arrow {
      @include arrow-relative(horizontal, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.bottom-right {
    @include arrow-group(horizontal, 1);
    bottom: 10px;
    right: 10px;
    .arrow {
      @include arrow-relative(horizontal, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

@mixin arrowPlacement-vertical($showArrow) {
  &.start {
    .arrow {
      @include arrow;
      left: 10px;
      right: auto;
      &.arrow-prev {
        top: if($showArrow == always, 10px, 0);
        transform: rotate(90deg);
        opacity: if($showArrow == always, 1, 0);
      }
      &.arrow-next {
        bottom: if($showArrow == always, 10px, 0);
        transform: rotate(90deg);
        opacity: if($showArrow == always, 1, 0);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.center {
    .arrow {
      @include arrow;
      left: 50%;
      right: 50%;
      &.arrow-prev {
        top: if($showArrow == always, 10px, 0);
        transform: translate(-50%, 0) rotate(90deg);
        opacity: if($showArrow == always, 1, 0);
      }
      &.arrow-next {
        bottom: if($showArrow == always, 10px, 0);
        transform: translate(-50%, 0) rotate(90deg);
        opacity: if($showArrow == always, 1, 0);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.end {
    .arrow {
      @include arrow;
      left: auto;
      right: 10px;
      &.arrow-prev {
        top: if($showArrow == always, 10px, 0);
        transform: rotate(90deg);
        opacity: if($showArrow == always, 1, 0);
      }
      &.arrow-next {
        bottom: if($showArrow == always, 10px, 0);
        transform: rotate(90deg);
        opacity: if($showArrow == always, 1, 0);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.top-left {
    @include arrow-group(vertical, 1);
    top: 10px;
    left: 10px;
    .arrow {
      @include arrow-relative(vertical, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.top-right {
    @include arrow-group(vertical, 1);
    top: 10px;
    right: 10px;
    .arrow {
      @include arrow-relative(vertical, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.bottom-left {
    @include arrow-group(vertical, 1);
    bottom: 10px;
    left: 10px;
    .arrow {
      @include arrow-relative(vertical, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.bottom-right {
    @include arrow-group(vertical, 1);
    bottom: 10px;
    right: 10px;
    .arrow {
      @include arrow-relative(vertical, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

.horizontal {
  .always {
    @include arrowPlacement-horizontal(always);
  }
  .hover {
    @include arrowPlacement-horizontal(hover);
  }
  &.container {
    &:hover {
      .hover {
        @include arrowPlacement-horizontal(always);
      }
    }
  }
}

.vertical {
  .always {
    @include arrowPlacement-vertical(always);
  }
  .hover {
    @include arrowPlacement-vertical(hover);
  }
  &.container {
    &:hover {
      .hover {
        @include arrowPlacement-vertical(always);
      }
    }
  }
}

.never {
  .arrow {
    display: none;
  }
}
</style>
