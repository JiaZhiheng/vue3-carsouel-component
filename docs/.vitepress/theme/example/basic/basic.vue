<template>
  <base-usage
    :code="usageCode"
    :config-list="configList"
    :panel-list="panelList"
    @panel-change="onPanelChange"
  >
    <template #swiper="{ configProps }">
      <div :style="{ width: '800' }">
        <carousel
          ref="carousel"
          class="carousel"
          transitionStyle="all 4000ms linear"
          :showDots="configProps.showDots"
          :showArrow="configProps.showArrow"
          :effect="'scroll'"
          :delay="0"
          :loop="true"
          @change="pageChange($event)"
        >
          <img v-for="item in cardList" :src="item.src" />
        </carousel>
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';
import { cardListConfig } from './card.js';

const cardList = ref(cardListConfig);
const configList = ref(configJson);
const panelList = [{ label: 'swiper', value: 'swiper' }];

const usageCodeMap = {
  swiper: `<carousel
          ref="carousel"
          class="carousel"
          transitionStyle="all 300ms linear"
          :showDots="configProps.showDots"
          :showArrow="configProps.showArrow"
          :effect="'slide'"
          :delay="4000"
          :loop="true"
          @change="pageChange($event)"
        ><div v-for="item in cardList" :style="item.style"></div>
        </carousel>`
};

const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}

function pageChange(index) {}
</script>

<style scoped>
.carousel {
  width: 480px;
  height: 270px;
}
</style>
