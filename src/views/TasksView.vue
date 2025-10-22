<template>
  {{ date.year }}.{{ date.month }}.{{ date.day }}
  <div class="calendar-bar">
  </div>

  <div v-if="loading || error">
    <div v-if="loading">
      Загружаю...
    </div>
    <div v-else>
      <div v-if="error.code === 404">
        На этот день пока не записано дз
      </div>
      <div v-else>
        Ошибка:
        {{ error }}
      </div>
    </div>
  </div>

  <div class="tasks-list" v-else>
    <LessonTask :task="testTask" />
  </div>
  <TaskMedia :media="{ type: 'photo', link: '...', preview: { type: 'text', text: 'Hello' } }" />
  <TaskMedia :media="{ type: 'photo', link: '...', preview: { type: 'image', url: '...' } }" />
</template>
<script setup lang="ts">
import LessonTask from '@/components/task/LessonTask.vue';
import TaskMedia from '@/components/task/TaskMedia.vue';
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import type { date, task } from '@/data/types';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const testDate: date = {
  day: 7,
  month: 10,
  year: 2025
}

const testTask: task = {
  lesson: "alg",
  text: "Делаем номера",
  media: [
    {
      type: 'photo',
      link: 'zxc.zov/1488',
      preview: {
        type: "text",
        text: "Тестовая пикча"
      }
    }
  ],
  hint: [
    1, 2, 3
  ]
}

const { data: schedule } = useData(async () => {
  return api.getCalls
})

const route = useRoute();
const router = useRouter();

const date = computed<date>(() => {
  const q = route.query;
  const year = Number(q.year) || new Date().getFullYear();
  const month = Math.min(12, Math.max(1, Number(q.month) || new Date().getMonth() + 1));
  const day = Math.min(31, Math.max(1, Number(q.day) || new Date().getDate()));
  return { year, month, day };
});

const { data: tasks, error, loading } = useData(async () =>
  api.getTasks(testDate)
);

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