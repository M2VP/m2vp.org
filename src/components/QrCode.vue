<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <div ref="svg" :class="size"></div>
</template>

<style scoped>
.small {
    width: 32px;
    height: 32px;
}

.medium {
    width: 64px;
    height: 64px;
}

.large {
    width: 128px;
    height: 128px;
}

.x-large {
    width: 256px;
    height: 256px;
}
</style>

<script setup>
import { onMounted, useTemplateRef, watch } from 'vue'
import { encodeQR } from 'qr'

const { size } = defineProps({

    size: {
        type: String,
        default: 'medium',
    },
})

const text = defineModel()
const svg = useTemplateRef('svg')

function update() {
    svg.value.innerHTML = encodeQR(text.value, 'svg')
}

onMounted(update)
watch(text, update)
</script>