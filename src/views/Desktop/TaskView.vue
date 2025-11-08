<template>
  <Calendar :date />
  <WaitASecond v-if="tasks.loading" class="loading"/>
  <main class="content" v-else-if="list">
    <Container v-if="list.length === 0">
      <NoDataSticker />
      Тут пока пусто
    </Container>
    <Container v-else>
      <Task v-for="task in list" :task />
    </Container>
  </main>
</template>

<script setup lang="ts">
import Calendar from '@/components/Desktop/TaskView/Calendar/Calendar.vue';
import Task from '@/components/Desktop/TaskView/Task/Task.vue';
import Container from '@/components/primitives/Container.vue';
import WaitASecond from '@/components/primitives/Spinner/WaitASecond.vue';
import NoDataSticker from '@/components/stickers/NoDataSticker.vue';
import type { UseDataResult } from '@/data/functions/useData';
import type { date, task } from '@/data/types';


const props = defineProps<{
  date: date,
  tasks: UseDataResult<task[]>,
  untaskedLessons: UseDataResult<string[]>
}>()

const list = props.tasks.data;
</script>

<style>
.view.tasks {
  gap: 2rem;
}
</style>

<style scoped>
.loading {
  padding: 2rem;
}
main {
  box-sizing: content-box;
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 1.5rem;
  border: 0.125rem solid var(--top);
}
</style>