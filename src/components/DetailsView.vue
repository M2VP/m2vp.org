<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <div ref="details">
        <details v-for="component of components" :key="component.value" :name="name" :component-value="component.value"
            @toggle="onToggle">
            <summary>{{ component.label }}</summary>
            <component :is="component.component" :component-styles="component.styles" />
        </details>
    </div>
</template>

<script setup>
import { onMounted, useTemplateRef, watch } from 'vue'

const { components, name } = defineProps({

    components: {
        type: Array,
        required: true,
    },

    name: {
        type: String,
        required: true,
    }
})

const details = useTemplateRef('details')
const selectedComponent = defineModel()

function onToggle(event) {

    if (event.newState === 'open') {

        selectedComponent.value = event.target.getAttribute('component-value')
    }
}

function updateOpen() {

    for (let component of details.value.children) {

        if (component.getAttribute('component-value') === selectedComponent.value) {

            component.open = true
            break
        }
    }
}

onMounted(updateOpen)
watch(selectedComponent, updateOpen)
</script>