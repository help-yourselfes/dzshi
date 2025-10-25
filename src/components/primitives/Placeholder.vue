<template>
    <div class="container">
        <div class="shadow">
            
        </div>
    </div>
</template>

<style scoped>
    .container {
        position: relative;
        background-color: gray;
        overflow: hidden;
        border-radius: 0.2rem;
    }

    .shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 2rem;
        transform-origin: 50% 50%;
        height: 100%;
        background: linear-gradient(90deg, transparent, lightgray, transparent);
        animation: moving 1s forwards infinite;
    }

    @keyframes moving {
        0% {
            transform: translateX(-100%);
            left: 0%;
        }
        
        100% {
            transform: translateX(0);
            left: 100%;
        }
    }
</style>