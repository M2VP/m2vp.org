<!-- Copyright (c) 2026 Kirk Rader -->

<!--
Display an array of components as set of tabbed pages.

Example:

    <template>
        <TabsView :tabs="components" v-model="selectedTab" />
    </template>

    <style module>
    .tab-one {
        color: magenta;
    }

    .tab-two {
        color: cyan;
    }

    .tab-three {
        color: yellow;
    }
    </style>

    <script setup>
    import TabOne from './TabOne.vue'
    import TabTwo from './TabTwo.vue'
    import TabThree from './TabThree.vue'
    import TabsView from './TabsView.vue'
    import { ref, shallowRef, useCssModule } from 'vue'

    const styles = useCssModule()

    const components = shallowRef([
        {
            label: 'Tab 1',
            value: 'tab1',
            component: TabOne,
            styles: styles,
        },
        {
            label: 'Tab 2',
            value: 'tab2',
            component: TabTwo,
            styles: styles,
        },
        {
            label: 'Tab 3',
            value: 'tab3',
            component: TabThree,
            styles: styles,
        },
    ])

    const selectedTab = ref(components.value[0].value)
    </script>

where TabOne.vue is:

    <template>
        <div>
            <p :class="componentStyles['tab-one']">
                This is the first tab.
            </p>
        </div>
    </template>

    <script setup>
    const { componentStyles } = defineProps(['component-styles'])
    </script>

and TabTwo.vue and TabThree.vue are identical to TabOne.vue, mutatis mutandis.

Note in particular the use of shallowRef when declaring the components array to
suppress a warning from Vue.
-->

<template>
    <div :class="tabsStyles.view">
        <div :class="tabsStyles.bar" ref="tabsBar">
            <div v-for="tab of tabs" :key="tab.value" :class="tabsStyles.label" @click="selectedTab = tab.value">
                {{ tab.label }}
            </div>
        </div>
        <div :class="tabsStyles.window" ref="tabWindow">
            <template v-for="tab of tabs" :key="tab.value">
                <component :is="tab.component" :tab-value="tab.value" :component-styles="tab.styles" />
            </template>
        </div>
    </div>
</template>

<style module>
.bar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: start;
}

.label {
    display: inline-block;
    cursor: pointer;
    padding: 1rem;
    font-weight: bold;
    border-top: thick solid var(--highlight-color);
    border-left: thick solid var(--highlight-color);
    border-right: thick solid var(--highlight-color);
}

.selectedTab {
    color: var(--logo-color);
    background-color: var(--highlight-color);
}

.view {
    display: inline-block;
}

.window {
    background-color: var(--highlight-color);
    padding: 1rem;
}
</style>

<script setup>
import { onMounted, useCssModule, useTemplateRef, watch } from 'vue'

const selectedTab = defineModel()

const { tabs } = defineProps({

    tabs: {
        type: Array,
        required: true,
    },
})

const tabsBar = useTemplateRef('tabsBar')
const tabsStyles = useCssModule()
const tabWindow = useTemplateRef('tabWindow')

function updateSelectedTab() {

    for (let index = 0; index < tabs.length; ++index) {

        const tabLabel = tabsBar.value.children.item(index)
        const tabContent = tabWindow.value.children.item(index)

        if (tabs[index].value === selectedTab.value) {

            tabLabel.classList.add(tabsStyles.selectedTab)

        } else {

            tabLabel.classList.remove(tabsStyles.selectedTab)
        }

        if (tabContent.getAttribute('tab-value') === selectedTab.value) {

            tabContent.style.display = 'initial'

        } else {

            tabContent.style.display = 'none'
        }
    }
}

onMounted(updateSelectedTab)
watch(selectedTab, updateSelectedTab)
</script>