<template>
    <DaySelect :selectedDayId="dayId" />
    <Container v-if="calls.loading.value || calls.error.value">
        <div v-if="calls.loading.value" class="center">
            Загружаю
            <Spinner />
        </div>
        <div v-else-if="calls.error.value === 'unsupported day'" class="unsupported-day">
            Этот день не поддерживается
        </div>
        <ErrorBox :error="calls.error.value" v-else />
    </Container>
    <Container v-else>
        <div class="list">

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
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import type { callInfo } from '@/data/types';
import { onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const dayId = ref<number>(0);

const calls = useData<callInfo[]>(
    async () => {
        const day = parseInt(route.params.dayId as string) || (await api.getCurrentDayId())

        if (dayId.value !== day) {
            router.replace(`/calls/${day}`)
        }

        dayId.value = day;
        const res = await api.getCalls(day);
        return res
    }
)

watch(() => route.params.dayId, calls.reload)

const currentCallId = useData<number>(async () =>
    await api.getCurrentCallId(dayId.value)
)

const timer = setInterval(currentCallId.reload, 60_000);
onUnmounted(() => {
    clearInterval(timer)
})


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

html.mobile {
    .list {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
    }
}
</style>