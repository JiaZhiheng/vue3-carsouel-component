<template>
  <ClientOnly>
    <PlayGround />
  </ClientOnly>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const PlayGround = defineAsyncComponent(() =>
  import('../components/playground/playground.vue')
);
</script>

<style>
</style>
