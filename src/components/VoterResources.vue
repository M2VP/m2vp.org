<!-- Copyright (c) 2026 Kirk Rader -->

<template>

    <div v-if="smallscreen">
        <details v-for="component of components" :key="component.value" name="resources">
            <summary>{{ component.label }}</summary>
            <component :is="component.component" />
        </details>
    </div>

    <TabsView v-else :tabs="components" v-model="selectedTab">
        <div v-for="component of components" :key="component.value" :tab-value="component.value">
            <component :is="component.component" />
        </div>
    </TabsView>

</template>

<script setup>
import TabsView from './TabsView.vue'
import { inject, onMounted, ref } from 'vue'

const smallscreen = inject('smallscreen')
const selectedTab = ref('')

const { components } = defineProps({

    components: {
        type: Array,
        required: true,
    },
})

onMounted(() => selectedTab.value = components[0].value)
</script>