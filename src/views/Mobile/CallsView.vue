<template>
    <DaySelect :selectedDayId="dayId" />
    <Container v-if="calls.loading.value || calls.error.value">
        <WaitASecond v-if="calls.loading.value" class="center" />
        <div v-else-if="calls.error.value === 'unsupported day'" class="unsupported-day">
            Этот день не поддерживается
            <NoDataSticker class="sticker" />
        </div>
        <ErrorBox :error="calls.error.value" v-else />
    </Container>
    <Container v-else>
        <div class="list" v-if="currentCallId.data">
            <Call v-for="(call, key) in calls.data.value" :call :key :isCurrent="key === 
            currentCallId.data.value
            // 7
            " />
        </div>
    </Container>
</template>

<script setup lang="ts">


import Call from '@/components/Calls/Call.vue';
import DaySelect from '@/components/dayChoice/DaySelect.vue';
import Container from '@/components/primitives/Container.vue';
import ErrorBox from '@/components/primitives/ErrorBox.vue';
import WaitASecond from '@/components/primitives/Spinner/WaitASecond.vue';
import NoDataSticker from '@/components/stickers/NoDataSticker.vue';
import type { UseDataResult } from '@/data/functions/useData';
import type { callInfo } from '@/data/types';

const props = defineProps<{
    dayId: number,
    calls: UseDataResult<callInfo[]>,
    currentCallId: UseDataResult<number>
}>()

</script>
<style>
.view.calls {
    flex-direction: column;
    justify-content: start;
    gap: 1rem;
}
</style>

<style scoped>
.center {
    justify-content: center;
}

.unsupported-day {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--middle);
    margin: 1rem;
}

.sticker {
    width: 16rem;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    width: 100%;
}
</style>