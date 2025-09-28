<template>
  <div class="dropdown" @click="toggleDropdown">
    <button class="dropdown-button">
      <slot name="selected" :selected="selectedLabel" />
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <slot name="values" :select="select" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const selected = ref<{ label: string } | null>(null);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectedLabel = computed(() => (selected.value ? selected.value.label : 'Select an option'));

function select(item: { label: string }) {
  selected.value = item;
  isOpen.value = false;
}

/* slot types so parent can destructure without TS errors */
defineSlots<{
  selected: { selected: string };
  values: { select: (item: { label: string }) => void };
}>();
</script>

<style>
.dropdown {
  position: relative;
}

.dropdown-button {
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  flex-direction: row;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 20;
}
</style>
