<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <svg :width="size" :height="size" :view-box="`0 0 ${size} ${size}`">
        <path :d="d" />
    </svg>
</template>

<script setup>
const { d, size } = defineProps({

    d: {
        type: String,
        required: true,
    },

    size: {
        type: String,
        default: "24",
    },
})
</script>