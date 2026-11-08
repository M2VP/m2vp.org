<!-- Copyright (c) 2026 Kirk Rader -->

<template>

    <p class="large logoColor">
        Monona•McFarland Voters for Progress
    </p>

    <p>
        &hellip;of the people, by the people,
        <span class="logoColor">
            for the people
        </span>
    </p>

    <template v-for="route of router.getRoutes()" :key="route.path">
        <p v-if="showRoute(route)">
            <RouterLink :to="route.path">
                {{ routeName(route) }}
            </RouterLink>
        </p>
    </template>

    <hr>

    <h2>Voter Resources</h2>

    <TabsView :tabs="tabs" v-model="selectedTab">
        <div tab-value="myvote" class="resource">
            <QrCode v-model="myVoteUrl" size="large" />
            <div class="description">
                <a :href="myVoteUrl" target="_blank">{{ myVoteUrl }}</a>
                &mdash; Wisconsin government site for voter registration
                information, elections schedule, sample ballots, polling place
                look-up etc.
            </div>
            <img src="/myvotewi.webp" alt="My Vote Wisconsin">
        </div>
        <div tab-value="helpline" class="resource">
            <QrCode v-model="helplineUrl" size="large" />
            <div class="description">
                Call or text the League of Women Voters' voter help line &mdash;
                <a :href="helplineUrl">{{ helplineUrl.substring(4) }}</a>
                &mdash; for assistance, including information on free rides to
                the polls on election day
            </div>
        </div>
    </TabsView>

</template>

<style scoped>
.description {
    width: 25rem;
}

.large {
    font-size: x-large;
}

.logoColor {
    color: var(--logo-color);
}

.resource {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
}

.resource>*:not(:first-child) {
    margin-top: 1rlh;
    margin-left: 0;
}

@media (width >=1200px) {

    .resource {
        display: flex;
        flex-flow: row nowrap;
    }

    .resource>* {
        display: inline-block;
    }

    .resource>*:not(:first-child) {
        margin-top: 0;
        margin-left: 1rem;
    }
}
</style>

<script setup>
import QrCode from '../components/QrCode.vue'
import TabsView from '../components/TabsView.vue'
import { useRouter } from 'vue-router'
import { inject, ref } from 'vue'

const helplineUrl = ref('tel:+1-608-285-2141')
const myVoteUrl = ref('https://myvote.wi.gov')
const routeName = inject('routeName')
const router = useRouter()

const tabs = [
    {
        label: 'MyVote Wisconsin',
        value: 'myvote',
    },
    {
        label: 'LWV Voter Help Line',
        value: 'helpline',
    },
]

const selectedTab = ref(tabs[0].value)

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