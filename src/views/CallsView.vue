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
import type { callData } from '@/data/types';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    components: {
        Call, DaySelect
    },
    setup() {
        const route = useRoute();
        const callsData = ref<callData[]>();
        const dayId = ref<number>(parseInt(route.params.dayId as string) || 1);

        onMounted(async () => {
            try {
                fetchCalls()
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        });

        const fetchCalls = async () => {
            try {
                const res: callData[] = await api.getCalls(dayId.value);
                console.log(res)
                callsData.value = res;
            } catch (error) {
                console.error(error)
            }
        }

        watch(() => parseInt(route.params.dayId as string), (newDayId) => {
            dayId.value = newDayId;
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