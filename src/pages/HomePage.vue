<!-- Copyright (c) 2026 Kirk Rader -->

<template>

    <p class="large logo-color">
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
                {{ routeName(route) }}
            </RouterLink>
        </p>
    </template>

    <hr>

    <h2>Voter Resources</h2>

    <TabsView :tabs="tabs" v-model="selectedTab">
        <div tab-value="myvote" class="resource">
            <div>
                <a :href="myVoteUrl" target="_blank">
                    <QrCode v-model="myVoteUrl" size="large" />
                    <div>
                        {{ myVoteUrl }}
                    </div>
                </a>
            </div>
            <div class="description">
                Wisconsin government site for voter registration information,
                elections schedule, sample ballots, polling place look-up etc.
            </div>
            <div>
                <img src="/myvotewi.webp" alt="My Vote Wisconsin">
            </div>
        </div>
        <div tab-value="helpline" class="resource">
            <div>
                <a :href="helplineUrl" target="_blank">
                    <QrCode v-model="helplineUrl" size="large" />
                </a>
            </div>
            <div class="description">
                Call or text the League of Women Voters' voter help line
                <a href="tel:+1-608-285-2141">608-285-2141</a>
                for assistance, including information on free rides to the polls
                on election day
            </div>
        </div>
    </TabsView>

</template>

<style scoped>
.large {
    font-size: x-large;
}

.logo-color {
    color: var(--logo-color);
}

.resource {
    display: flex;
    flex-flow: column nowrap;
}

@media (width >=1200px) {

    .description {
        max-width: 25rem;
    }

    .resource {
        display: flex;
        flex-flow: row nowrap;
        align-content: center;
        justify-content: space-around;
    }

    .resource>div {
        display: inline-block;
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