<!-- Copyright (c) 2026 Kirk Rader -->

<!--
A simple Vue component for displaying content within a set of tabs, only one of
which is visible at a time. See https://vuejs.org for more information on how
such SFC's (Single File Components) work.

The `<TabsView>` component requires a `tabs` property, whose value is an array
of objects specifying each tab's label and model value. It also requires a
`v-model` containing the value for the currently selected tab. Its default slot
is a collection of elements, e.g. <div> or <span>. Each element in the default
slot corresponds to one tabbed "page." Each such element must have a `tab-value`
property whose value matches one of the members of the <TabView> element's
`tabs` array. Only one of the elements in the default slot will be displayed at
any given time, as determined by the current value of the <TabView> model.
Clicking on a tab will change the model's value, thus changing which tabbed
"page" is visible.

Example:

    <template>

        <TabsView :tabs="tabs" v-model="selectedTab">

            <div tab-value="one">Here is tab one's content</div>

            <div tab-value="two">Here is tab two's content</div>

            <div tab-value="three">Here is tab three's content</div>

        </TabsView>

    </templae>

    <script setup>

    import TabsView from '@/components/TabsView.vue'

    const tabs = [

        {
            label: 'Tab 1',
            value: 'one',
        },

        {
            label: 'Tab 2',
            value: 'two',
        },

        {
            label: 'Tab 3',
            value: 'three',
        },
    ]

    const selectedTab = ref(tabs[0].value)

    </script>

The final rendering of the `<TabView>` element depends on the global CSS
stylesheet, including values for the `--highlight-color` and
`--primary-accent-color` variables.
-->

<template>
    <div>
        <div :class="tabsStyles.bar" ref="tabsBar">
            <div v-for="tab of tabs" :key="tab.value" :class="tabsStyles.label" @click="selectedTab = tab.value">
                {{ tab.label }}
            </div>
        </div>
        <div :class="tabsStyles.window" ref="tabWindow">
            <slot></slot>
        </div>
    </div>
</template>

<style module>
.selectedTab {
    color: var(--primary-accent-color);
    background-color: var(--highlight-color);
}

.bar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: start;
}

.label {
    display: inline-block;
    cursor: pointer;
    padding: 0.5rem;
}

.label:not(:first-child) {
    border-left: solid 3px var(--highlight-color);
}

.window {
    background-color: var(--highlight-color);
    padding: 0.5rem;
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