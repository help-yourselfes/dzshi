<template>
    <DaySelect :selectedDayId="dayId" />
    <Container v-if="calls.loading.value || calls.error.value">
        <div v-if="calls.loading.value" class="center">
            Загружаю
            <Spinner />
        </div>
        <div v-else-if="calls.error.value?.message === 'unsupported day'" class="unsupported-day">
            Этот день не поддерживается
        </div>
        <ErrorBox :error="calls.error.value" v-else />
    </Container>
    <Container v-else>
        <div class="list" v-if="currentCallId.data">
            <Container v-for="(call, key) in calls.data.value">
                <Call :call :key :isCurrent="key === currentCallId.data.value" />
            </Container>
        </div>
    </Container>
</template>

<script setup lang="ts">


import Call from '@/components/Calls/Call.vue';
import DaySelect from '@/components/dayChoice/DaySelect.vue';
import Container from '@/components/primitives/Container.vue';
import ErrorBox from '@/components/primitives/ErrorBox.vue';
import Spinner from '@/components/primitives/Spinner/Spinner.vue';
import type { UseDataResult } from '@/data/functions/useData';
import type { callInfo } from '@/data/types';

const props = defineProps<{
    dayId: number,
    calls: UseDataResult<callInfo[]>,
    currentCallId: UseDataResult<number>
}>()

</script>
<style scoped>
.center {
    justify-content: center;
}

.unsupported-day {
    display: flex;
    justify-content: center;
    padding: 1rem;
    border-radius: 1rem;
    background-color: lightgray;
    margin: 1rem;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
}
</style>