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
        <transition>
            <div v-show="isOpen" class="choices-wrapper">
                <div  class="choices">
                    <span v-for="(choice, key) in choices" :key="choice" @click="updateChoice(key)"
                        :class="choice === currentChoice ? 'current-text' : 'choice-text'" class="text">
                        {{ choice }}
                    </span>
                </div>
                <div class="choices-overlay" ></div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';

const props = defineProps<{
    choices: string[],
    defaultChoice?: number,
    modelValue?: string
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
}

const emit = defineEmits(['update', 'update:modelValue']);

const updateChoice = (newChoiceID: number) => {
    closeTimer = setTimeout(close, 0)
    if (currentChoiceId.value === newChoiceID) return;
    currentChoiceId.value = newChoiceID;
    if (props.modelValue) emit("update:modelValue", props.choices[newChoiceID])
    else emit("update", newChoiceID)
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
    min-width: 2.5rem;
    z-index: 1;
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
    width: unset;
    height: unset;
    z-index: -1;
    background: var(--input);
    padding: 0;
    top: 0.1rem;
    bottom: 0.1rem;
    left: 1rem;
    right: 1rem;
    transition: all 200ms ease;
    border-radius: 0;
    border: 0.125rem solid color-mix(in srgb, var(--input-light), transparent 100%);
    box-sizing: border-box;
    border-left: none;
    border-right: none;
}

.select.hint::after {
    border-radius: 0.5rem;
    top: -0.25rem;
    bottom: -0.25rem;
    left: 0;
    right: 0;
    border-color: var(--input-light);
}

.selected {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
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

.choices-wrapper {
    position: absolute;;
left: -1rem;
right: -1rem;
    top: 100%;
    /* width: max-content; */
    height: max-content;
    overflow: hidden;
    border: 0.125rem solid var(--input-light);
    border-radius: 1rem;
}

.choices {
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    background-color: var(--input);
    border-radius: 1rem;
    padding: 1rem;
    max-height: 30vh;
    overflow-y: scroll;
    text-align: center;
}

.choices-overlay {
    display: block;
    position: absolute;
    top: 0;
    left: -100%;
    right: -100%;
    height: 100%;
    border-radius: 1rem;
    /* background-color: var(--accent); */
    box-shadow: 0 0 2rem 1rem inset var(--input);
    z-index: 99;
    pointer-events: none;
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

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: scale(0.2, 0);
}

.v-enter-active,
.v-leave-active {
    
    transform-origin: center 0;
    transition: all 300ms 
    cubic-bezier(0.42,0.00,0.58,1.00)
    ;
}
</style>