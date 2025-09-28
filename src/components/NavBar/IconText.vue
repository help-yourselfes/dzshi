<template>
  <span v-if="$slots.icon" class="nav-button__icon">
    <slot name="icon" />
  </span>
  <span class="nav-button__text">
    <slot />
  </span>
</template>

<script setup lang="ts">

</script>

<style>

.icon {
  height: 1rem;
  fill: black;
}
</style>