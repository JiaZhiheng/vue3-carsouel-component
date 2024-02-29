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
const props = defineProps({
  cardNum: Number,
  slidesPerView: Number,
  indexCounter: Number,
  dotPlacement: String,
  dotType: String,
  showDots: String
});

const emit = defineEmits(['to']);

const config = generateCardArray(props.cardNum, props.slidesPerView);

function generateCardArray(cardNum, slidesPerView) {
  const cardArray = [];
  for (let i = 0; i < cardNum; i++) {
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
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      opacity: 0;
      transition: all 0.3s;

      .line {
        margin: 0 4px;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          width: 16px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }

        &.current::before {
          width: 24px;
          background: rgba(255, 255, 255, 1);
        }
      }

      .dot {
        margin: 0 4px;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }

        &.current::before {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .always {
    &.dots {
      position: absolute;
      display: flex;
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      opacity: 1;
      transition: all 0.3s;

      .line {
        margin: 0 4px;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          width: 16px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }

        &.current::before {
          width: 24px;
          background: rgba(255, 255, 255, 1);
        }
      }

      .dot {
        margin: 0 4px;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }

        &.current::before {
          width: 8px;
          height: 8px;
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
      flex-direction: column;
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      opacity: 0;
      transition: all 0.3s;

      .line {
        margin: 4px 0;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          width: 4px;
          height: 16px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }

        &.current::before {
          height: 24px;
          background: rgba(255, 255, 255, 1);
        }
      }

      .dot {
        margin: 4px 0;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }

        &.current::before {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .always {
    &.dots {
      position: absolute;
      display: flex;
      flex-direction: column;
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      opacity: 1;
      transition: all 0.3s;

      .line {
        margin: 4px 0;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          width: 4px;
          height: 16px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }

        &.current::before {
          height: 24px;
          background: rgba(255, 255, 255, 1);
        }
      }

      .dot {
        margin: 4px 0;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s;
        }

        &.current::before {
          width: 8px;
          height: 8px;
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
