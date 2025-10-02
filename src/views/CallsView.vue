<template>
    <div>
        <DaySelect :selectedDayId="dayId" />
        <div v-if="calls" class="list">
            <Call v-for="(call, index) in calls" :call="call" :key="index"></Call>
        </div>
        <div v-else>
            Загружаю ...
        </div>
    </div>
</template>

<script setup lang="ts">
import Call from '@/components/Calls/Call.vue';
import DaySelect from '@/components/dayChoice/DaySelect.vue';
import api from '@/data/functions/Api';
import type { callInfo } from '@/data/types';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const calls = ref<callInfo[]>();
const dayId = ref<number>(1);

onMounted(async () => {
    const currentDay = await api.getCurrentDay();

    if (currentDay) {
        if (dayId.value !== currentDay.number) {
            router.replace(`/calls/${currentDay.number}`)
        }
        updateCalls(currentDay.number)
    }
    else {
        updateCalls(parseInt(route.params.dayId as string) || 1);
    }

});

const updateCalls = async (newDayId: number) => {
    dayId.value = newDayId;
    console.log(dayId.value)

    try {
        const res: callInfo[] = await api.getCalls(newDayId);
        calls.value = res;
    } catch (error) {
        console.error(error)
    }
}

watch(() => parseInt(route.params.dayId as string), (newDayId) => {
    updateCalls(newDayId);
})

</script>
<style scoped>
html.mobile {
    .list {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
    }
}
</style>