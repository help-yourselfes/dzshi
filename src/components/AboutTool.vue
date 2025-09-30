<template>
    <p class="about-tool">
        <span class="text">
            <slot />
        </span>
        <span class="name">
            <slot name="icon" class="icon" />
        </span>
    </p>
</template>

<style scoped>
p,
.name {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-content: center;
}

.name {
    gap: 0.25rem;
    font-weight: 700;
}

.icon {
    height: 1.5rem;
}
</style>