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
@mixin arrow($position, $direction, $opacity: 1) {
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
  top: auto;
  bottom: auto;
  left: auto;
  right: auto;
  position: if($position == absolute, absolute, relative);
  transform: if($direction == horizontal and $position == relative, translate(0), rotate(90deg));
  opacity: if(position == absolute, $opacity, 1);
}

@mixin arrow-group($direction, $showArrow) {
  position: absolute;
  display: flex;
  flex-direction: if($direction == horizontal, row, column);
  gap: 8px;
  transition: opacity 0.3s;
  opacity: if($showArrow == always, 1, 0);
}

@mixin arrowPlacement($direction, $showArrow) {
  &.start {
    .arrow {
      @include arrow(absolute, $direction);
      @if $direction == horizontal {
        top: 10px;
        bottom: auto;
      } @else {
        left: 10px;
        right: auto;
      }
      &.arrow-prev {
        @if $direction == horizontal {
          left: if($showArrow == always, 10px, 0);
          transform: translate(0);
        } @else {
          top: if($showArrow == always, 10px, 0);
          transform: rotate(90deg);
        }
        opacity: if($showArrow == always, 1, 0);
      }
      &.arrow-next {
        @if $direction == horizontal {
          right: if($showArrow == always, 10px, 0);
          transform: translate(0);
        } @else {
          bottom: if($showArrow == always, 10px, 0);
          transform: rotate(90deg);
        }
        opacity: if($showArrow == always, 1, 0);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.center {
    .arrow {
      @include arrow(absolute, $direction);
      @if $direction == horizontal {
        top: 50%;
        bottom: 50%;
      } @else {
        left: 50%;
        right: 50%;
      }
      &.arrow-prev {
        @if $direction == horizontal {
          left: if($showArrow == always, 10px, 0);
          transform: translate(0, -50%);
        } @else {
          top: if($showArrow == always, 10px, 0);
          transform: translate(-50%, 0) rotate(90deg);
        }
        opacity: if($showArrow == always, 1, 0);
      }
      &.arrow-next {
        @if $direction == horizontal {
          right: if($showArrow == always, 10px, 0);
          transform: translate(0, -50%);
        } @else {
          bottom: if($showArrow == always, 10px, 0);
          transform: translate(-50%, 0) rotate(90deg);
        }
        opacity: if($showArrow == always, 1, 0);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.end {
    .arrow {
      @include arrow(absolute, $direction);
      @if $direction == horizontal {
        top: auto;
        bottom: 10px;
      } @else {
        left: auto;
        right: 10px;
      }
      &.arrow-prev {
        @if $direction == horizontal {
          left: if($showArrow == always, 10px, 0);
          transform: translate(0);
        } @else {
          top: if($showArrow == always, 10px, 0);
          transform: rotate(90deg);
        }
        opacity: if($showArrow == always, 1, 0);
      }
      &.arrow-next {
        @if $direction == horizontal {
          right: if($showArrow == always, 10px, 0);
          transform: translate(0);
        } @else {
          bottom: if($showArrow == always, 10px, 0);
          transform: rotate(90deg);
        }
        opacity: if($showArrow == always, 1, 0);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.top-left {
    @include arrow-group($direction, $showArrow);
    top: 10px;
    left: 10px;
    .arrow {
      @include arrow(relative, $direction, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.top-right {
    @include arrow-group($direction, $showArrow);
    top: 10px;
    right: 10px;
    .arrow {
      @include arrow(relative, $direction, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.bottom-left {
    @include arrow-group($direction, $showArrow);
    bottom: 10px;
    left: 10px;
    .arrow {
      @include arrow(relative, $direction, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  &.bottom-right {
    @include arrow-group($direction, $showArrow);
    bottom: 10px;
    right: 10px;
    .arrow {
      @include arrow(relative, $direction, 1);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

.horizontal {
  .always {
    @include arrowPlacement(horizontal, always);
  }
  .hover {
    @include arrowPlacement(horizontal, hover);
  }
  &.container {
    &:hover {
      .hover {
        @include arrowPlacement(horizontal, always);
      }
    }
  }
}

.vertical {
  .always {
    @include arrowPlacement(vertical, always);
  }
  .hover {
    @include arrowPlacement(vertical, hover);
  }
  &.container {
    &:hover {
      .hover {
        @include arrowPlacement(vertical, always);
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
