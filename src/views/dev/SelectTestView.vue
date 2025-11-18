<template>
    <div class="v">
        Выбранно: {{ uni }} {{ letter }}
        <div class="list">
            <Select :choices @update="(choice) => uni = choices[choice]"> </Select>
            <Select :choices="['a', 'b', 'c', 'd']" v-model="letter"> </Select>
            <Select :choices="numbers" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Select from '@/components/primitives/selects/Select.vue';
import { ref } from 'vue';

const choices = [
    'Алабуга', "МелГУ", "Коменского", "В окно"
]

const uni = ref(choices[0])
const letter = ref("a")

const numbers = ref(['a', 'b', 'c', 'd', 'e', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'])
</script>

<style scoped>
.v {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;

}

.list {
    display: flex;
    flex-direction: row;
    background-color: var(--input);
    justify-content: space-between;
    padding: 0 1rem;
    border-radius: 0.5rem;
}
</style>