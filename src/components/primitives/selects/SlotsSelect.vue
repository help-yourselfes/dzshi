<template>
    <none style="display: none;">
        <slot/>
    </none>
    <PropsSelect :choices />
    <component v-for="choice in choices" :is="choice"></component>
</template>
<script setup lang="ts">
import { useSlots, type Component, type VNode } from 'vue';
import PropsSelect from './PropsSelect.vue';

const slots = useSlots();
const vnodes: VNode[] = slots.default ? slots.default() : [];


// Filter and map VNodes to component definitions
const choices = vnodes
.map(v => v.type)               // vnode.type is the component definition or a string for native elements
  .filter((t): t is any => {     // keep only component definitions
    // Exclude strings (native tags), symbols (Fragment, Teleport), and null/undefined
    if (!t) return false;
    const tType = typeof t;
    if (tType === 'string') return false;
    if (tType === 'symbol') return false;
    // functions or objects are component defs (async components are functions too)
    return tType === 'object' || tType === 'function';
});

</script>