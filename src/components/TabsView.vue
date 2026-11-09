<!-- Copyright (c) 2026 Kirk Rader -->

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