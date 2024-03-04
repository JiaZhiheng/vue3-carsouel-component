<template>
  <div class="segmented">
    <div class="segmented-group">
      <label
        v-for="item in option"
        class="segmented-item"
        :class="[
          item.disabled ? 'segmented-item-disabled' : '',
          value === item.value ? 'segmented-item-selected' : ''
        ]"
        @click="handleChange(item.value)"
      >
        <input type="radio" class="segmented-item-input" />
        <div :title="item.value" class="segmented-item-label">{{ item.value }}</div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  option: Array,
  value: String
});

const emit = defineEmits(['update:value', 'change']);

watch(
  () => props.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      emit('change', newValue);
    }
  }
);

function handleChange(value) {
  emit('update:value', value);
}
</script>

<style scoped lang="scss">
.segmented {
  box-sizing: border-box;
  margin: 0;
  padding: 2px;
  color: rgba(0, 0, 0, 1);
  list-style: none;
  display: inline-block;
  background-color: #f5f5f5;
  border-radius: 6px;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  .segmented-group {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-items: flex-start;
    width: 100%;

    .segmented-item {
      position: relative;
      text-align: center;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      border-radius: 4px;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        inset-inline-start: 0;
        border-radius: inherit;
        transition: background-color 0.2s;
        pointer-events: none;
      }

      .segmented-item-input {
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
      }

      .segmented-item-label {
        min-height: 28px;
        line-height: 28px;
        padding: 0 11px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .segmented-item-selected {
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px 0 rgba(0, 0, 0, 0.02);
      color: rgba(0, 0, 0, 1);
      font-weight: 500;
    }
  }
}
</style>
