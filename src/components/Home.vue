<template>
    <div class="container-fluid">
        <h1 class="oleo-icon" v-bind:class="{ iconHoverClass:isIcon }" @mouseover="isIcon = true" @mouseleave="isIcon = false">weCare</h1>
        <p class="p-class">Share Your Feelings, Empower Your Journey Every Day</p>
        <img src="/src/assets/undraw_love_it_heart_dxlp.svg" width="100" height="200" style="display: block; margin: 0 auto;">
    </div>
</template>

<script setup>
    import {onMounted, ref} from "vue"
    const isIcon = ref(false)
</script>

<style>
.oleo-icon {
    text-align: center;
    font-family: "Oleo Script", system-ui;
    font-weight: 700;
    font-style: normal;
    color: #213547;
    font-size: 10rem;
    transition: color 0.3s ease;
}

.p-class {
    text-align: center;
    font-size: 1.5rem;
}

.iconHoverClass {
    color: #e6df88;
}

@media (max-width: 768px) {
    .oleo-icon {
        font-size: 6rem;
    }
}

</style>