<template>
  <base-usage
    :code="usageCode"
    :config-list="configList"
    :panel-list="panelList"
    @panel-change="onPanelChange"
  >
    <template #swiper="{ configProps }">
      <div :style="{ width: '500px' }">
        <carousel
          ref="carousel"
          class="carousel"
          transitionStyle="all 300ms linear"
          :showDots="configProps.showDots"
          :showArrow="configProps.showArrow"
          :effect="'slide'"
          :delay="4000"
          :loop="true"
          @change="pageChange($event)"
        >
          <div v-for="item in cardList" :style="item.style"></div>
        </carousel>
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './usage/props.json';
import Carousel from '../src/components/carousel/Carousel.vue';
import BaseUsage from './demo/base-usage.vue';

const configList = ref(configJson);
const panelList = [{ label: 'swiper', value: 'swiper' }];

// const usageCodeMap = {
//   swiper:
//     '\n        <div :style="{ width: \'500px\' }">\n          <t-swiper :duration="300" :interval="2000" v-bind="configProps" :navigation="{ type: configProps.navigationType }">\n            <t-swiper-item>\n              <div :style="{ height: \'200px\', background: \'var(--td-success-color-7)\' }" />\n            </t-swiper-item>\n            <t-swiper-item>\n              <div :style="{ height: \'200px\', background: \'var(--td-warning-color-7)\' }" />\n            </t-swiper-item>\n            <t-swiper-item>\n              <div :style="{ height: \'200px\', background: \'var(--td-error-color-7)\' }" />\n            </t-swiper-item>\n          </t-swiper>\n        </div>\n      '
// };

const usageCodeMap = {
  swiper: ''
};

const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
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

<style>
.carousel {
  width: 550px;
  height: 200px;
}
</style>
