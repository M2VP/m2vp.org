<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <div class="container">
        <a :href="href" target="_blank">
            <QrCode v-model="href" :size="size" />
            <span>
                {{ label ?? href }}
            </span>
        </a>
    </div>
</template>

<style scoped>
a {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
}

a>* {
    white-space: nowrap;
}

.container {
    display: inline-block;
}
</style>

<script setup>
import QrCode from './QrCode.vue'

const href = defineModel()

const { size, label } = defineProps({

    size: {
        type: String,
        default: 'medium',
    },

    label: {
        type: String,
    },
})
</script>