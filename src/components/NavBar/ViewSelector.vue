<template>
  <div class="dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      <slot name="selected" />
    </button>

    <transition
      name="dropdown"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
    >
      <div v-if="isOpen" class="dropdown-menu">
        <slot name="values" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const onEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0';
  element.style.opacity = '0';
  
  requestAnimationFrame(() => {
    element.style.transition = 'height 0.3s ease, opacity 0.2s ease 0.1s';
    element.style.height = `${element.scrollHeight}px`;
    element.style.opacity = '1';
  });
};

// Финализация появления
const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = 'auto';
  element.style.transition = '';
};

// Анимация скрытия
const onLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = `${element.scrollHeight}px`;
  element.style.opacity = '1';
  
  requestAnimationFrame(() => {
    element.style.transition = 'height 0.3s ease, opacity 0.2s ease';
    element.style.height = '0';
    element.style.opacity = '0';
  });
};

defineSlots<{
  selected: { selected: string };
  values: { select: (item: { label: string }) => void };
}>();
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  border-radius: 2rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 20;
  overflow: hidden;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>