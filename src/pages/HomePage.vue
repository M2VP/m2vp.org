<!-- Copyright (c) 2026 Kirk Rader -->

<template>

    <p class="large logoColor">
        Monona•McFarland Voters for Progress
    </p>

    <p class="nowrap">
        &hellip;of the people, <wbr> by the poeple, <wbr>
        <span class="logoColor">for the people</span>
    </p>

    <hr>

    <h2>Voter Resources</h2>

    <VoterResources :components="components" />

</template>

<style scoped>
.large {
    font-size: x-large;
}

.logoColor {
    color: var(--logo-color);
}

.nowrap {
    white-space: nowrap;
}
</style>

<script setup>
import HelpLine from '../components/HelpLine.vue'
import MyVote from '../components/MyVote.vue'
import VoterResources from '../components/VoterResources.vue'
import { shallowRef } from 'vue'

const components = shallowRef([
    {
        component: MyVote,
        label: 'MyVote Wisconsin',
        value: 'myvote',
    },
    {
        component: HelpLine,
        label: 'LWVWI Voter Help Line',
        value: 'helpline',
    },
])
</script>