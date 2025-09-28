<template>
    <RouterLink to="/about" class="about-button nav-button">
        <LogoIcon class="about-button__icon"></LogoIcon>
    </RouterLink>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import NavButton from './NavButton.vue';
import LogoIcon from '@/icons/LogoIcon.vue';

export default {
    components: {
        LogoIcon
    }

}
</script>

<style scoped>
.about-button {
    height: 2rem;
}
.about-button__icon {
    height: 100%;
}
</style>