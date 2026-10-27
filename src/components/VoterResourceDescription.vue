<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <span ref="container">
    </span>
</template>

<script setup>
import { onMounted, useTemplateRef, watch } from 'vue'

const container = useTemplateRef('container')
const description = defineModel()

function updateDescription() {

    container.value.innerHTML = description.value
}

onMounted(updateDescription)
watch(description, updateDescription)
</script>