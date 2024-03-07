<template>
  <ul class="dots" :class="[showDots, dotPlacement]">
    <li
      :class="[getItemClass(index), dotType]"
      v-for="(item, index) in config"
      :key="item.id"
      @click="to(index)"
    ></li>
  </ul>
</template>

<script setup>
import { carouselDotsProps } from './props';

const props = defineProps(carouselDotsProps);
const config = generateCardArray(props.total, props.slidesPerView);
const emit = defineEmits(['to']);

function generateCardArray(total, slidesPerView) {
  const cardArray = [];
  for (let i = 0; i < total; i++) {
    i < slidesPerView ? cardArray.push('current') : cardArray.push('');
  }
  return cardArray;
}

function getItemClass(index) {
  return config[(index + props.indexCounter) % config.length];
}

function to(index) {
  emit('to', index);
}
</script>

<style scoped lang="scss">
.horizontal {
  .never {
    display: none;
  }

  .hover {
    &.dots {
      position: absolute;
      display: flex;
      gap: 8px;
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      opacity: 0;
      transition: all 0.3s;

      .line {
        display: block;
        width: 16px;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        margin: 0;
        cursor: pointer;

        &.current {
          width: 24px;
          background: rgba(255, 255, 255, 1);
        }
      }

      .dot {
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        cursor: pointer;

        &.current {
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .always {
    &.dots {
      position: absolute;
      display: flex;
      gap: 8px;
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      opacity: 1;
      transition: all 0.3s;

      .line {
        display: block;
        width: 16px;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        margin: 0;
        cursor: pointer;

        &.current {
          width: 24px;
          background: rgba(255, 255, 255, 1);
        }
      }

      .dot {
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        cursor: pointer;

        &.current {
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  @mixin dotsPosition($type: line) {
    &.top:has(> .#{$type}) {
      left: 50%;
      top: 18px;
      transform: translateX(-50%) translateY(-50%);
    }
    &.bottom:has(> .#{$type}) {
      left: 50%;
      bottom: 18px;
      transform: translateX(-50%) translateY(50%);
    }
    &.left:has(> .#{$type}) {
      top: 50%;
      left: 18px;
      transform: translateX(-50%) translateY(-50%) rotate(90deg);
    }
    &.right:has(> .#{$type}) {
      top: 50%;
      right: 18px;
      transform: translateX(50%) translateY(-50%) rotate(90deg);
    }
    &.top-left:has(> .#{$type}) {
      top: 18px;
      left: 18px;
    }
    &.top-right:has(> .#{$type}) {
      top: 18px;
      right: 18px;
    }
    &.bottom-left:has(> .#{$type}) {
      bottom: 18px;
      left: 18px;
    }
    &.bottom-right:has(> .#{$type}) {
      bottom: 18px;
      right: 18px;
    }
  }

  .hover.dots,
  .always.dots {
    @include dotsPosition(line);
    @include dotsPosition(dot);
  }
}

.horizontal.container:hover .dots {
  opacity: 1;
}

.vertical {
  .never {
    display: none;
  }

  .hover {
    &.dots {
      position: absolute;
      display: flex;
      gap: 8px;
      flex-direction: column;
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      opacity: 0;
      transition: all 0.3s;

      .line {
        display: block;
        width: 4px;
        height: 16px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        cursor: pointer;

        &.current {
          height: 24px;
          background: rgba(255, 255, 255, 1);
        }
      }

      .dot {
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        cursor: pointer;

        &.current {
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .always {
    &.dots {
      position: absolute;
      display: flex;
      gap: 8px;
      flex-direction: column;
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      opacity: 1;
      transition: all 0.3s;

      .line {
        display: block;
        width: 4px;
        height: 16px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        cursor: pointer;

        &.current {
          height: 24px;
          background: rgba(255, 255, 255, 1);
        }
      }

      .dot {
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        cursor: pointer;

        &.current {
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  @mixin dotsPosition($type: line) {
    &.top:has(> .#{$type}) {
      left: 50%;
      top: 18px;
      transform: translateX(-50%) translateY(-50%) rotate(-90deg);
    }
    &.bottom:has(> .#{$type}) {
      left: 50%;
      bottom: 18px;
      transform: translateX(-50%) translateY(50%) rotate(-90deg);
    }
    &.left:has(> .#{$type}) {
      top: 50%;
      left: 18px;
      transform: translateX(-50%) translateY(-50%);
    }
    &.right:has(> .#{$type}) {
      top: 50%;
      right: 18px;
      transform: translateX(50%) translateY(-50%);
    }
    &.top-left:has(> .#{$type}) {
      top: 18px;
      left: 18px;
    }
    &.top-right:has(> .#{$type}) {
      top: 18px;
      right: 18px;
    }
    &.bottom-left:has(> .#{$type}) {
      bottom: 18px;
      left: 18px;
    }
    &.bottom-right:has(> .#{$type}) {
      bottom: 18px;
      right: 18px;
    }
  }

  .hover.dots,
  .always.dots {
    @include dotsPosition(line);
    @include dotsPosition(dot);
  }
}

.vertical.container:hover .dots {
  opacity: 1;
}
</style>
