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

    <h2>Voter Resources</h2>

    <select v-model="selectedResource">
        <option v-for="resource of resources" :key="resource.href" :value="resource">
            {{ resource.label ?? resource.href }}
        </option>
    </select>
    <div class="resource">
        <a :href="selectedResource.href" target="_blank">
            <QrCode v-model="selectedResource.href" size="large" />
        </a>
        <div v-if="selectedResource.description">
            <VoterResourceDescription v-model="selectedResource.description" />
        </div>
    </div>

    <hr>

    <h2>Campaigns</h2>

    <div class="campaigns">

        <a href="https://www.crowleyforwi.com/" target="_blank">
            <img src="/crowley-logo.png" alt="Crowley for Wisconsin">
        </a>

        <a href="https://joshkaul.org/" target="_blank">
            <img src="/kaul-logo.webp" alt="Josh Kaul">
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

.resource {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

.resource>div {
    max-width: 25rem;
    margin: 0 1rem;
}

select {
    margin: 2rex 0;
}
</style>

<script setup>
import QrCode from '../components/QrCode.vue'
import VoterResourceDescription from '../components/VoterResourceDescription.vue'
import { useRouter } from 'vue-router'
import { inject, ref } from 'vue'

const resources = [
    {
        href: 'https://myvote.wi.gov',
        label: 'My Vote',
        description: `Wisconsin government site for voter registration information,
elections schedule, sample ballots, polling place look-up etc.`,
    },
    {
        href: 'tel:+1-608-285-2141',
        label: 'LWV Voter Help Line',
        description: `Call or text the League of Women Voters' voter help line
<a href="tel:+1-608-285-2141">608-285-2141</a> for assistance, including information
on free rides to the polls on election day`,
    },
]

const selectedResource = ref(resources[0])
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