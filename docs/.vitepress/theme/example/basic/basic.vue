<template>
  <base-usage
    :code="usageCode"
    :config-list="configList"
    :panel-list="panelList"
    @panel-change="onPanelChange"
  >
    <template #carousel="{ configProps }">
      <div :style="{ width: '800' }">
        <carousel
          ref="carousel"
          class="carousel"
          transitionStyle="all 4000ms linear"
          v-bind="configProps"
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
import { ref } from 'vue';
import configJson from './props.json';
import { cardListConfig } from './card.js';

const cardList = ref(cardListConfig);
const configList = ref(configJson);
const panelList = [{ label: 'carousel', value: 'carousel' }];

const usageCodeMap = {
  carousel:
    '\n  <div :style="{ width: \'800\' }"> \n   <carousel ref="carousel" class="carousel" transitionStyle="all 4000ms linear" v-bind="configProps" :effect="\'scroll\'" :delay="0" :loop="true" @change="pageChange($event)"> \n   <img v-for="item in cardList" :src="item.src" /> \n </carousel> \n </div> \n'
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
  overflow: hidden;
}

img {
  width: 480px;
  height: 270px;
  object-fit: cover;
  display: block;
}
</style>
