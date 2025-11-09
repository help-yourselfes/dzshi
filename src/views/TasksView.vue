<template>
    <div>
      Пока в разработке ... <DButton @click="router.back()"> Назад </DButton>
    </div>
    <div class="innactive">
      <component :is="AsyncComponent" 
      :date
      :tasks
      :untaskedLessons
      />
    </div>
</template>

<script setup lang="ts">
import DButton from '@/components/primitives/DButton.vue';
import { useResponsiveAsyncView } from './useResponsiveAsyncView';

const { AsyncComponent } = useResponsiveAsyncView('tasks');


import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import type { date } from '@/data/types';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const testDate: date = {
  day: 28,
  month: 10,
  year: 2025
}

const tasks = useData(async () =>
  api.getTasks(testDate)
);

const untaskedLessons = useData(async () => {
  const {loading, error, data} = tasks ;
  if (loading.value || error.value || !data.value) {
    return [];
  }

  const list = await api.getLessonList(api.getDateDayId(testDate));
  const taskedList = data.value.map(task => task.lesson);
  const untaskedList = list.filter(id => !taskedList.includes(id));

  return untaskedList;
});
watch(tasks.data, untaskedLessons.reload)

const route = useRoute();
const router = useRouter();

const date = computed<date>(() => {
  const q = route.query;
  const year = Number(q.year) || new Date().getFullYear();
  const month = Math.min(12, Math.max(1, Number(q.month) || new Date().getMonth() + 1));
  const day = Math.min(31, Math.max(1, Number(q.day) || new Date().getDate()));
  return { year, month, day };
});

watch(
  date,
  (d) => {
    router.replace({
      path: route.path,
      query: { ...route.query, year: String(d.year), month: String(d.month), day: String(d.day) }
    });
  },
  { immediate: true }
);

</script>

<style scoped>
.innactive {
  opacity: 0.5;
}
</style>