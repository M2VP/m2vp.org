<!-- Copyright (c) 2026 Kirk Rader -->

<template>

    <p v-if="mobile" class="large logo-color">
        Monona•McFarland Voters for Progress
    </p>

    <p>
        &hellip;of the people, by the people,
        <span class="logo-color">
            for the people
        </span>
    </p>

    <template v-for="route of router.getRoutes()" :key="route.path">
        <p v-if="showRoute(route)">
            <RouterLink :to="route.path">
                {{ route.meta?.title ?? route.name ?? route.path }}
            </RouterLink>
        </p>
    </template>

    <hr>

    <select v-model="href">
        <option v-for="resource of resources" :key="resource">
            {{ resource }}
        </option>
    </select>
    <a :href="href" target="_blank">
        <QrCode v-model="href" size="large" />
    </a>

    <p>
        Call or text the League of Women Voters' voter help line
        <a href="tel:+1-608-285-2141">
            608-285-2141
        </a>
        (including information on rides to the polls on election day)
    </p>

    <hr>

    <div class="campaigns">

        <a href="https://www.crowleyforwi.com/" target="_blank">
            <img src="/crowley-logo.png" alt="Crowley for Wisconsin">
        </a>

        <a href="https://my.lwv.org/wisconsin/constitutional-corner" target="_blank">
            <img src="/amendments2026.png" alt="no on all three amendments">
        </a>

    </div>

</template>

<style scoped>
.campaigns {
    display: flex;
    flex-flow: row wrap;
}

.campaigns>* {
    margin: 1rex 1rem;
}

.large {
    font-size: x-large;
}

.logo-color {
    color: var(--logo-color);
}

select {
    margin: 2rex 0;
}
</style>

<script setup>
import QrCode from '../components/QrCode.vue'
import { useRouter } from 'vue-router'
import { inject, ref } from 'vue'

const resources = [
    'https://myvote.wi.gov',
    'https://vote.wisdems.org/',
]

const href = ref(resources[0])
const mobile = inject('mobile')
const router = useRouter()

function showRoute(route) {

    if (route.meta?.hide) {

        return false
    }

    if (route.name === 'home') {

        return false
    }

    return true
}
</script>