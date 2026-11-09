<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <DetailsView v-if="smallscreen" name="resources" :components="resources" v-model="selectedTab" />
    <TabsView v-else :tabs="resources" v-model="selectedTab" />
</template>

<style module>
.resource {
    display: flex;
    flex-flow: column nowrap;
    align-items: start;
    justify-content: start;
}

.resource>* {
    margin-top: 1rlh;
    margin-left: 0;
}

@media (width >=1200px) {

    .description {
        max-width: 30rem;
    }

    .resource {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: start;
    }

    .resource>* {
        display: inline-block;
    }

    .resource>* {
        margin-top: 0;
    }

    .resource>*:not(:first-child) {
        margin-left: 1rem;
    }
}
</style>

<script setup>
import DetailsView from './DetailsView.vue'
import HelpLine from '../components/HelpLine.vue'
import MyVote from '../components/MyVote.vue'
import TabsView from './TabsView.vue'
import { inject, onMounted, ref, shallowRef, useCssModule } from 'vue'

const resourcesStyles = useCssModule()
const smallscreen = inject('smallscreen')
const selectedTab = ref('')

const resources = shallowRef([
    {
        component: MyVote,
        label: 'MyVote Wisconsin',
        value: 'myvote',
        styles: resourcesStyles,
    },
    {
        component: HelpLine,
        label: 'LWVWI Voter Help Line',
        value: 'helpline',
        styles: resourcesStyles,
    },
])

onMounted(() => selectedTab.value = resources.value[0].value)
</script>