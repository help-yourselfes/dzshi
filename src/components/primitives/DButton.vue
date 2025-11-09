<template>
    <div class="button">
        <slot class="content" />
    </div>
</template>

<style scoped>
.button {
    display: flex;
    flex-direction: row;
    padding: 0.5rem 1rem;
    background-color: var(--accent);
    cursor: pointer;
    border-radius: 0.5rem;
}

.content {
    text-decoration: none;
}
</style>