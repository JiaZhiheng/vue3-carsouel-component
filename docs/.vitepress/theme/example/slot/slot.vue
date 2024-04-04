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
          transitionStyle="all 300ms linear"
          :showDots="configList.showDots"
          :showArrow="configList.showArrow"
          :dotPlacement="configList.dotPlacement"
          :arrowPlacement="configList.arrowPlacement"
          :dotType="configList.dotType"
          :direction="configList.direction"
          :effect="'slide'"
          :delay="4000"
          :loop="true"
          :autoplay="false"
          @change="pageChange($event)"
        >
          <img class="img" src="https://jiazhiheng.github.io/vue3-carsouel-component/images/1.webp" />
          <img class="img" src="https://jiazhiheng.github.io/vue3-carsouel-component/images/2.webp" />
          <img class="img" src="https://jiazhiheng.github.io/vue3-carsouel-component/images/3.webp" />
          <img class="img" src="https://jiazhiheng.github.io/vue3-carsouel-component/images/4.webp" />
          <img class="img" src="https://jiazhiheng.github.io/vue3-carsouel-component/images/5.webp" />
          <img class="img" src="https://jiazhiheng.github.io/vue3-carsouel-component/images/6.webp" />
          <img class="img" src="https://jiazhiheng.github.io/vue3-carsouel-component/images/7.webp" />
          <img class="img" src="https://jiazhiheng.github.io/vue3-carsouel-component/images/8.webp" />
          <template #arrow="{ prev, next }">
            <div class="custom-arrow">
              <button type="button" class="custom-arrow--left" @click="prev">
                <img
                  src="https://jiazhiheng.github.io/vue3-carsouel-component/example/custom-arrow-prev.svg"
                  alt="prev"
                />
              </button>
              <button type="button" class="custom-arrow--right" @click="next">
                <img
                  src="https://jiazhiheng.github.io/vue3-carsouel-component/example/custom-arrow-next.svg"
                  alt="next"
                />
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
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';
import { cardListConfig } from './card.js';

const cardList = ref(cardListConfig);
const configList = ref(configJson);
const panelList = [{ label: 'carousel', value: 'carousel' }];

const usageCodeMap = {
  carousel: `<carousel
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
.custom-arrow {
  display: flex;
  position: absolute;
  gap: 12px;
  bottom: 12px;
  right: 12px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
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
  bottom: 18px;
  left: 18px;
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

.img {
  display: block;
  width: 480px;
  height: 270px;
}
</style>
