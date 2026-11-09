<!-- Copyright (c) 2026 Kirk Rader -->

<!--
Display a collection of components wrapped in details elements.

Example:

    <template>
        <DetailsView :components="components" name="test" v-model="selectedComponent" />
    </template>

    <style module>
    .component-one {
        color: magenta;
    }

    .component-two {
        color: cyan;
    }

    .component-three {
        color: yellow;
    }
    </style>

    <script setup>
    import BodyOne from './BodyOne.vue'
    import BodyTwo from './BodyTwo.vue'
    import BodyThree from './BodyThree.vue'
    import DetailsView from './DetailsView.vue';
    import { ref, shallowRef, useCssModule } from 'vue'

    const styles = useCssModule()

    const components = shallowRef([
        {
            label: 'Component 1',
            value: 'component1',
            component: BodyOne,
            styles: styles,
        },
        {
            label: 'Component 2',
            value: 'component2',
            component: BodyTwo,
            styles: styles,
        },
        {
            label: 'Component 3',
            value: 'component3',
            component: BodyThree,
            styles: styles,
        },
    ])

    const selectedComponent = ref(components.value[0].value)
    </script>

where BodyOne.vue is:

    <template>
        <div>
            <p :class="componentStyles['component-one']">
                Here is the first component.
            </p>
        </div>
    </template>

    <script setup>
    const { componentStyles } = defineProps(['component-styles'])
    </script>

with BodyTwo.vue and BodyThree.vue identical to BodyOne.vue, mutatis mutandis.

Note the use of shallowRef in the declaration of components to suppress a
warning from Vue.
-->

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