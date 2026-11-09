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

    <VoterResources />

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
import VoterResources from '../components/VoterResources.vue'
</script>