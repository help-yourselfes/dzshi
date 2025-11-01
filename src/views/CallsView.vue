<template>
    <DaySelect :selectedDayId="dayId" />
    <Container v-if="loading || error">
        <div v-if="loading">
            Загружаю ...
        </div>
        <div v-else-if="error === 'unsupported day'" class="unsupported-day">
            Этот день не поддерживается
        </div>
        <ErrorBox :error v-else />
    </Container>
    <Container v-else>
        <div class="list">
            <Call v-for="(call, index) in calls" :call="call" :key="index"></Call>
        </div>
    </Container>
</template>

<script setup lang="ts">
import Call from '@/components/Calls/Call.vue';
import DaySelect from '@/components/dayChoice/DaySelect.vue';
import Container from '@/components/primitives/Container.vue';
import ErrorBox from '@/components/primitives/ErrorBox.vue';
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import type { callInfo } from '@/data/types';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const dayId = ref<number>(0);
const { data: calls, error, loading, reload: reloadCalls } = useData<callInfo[]>(
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

watch(() => route.params.dayId, () => {
    reloadCalls()
})

</script>
<style scoped>
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