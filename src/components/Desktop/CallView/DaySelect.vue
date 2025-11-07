<template>
    <div class="day-select">
        Выбери день:
        <WaitASecond v-if="loading" />
        <ErrorBox v-else-if="error" :error />
        <Container v-else>
            <DayLink v-for="day in days" :day :is-selected="day.number === dayId" />
        </Container>
    </div>
</template>

<script setup lang="ts">
import Container from '@/components/primitives/Container.vue';
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import DayLink from './DayLink.vue';
import WaitASecond from '@/components/primitives/Spinner/WaitASecond.vue';
import ErrorBox from '@/components/primitives/ErrorBox.vue';

const props = defineProps<{
    dayId: number
}>();

const { data: days, error, loading } = useData(() => api.getAviableDays())
</script>