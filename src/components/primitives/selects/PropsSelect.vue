<template>
  <div class="dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      <div class="choice">
        <component :is="currentChoice" />
      </div>
      <DropdownArrowIcon :is-opended="isOpen" style="fill: var(--text)"/>
    </button>


    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <div v-for="(choice, key) in choices" :key @click="handleChange(choice)" class="choice">
          <component :is="choice" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import DropdownArrowIcon from '@/icons/DropdownArrowIcon.vue';
import { ref, shallowRef, type Component } from 'vue';

let timer = 0;

const isOpen = ref(false);

const props = defineProps<{
  choices: Component[]
}>()
const currentChoice = shallowRef(props.choices[0]);

const emit = defineEmits<{
  change: [Component]
}>()

const handleChange = (newChoice: Component) => {
  currentChoice.value = newChoice;
  isOpen.value = false;
  emit('change', newChoice)
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      isOpen.value = false
    }, 2 * 1000)
  }
};
</script>

<style scoped>
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
  color: var(--text);
  padding: 0 0.5rem 0 0;
  border-radius: 2rem;
  background-color: var(--middle);
  border: 0.125rem solid var(--top);
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

.choice {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.5rem 1rem;
  border-radius: 999px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;

  width: max-content;
  font-weight: var(--f_middleS);
}

.dropdown-menu {
  width: 100%;
  position: absolute;
  top: calc(100% + 0.5rem);
  background-color: var(--middle);
  border: 0.125rem solid var(--top);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 99;
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
</style>