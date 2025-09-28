<template>
  <div class="dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      <slot name="selected" />
      <DropdownArrowIcon :is-opended="isOpen" />
    </button>

    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <slot name="values" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import DropdownArrowIcon from '@/icons/DropdownArrowIcon.vue';
import { ref } from 'vue';

let timer = 0;
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      isOpen.value = false
    }, 2 * 1000)
  }
};

defineSlots<{
  selected: { selected: string };
  values: { select: (item: { label: string }) => void };
}>();
</script>

<style>
.dropdown {
  position: relative;
  display: inline-block;
  min-width: 9rem;
}

.dropdown-arrow {
  height: 1rem;
  transition: rotate 300ms ease;
}

.dropdown-arrow.open {
  rotate: -180deg;
}

.dropdown-button {
  padding: 0.5rem;
  border-radius: 2rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
  transition: all 100ms;
  width: 100%;
  justify-content: space-between;
}

.dropdown-button:active {
  scale: 0.9;
}


.dropdown-menu {
  width: 100%;
  position: absolute;
  top: calc(100% + 0.5rem);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 20;
  overflow: hidden;
  transform-origin: 50% 0%;
}

.dropdown-enter-active {
  transition: all 0.3s ease;
}

.dropdown-leave-active {
  transition: 0.3s all cubic-bezier(.6, -0.28, .74, .05);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-2rem);
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: scale(0.8, 0);
}

.nav-button {
  width: 100% !important;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem 0.5rem !important;
}
</style>