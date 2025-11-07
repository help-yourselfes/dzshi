<template>
    <component :is="AsyncComponent" />
</template>

<script setup lang="ts">
import { useResponsiveAsyncView } from './useResponsiveAsyncView';

const { AsyncComponent } = useResponsiveAsyncView('about'); 
</script>
