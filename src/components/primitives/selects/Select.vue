<template>
    <div @mouseenter="mouseenter" @mouseleave="mouseleave" @click="toggle" class="select"
        :class="{ 'hint': isHint && !isOpen, 'open': isOpen }">
        <span class="selected">
            <span class="longest-choice">
                {{ longestChoice }}
            </span>
            <span class="current-choice">
                {{ currentChoice }}
            </span>
        </span>
        <div v-if="isOpen" class="choices">
            <span v-for="(choice, key) in choices" :key="choice" @click="updateChoice(key)"
                :class="choice === currentChoice ? 'current-text' : 'choice-text'" class="text">
                {{ choice }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';

const props = defineProps<{
    choices: string[],
    defaultChoice?: number,
}>()

const currentChoiceId = ref(props.defaultChoice || 0);
const currentChoice = computed(() => props.choices[currentChoiceId.value])

const longestChoice = computed(() => {
    let choice = "";
    props.choices.forEach(c => {
        if (c.length > choice.length) choice = c
    })

    return choice;
})

const isHint = ref(false)
const isOpen = ref(false)

const mouseenter = () => {
    clearTimeout(closeTimer)
    isHint.value = true;
}
const mouseleave = () => {
    closeTimer = setTimeout(close, 250)
    isHint.value = false;
}

const toggle = () => {
    isOpen.value = !isOpen.value;
}

const close = () => {
    isOpen.value = false;
    console.log('close')
}

const updateChoice = (newChoiceID: number) => {
    closeTimer = setTimeout(close, 0)
    currentChoiceId.value = newChoiceID;
}

let closeTimer = 0;
onUnmounted(() => clearTimeout(closeTimer))

</script>

<style scoped>
.select {
    position: relative;
    height: max-content;
    background: var(--input);
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
}

.select:not(.open) {

    cursor: pointer;
}

.select::before,
.select::after {
    box-sizing: content-box;
    padding: 1rem;
    top: -1rem;
    left: -1rem;
    position: absolute;
    content: ' ';
    display: block;
    height: 100%;
    width: 100%;
}

.select::after {
    z-index: -1;
    background: var(--input);
    padding: 0;
    top: 0;
    left: 0;
    transition: all 200ms ease;
    border-radius: 0.5rem;
    border-top: 0 solid var(--input-light);
    border-bottom: 0 solid var(--input-light);
}

.select.hint::after {
    padding: 0.5rem 0;
    top: -0.5rem;
    border-width: 0.0625rem;
}

.selected {
    position: relative;
}

.longest-choice {
    opacity: 0;
}

.current-choice {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
}

.choices {
    position: absolute;
    top: 100%;
    left: -1rem;
    right: -1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    background-color: var(--input);
    border-radius: 1rem;
    padding: 1rem;
    border: 0.125rem solid var(--input-light);

    text-align: center;
}


.current-text {
    opacity: 1;
}

.choice-text {
    opacity: 0.5;
}

.choice-text:hover {
    opacity: 1;
}

.text:active {
    color: var(--accent)
}
</style>