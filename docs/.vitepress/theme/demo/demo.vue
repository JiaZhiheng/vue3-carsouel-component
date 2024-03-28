<template>
  <div class="wrap">
    <table class="table">
      <caption>参数指示器</caption>
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>选项</th>
      </tr>
      <tr>
        <td>direction</td>
        <td>轮播图方向</td>
        <td>
          <segmented
            @change="handleChange($event)"
            :option="directionOption"
            v-model:value="direction"
          ></segmented>
        </td>
      </tr>
      <tr>
        <td>showDots</td>
        <td>是否显示轮播点</td>
        <td>
          <segmented
            @change="handleChange($event)"
            :option="showDotsOption"
            v-model:value="showDots"
          ></segmented>
        </td>
      </tr>
      <tr>
        <td>showArrow</td>
        <td>是否显示轮播箭头</td>
        <td>
          <segmented
            @change="handleChange($event)"
            :option="showArrowOption"
            v-model:value="showArrow"
          ></segmented>
        </td>
      </tr>
      <tr>
        <td>dotPlacement</td>
        <td>轮播指示点位置</td>
        <td>
          <segmented
            @change="handleChange($event)"
            :option="dotPlacementOption"
            v-model:value="dotPlacement"
          ></segmented>
        </td>
      </tr>
      <tr>
        <td>arrowPlacement</td>
        <td>轮播箭头位置</td>
        <td>
          <segmented
            @change="handleChange($event)"
            :option="arrowPlacementOption"
            v-model:value="arrowPlacement"
          ></segmented>
        </td>
      </tr>
      <tr>
        <td>dotType</td>
        <td>轮播指示点样式</td>
        <td>
          <segmented
            @change="handleChange($event)"
            :option="dotTypeOption"
            v-model:value="dotType"
          ></segmented>
        </td>
      </tr>
    </table>
    <carousel
      ref="carousel"
      class="carousel"
      transitionStyle="all 300ms linear"
      :showDots="showDots"
      :showArrow="showArrow"
      :dotPlacement="dotPlacement"
      :arrowPlacement="arrowPlacement"
      :dotType="dotType"
      :direction="direction"
      :effect="'slide'"
      :delay="4000"
      :loop="true"
      @change="pageChange($event)"
    >
      <div v-for="item in cardList" :style="item.style"></div>
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <button type="button" class="custom-arrow--left" @click="prev">
            <img src="../components/carousel/assets/custom-arrow-prev.svg" alt="prev" />
          </button>
          <button type="button" class="custom-arrow--right" @click="next">
            <img src="../components/carousel/assets/custom-arrow-next.svg" alt="next" />
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          ></li>
        </ul>
      </template>
    </carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Segmented from '../../../../src/components/segmented/Segmented.vue';
import Carousel from '../../../../src/components/carousel/Carousel.vue';

const carousel = ref(null);

const direction = ref('horizontal'); // vertical | horizontal
const showDots = ref('always');
const showArrow = ref('always');
const dotPlacement = ref('bottom');
const arrowPlacement = ref('center');
const dotType = ref('line');

const showDotsOption = ref([
  {
    value: 'always',
    disabled: false
  },
  {
    value: 'hover',
    disabled: false
  },
  {
    value: 'never',
    disabled: false
  }
]);
const showArrowOption = ref([
  {
    value: 'always',
    disabled: false
  },
  {
    value: 'hover',
    disabled: false
  },
  {
    value: 'never',
    disabled: false
  }
]);
const dotPlacementOption = ref([
  {
    value: 'top',
    disabled: false
  },
  {
    value: 'bottom',
    disabled: false
  },
  {
    value: 'left',
    disabled: false
  },
  {
    value: 'right',
    disabled: false
  },
  {
    value: 'top-left',
    disabled: false
  },
  {
    value: 'top-right',
    disabled: false
  },
  {
    value: 'bottom-left',
    disabled: false
  },
  {
    value: 'bottom-right',
    disabled: false
  }
]);
const arrowPlacementOption = ref([
  {
    value: 'start',
    disabled: false
  },
  {
    value: 'center',
    disabled: false
  },
  {
    value: 'end',
    disabled: false
  },
  {
    value: 'top-left',
    disabled: false
  },
  {
    value: 'top-right',
    disabled: false
  },
  {
    value: 'bottom-left',
    disabled: false
  },
  {
    value: 'bottom-right',
    disabled: false
  }
]);
const dotTypeOption = ref([
  {
    value: 'dot',
    disabled: false
  },
  {
    value: 'line',
    disabled: false
  }
]);
const directionOption = ref([
  {
    value: 'horizontal',
    disabled: false
  },
  {
    value: 'vertical',
    disabled: false
  }
]);

function handleChange(value) {
  carousel.value.to(5);
}

function pageChange(index) {
  console.log('pageChange', index);
}

const cardList = ref([
  {
    style: {
      backgroundColor: '#5c0011',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#610b00',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#612500',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#613400',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#614700',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#254000',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#092b00',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#002329',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#001d66',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#030852',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#120338',
      width: '100%',
      height: '100%'
    }
  },
  {
    style: {
      backgroundColor: '#520339',
      width: '100%',
      height: '100%'
    }
  }
]);
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
}

table {
  width: 950px;
  border-collapse: collapse;

  caption {
    font-size: 1.5rem;
    line-height: 2;
    border: 1px solid #ddd;
    border-bottom: none;
    background-color: #dfdfdf;
  }

  th {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
}

.carousel {
  width: 550px;
  height: 350px;
}

/* 自定义样式 */
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>
