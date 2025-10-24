<template>
    <span class="spinner">

    </span>
</template>


<style scoped>
.spinner {
    aspect-ratio: 1;
    width: 2rem;
    transform-origin: 50% 50%;
    animation: spin 1s forwards infinite linear;
    padding: 0.2rem;
    display: inline-flex;
    justify-content: start;
    align-items: center;
    border-radius: 100%;
    background-color: lightgray;
}

.spinner::before {
    content: '';
    background-color: gray;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    
    100% {
        transform: rotate(360deg);
    }
}
</style>