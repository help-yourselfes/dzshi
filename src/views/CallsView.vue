<template>
    <div>
        <DaySelect />
        <div v-if="calls" class="list">
            <Call v-for="(call, index) in calls" :call="call" :key="index"></Call>
        </div>
        <div v-else>
            Загружаю ...
        </div>
    </div>
</template>

<script lang="ts">
import Call from '@/components/Calls/Call.vue';
import DaySelect from '@/components/dayChoice/DaySelect.vue';
import api from '@/data/functions/Api';
import type { callInfo } from '@/data/types';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    components: {
        Call, DaySelect
    },
    setup() {
        const route = useRoute();
        const callsData = ref<callInfo[]>();
        const dayId = ref<number>(1);

        onMounted(async () => {
            try {
                fetchCalls()
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
            updateDayId(parseInt(route.params.dayId as string) || 1);
        });

        const fetchCalls = async () => {
            try {
                const res: callInfo[] = await api.getCalls(dayId.value);
                callsData.value = res;
            } catch (error) {
                console.error(error)
            }
        }

        const updateDayId = (newDayId: number) => {
            dayId.value = newDayId;
        }

        watch(() => parseInt(route.params.dayId as string), (newDayId) => {
            updateDayId(newDayId);
            fetchCalls()
        })

        return {
            calls: callsData,
        };
    },
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