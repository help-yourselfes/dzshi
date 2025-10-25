<template>
  <Container v-if="list.length">
    <span class="text">
      Пока не задано / не заполнено:
    </span>

    <div class="lessons">
      <LessonName v-for="id in list" :key="id" :id :short-name="list.length > 3" />
    </div>
  </Container>
  <Container v-else>
    Все дз заполненно
  </Container>
</template>
<script setup lang="ts">
import Container from '../primitives/Container.vue';
import LessonName from '../primitives/LessonName.vue';

const props = defineProps<{
  list: string[]
}>()
</script>

<style scoped>
.text {
  font-weight: 600;
}

.lessons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  row-gap: 0.2rem;
  padding: 0.75rem;
  background-color: lightgray;
  width: fit-content;
  max-width: 80vw;
  border-radius: 1rem;
}
</style>