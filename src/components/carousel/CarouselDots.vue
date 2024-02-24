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

    .container:hover & {
      opacity: 1;
    }

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

.hover.dots.top:has(> .line) {
  left: 50%;
  transform: translateX(-50%);
  top: 18px;
}

.hover.dots.bottom:has(> .line) {
  left: 50%;
  transform: translateX(-50%);
  bottom: 18px;
}

.hover.dots.left:has(> .line) {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  left: -32px;
}

.hover.dots.right:has(> .line) {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  right: -32px;
}

.hover.dots.top:has(> .dot) {
  left: 50%;
  transform: translateX(-50%);
  top: 18px;
}

.hover.dots.bottom:has(> .dot) {
  left: 50%;
  transform: translateX(-50%);
  bottom: 18px;
}

.hover.dots.left:has(> .dot) {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  left: -10px;
}

.hover.dots.right:has(> .dot) {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  right: -10px;
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

.always.dots.top:has(> .line) {
  left: 50%;
  transform: translateX(-50%);
  top: 18px;
}

.always.dots.bottom:has(> .line) {
  left: 50%;
  transform: translateX(-50%);
  bottom: 18px;
}

.always.dots.left:has(> .line) {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  left: -32px;
}

.always.dots.right:has(> .line) {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  right: -32px;
}

.always.dots.top:has(> .dot) {
  left: 50%;
  transform: translateX(-50%);
  top: 18px;
}

.always.dots.bottom:has(> .dot) {
  left: 50%;
  transform: translateX(-50%);
  bottom: 18px;
}

.always.dots.left:has(> .dot) {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  left: -10px;
}

.always.dots.right:has(> .dot) {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  right: -10px;
}
</style>
