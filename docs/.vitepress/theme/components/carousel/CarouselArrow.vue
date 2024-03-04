<template>
  <div :class="[showArrow, arrowPlacement]">
    <div class="arrow arrow-prev" @click="handlePrev">
      <img src="../../../../assets/custom-arrow-prev.svg" alt="prev" />
    </div>
    <div class="arrow arrow-next" @click="handleNext">
      <img src="../../../../assets/custom-arrow-next.svg" alt="next" />
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
.horizontal {
  .always {
    &.start {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        top: 10px;
        bottom: auto;
        &.arrow-prev {
          left: 10px;
          transform: translate(0);
          opacity: 1;
        }
        &.arrow-next {
          right: 10px;
          transform: translate(0);
          opacity: 1;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.center {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        top: 50%;
        bottom: 50%;
        &.arrow-prev {
          left: 10px;
          transform: translate(0, -50%);
          opacity: 1;
        }
        &.arrow-next {
          right: 10px;
          transform: translate(0, -50%);
          opacity: 1;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.end {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        top: auto;
        bottom: 10px;
        &.arrow-prev {
          left: 10px;
          transform: translate(0);
          opacity: 1;
        }
        &.arrow-next {
          right: 10px;
          transform: translate(0);
          opacity: 1;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.top-left {
      position: absolute;
      display: flex;
      gap: 8px;
      transition: none;
      top: 10px;
      left: 10px;
      opacity: 1;
      .arrow {
        position: relative;
        transform: translate(0);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 1;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.top-right {
      position: absolute;
      display: flex;
      gap: 8px;
      transition: none;
      top: 10px;
      right: 10px;
      opacity: 1;
      .arrow {
        position: relative;
        transform: translate(0);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 1;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.bottom-left {
      position: absolute;
      display: flex;
      gap: 8px;
      transition: none;
      bottom: 10px;
      left: 10px;
      opacity: 1;
      .arrow {
        position: relative;
        transform: translate(0);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 1;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.bottom-right {
      position: absolute;
      display: flex;
      gap: 8px;
      transition: none;
      bottom: 10px;
      right: 10px;
      opacity: 1;
      .arrow {
        position: relative;
        transform: translate(0);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 1;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
  .hover {
    &.start {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: all 0.3s;
        outline: none;
        cursor: pointer;
        top: 10px;
        bottom: auto;
        &.arrow-prev {
          left: 0;
          transform: translate(0);
          opacity: 0;
        }
        &.arrow-next {
          right: 0;
          transform: translate(0);
          opacity: 0;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.center {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: all 0.3s;
        outline: none;
        cursor: pointer;
        top: 50%;
        bottom: 50%;
        &.arrow-prev {
          left: 0;
          transform: translate(0, -50%);
          opacity: 0;
        }
        &.arrow-next {
          right: 0;
          transform: translate(0, -50%);
          opacity: 0;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.end {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: all 0.3s;
        outline: none;
        cursor: pointer;
        top: auto;
        bottom: 10px;
        &.arrow-prev {
          left: 0;
          transform: translate(0);
          opacity: 0;
        }
        &.arrow-next {
          right: 0;
          transform: translate(0);
          opacity: 0;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.top-left {
      position: absolute;
      display: flex;
      gap: 8px;
      transition: opacity 0.3s, background-color 0.3s;
      top: 10px;
      left: 10px;
      opacity: 0;
      .arrow {
        position: relative;
        transform: translate(0);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.top-right {
      position: absolute;
      display: flex;
      gap: 8px;
      transition: opacity 0.3s, background-color 0.3s;
      top: 10px;
      right: 10px;
      opacity: 0;
      .arrow {
        position: relative;
        transform: translate(0);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.bottom-left {
      position: absolute;
      display: flex;
      gap: 8px;
      transition: opacity 0.3s, background-color 0.3s;
      bottom: 10px;
      left: 10px;
      opacity: 0;
      .arrow {
        position: relative;
        transform: translate(0);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.bottom-right {
      position: absolute;
      display: flex;
      gap: 8px;
      transition: opacity 0.3s, background-color 0.3s;
      bottom: 10px;
      right: 10px;
      opacity: 0;
      .arrow {
        position: relative;
        transform: translate(0);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
      }
    }
  }
  &.container {
    &:hover {
      .hover {
        &.start {
          .arrow {
            position: absolute;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: all 0.3s;
            outline: none;
            cursor: pointer;
            top: 10px;
            bottom: auto;
            &.arrow-prev {
              left: 10px;
              transform: translate(0);
              opacity: 1;
            }
            &.arrow-next {
              right: 10px;
              transform: translate(0);
              opacity: 1;
            }
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.center {
          .arrow {
            position: absolute;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: all 0.3s;
            outline: none;
            cursor: pointer;
            top: 50%;
            bottom: 50%;
            &.arrow-prev {
              left: 10px;
              transform: translate(0, -50%);
              opacity: 1;
            }
            &.arrow-next {
              right: 10px;
              transform: translate(0, -50%);
              opacity: 1;
            }
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.end {
          .arrow {
            position: absolute;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: all 0.3s;
            outline: none;
            cursor: pointer;
            top: auto;
            bottom: 10px;
            &.arrow-prev {
              left: 10px;
              transform: translate(0);
              opacity: 1;
            }
            &.arrow-next {
              right: 10px;
              transform: translate(0);
              opacity: 1;
            }
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.top-left {
          position: absolute;
          display: flex;
          gap: 8px;
          transition: 0;
          top: 10px;
          left: 10px;
          opacity: 1;
          .arrow {
            position: relative;
            transform: translate(0);
            top: auto;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: opacity 0.3s, background-color 0.3s;
            outline: none;
            cursor: pointer;
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.top-right {
          position: absolute;
          display: flex;
          gap: 8px;
          transition: 0;
          top: 10px;
          right: 10px;
          opacity: 1;
          .arrow {
            position: relative;
            transform: translate(0);
            top: auto;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: opacity 0.3s, background-color 0.3s;
            outline: none;
            cursor: pointer;
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.bottom-left {
          position: absolute;
          display: flex;
          gap: 8px;
          transition: 0;
          bottom: 10px;
          left: 10px;
          opacity: 1;
          .arrow {
            position: relative;
            transform: translate(0);
            top: auto;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: opacity 0.3s, background-color 0.3s;
            outline: none;
            cursor: pointer;
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.bottom-right {
          position: absolute;
          display: flex;
          gap: 8px;
          transition: 0;
          bottom: 10px;
          right: 10px;
          opacity: 1;
          .arrow {
            position: relative;
            transform: translate(0);
            top: auto;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: opacity 0.3s, background-color 0.3s;
            outline: none;
            cursor: pointer;
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
      }
    }
  }
}
.hover {
  &.bottom-right {
    .arrow {
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
.never {
  .arrow {
    display: none;
    display: none;
  }
}
.vertical {
  .always {
    &.start {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        left: 10px;
        right: auto;
        &.arrow-prev {
          top: 10px;
          transform: rotate(90deg);
          opacity: 1;
        }
        &.arrow-next {
          bottom: 10px;
          transform: rotate(90deg);
          opacity: 1;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.center {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &.arrow-prev {
          top: 10px;
          bottom: auto;
          left: 50%;
          right: 50%;
          transform: translate(-50%, 0) rotate(90deg);
          opacity: 1;
        }
        &.arrow-next {
          top: auto;
          bottom: 10px;
          left: 50%;
          right: 50%;
          transform: translate(-50%, 0) rotate(90deg);
          opacity: 1;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.end {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        left: auto;
        right: 10px;
        &.arrow-prev {
          top: 10px;
          transform: rotate(90deg);
          opacity: 1;
        }
        &.arrow-next {
          bottom: 10px;
          transform: rotate(90deg);
          opacity: 1;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.top-left {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: none;
      top: 10px;
      left: 10px;
      opacity: 1;
      .arrow {
        position: relative;
        transform: rotate(90deg);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 1;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.top-right {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: none;
      top: 10px;
      right: 10px;
      opacity: 1;
      .arrow {
        position: relative;
        transform: rotate(90deg);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 1;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.bottom-left {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: none;
      bottom: 10px;
      left: 10px;
      opacity: 1;
      .arrow {
        position: relative;
        transform: rotate(90deg);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 1;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.bottom-right {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: none;
      bottom: 10px;
      right: 10px;
      opacity: 1;
      .arrow {
        position: relative;
        transform: rotate(90deg);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 1;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
  .hover {
    &.start {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: all 0.3s;
        outline: none;
        cursor: pointer;
        left: 10px;
        right: auto;
        &.arrow-prev {
          top: 0;
          transform: rotate(90deg);
          opacity: 0;
        }
        &.arrow-next {
          bottom: 0;
          transform: rotate(90deg);
          opacity: 0;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.center {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: all 0.3s;
        outline: none;
        cursor: pointer;
        left: 50%;
        right: 50%;
        &.arrow-prev {
          top: 0;
          transform: translate(-50%, 0) rotate(90deg);
          opacity: 0;
        }
        &.arrow-next {
          bottom: 0;
          transform: translate(-50%, 0) rotate(90deg);
          opacity: 0;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.end {
      .arrow {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: all 0.3s;
        outline: none;
        cursor: pointer;
        left: auto;
        right: 10px;
        &.arrow-prev {
          top: 0;
          transform: rotate(90deg);
          opacity: 0;
        }
        &.arrow-next {
          bottom: 0;
          transform: rotate(90deg);
          opacity: 0;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.top-left {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: opacity 0.3s, background-color 0.3s;
      top: 10px;
      left: 10px;
      opacity: 0;
      .arrow {
        position: relative;
        transform: rotate(90deg);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.top-right {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: opacity 0.3s, background-color 0.3s;
      top: 10px;
      right: 10px;
      opacity: 0;
      .arrow {
        position: relative;
        transform: rotate(90deg);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.bottom-left {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: opacity 0.3s, background-color 0.3s;
      bottom: 10px;
      left: 10px;
      opacity: 0;
      .arrow {
        position: relative;
        transform: rotate(90deg);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
    &.bottom-right {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: opacity 0.3s, background-color 0.3s;
      bottom: 10px;
      right: 10px;
      opacity: 0;
      .arrow {
        position: relative;
        transform: rotate(90deg);
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        opacity: 0;
        transition: opacity 0.3s, background-color 0.3s;
        outline: none;
        cursor: pointer;
      }
    }
  }
  &.container {
    &:hover {
      .hover {
        &.start {
          .arrow {
            position: absolute;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: all 0.3s;
            outline: none;
            cursor: pointer;
            left: 10px;
            right: auto;
            &.arrow-prev {
              top: 10px;
              transform: rotate(90deg);
              opacity: 1;
            }
            &.arrow-next {
              bottom: 10px;
              transform: rotate(90deg);
              opacity: 1;
            }
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.center {
          .arrow {
            position: absolute;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: all 0.3s;
            outline: none;
            cursor: pointer;
            left: 50%;
            right: 50%;
            &.arrow-prev {
              top: 10px;
              transform: translate(-50%, 0) rotate(90deg);
              opacity: 1;
            }
            &.arrow-next {
              bottom: 10px;
              transform: translate(-50%, 0) rotate(90deg);
              opacity: 1;
            }
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.end {
          .arrow {
            position: absolute;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: all 0.3s;
            outline: none;
            cursor: pointer;
            left: auto;
            right: 10px;
            &.arrow-prev {
              top: 10px;
              transform: rotate(90deg);
              opacity: 1;
            }
            &.arrow-next {
              bottom: 10px;
              transform: rotate(90deg);
              opacity: 1;
            }
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.top-left {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: none;
          top: 10px;
          left: 10px;
          opacity: 1;
          .arrow {
            position: relative;
            transform: rotate(90deg);
            top: auto;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: opacity 0.3s, background-color 0.3s;
            outline: none;
            cursor: pointer;
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.top-right {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: none;
          top: 10px;
          right: 10px;
          opacity: 1;
          .arrow {
            position: relative;
            transform: rotate(90deg);
            top: auto;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: opacity 0.3s, background-color 0.3s;
            outline: none;
            cursor: pointer;
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.bottom-left {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: none;
          bottom: 10px;
          left: 10px;
          opacity: 1;
          .arrow {
            position: relative;
            transform: rotate(90deg);
            top: auto;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: opacity 0.3s, background-color 0.3s;
            outline: none;
            cursor: pointer;
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
        &.bottom-right {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: none;
          bottom: 10px;
          right: 10px;
          opacity: 1;
          .arrow {
            position: relative;
            transform: rotate(90deg);
            top: auto;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            background: transparent;
            opacity: 1;
            transition: opacity 0.3s, background-color 0.3s;
            outline: none;
            cursor: pointer;
            &:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
      }
    }
  }
}
</style>
