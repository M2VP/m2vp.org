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

    <TabsView :tabs="tabs" v-model="selectedTab">
        <div tab-value="myvote">
            <div class="resource">
                <img src="/myvotewi.webp" alt="My Vote Wisconsin">
                <div class="description">
                    <a :href="myVoteUrl" target="_blank">{{ myVoteUrl }}</a>
                    &mdash; Wisconsin government site for voter registration
                    information, elections schedule, sample ballots, polling
                    place look-up etc.
                </div>
                <QrCode v-model="myVoteUrl" size="large" />
            </div>
        </div>
        <div tab-value="helpline">
            <div class="resource">
                <div class="description">
                    Call or text the
                    <a href="https://my.lwv.org/wisconsin" target="_blank">
                        League of Women Voters of Wisconson
                    </a>
                    voter help line &mdash;
                    <a :href="helplineUrl">
                        {{ helplineUrl.substring(4) }}
                    </a>
                    &mdash; for assistance, including information on free rides
                    to the polls on election day
                </div>
                <QrCode v-model="helplineUrl" size="large" />
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

.nowrap {
    white-space: nowrap;
}

.resource {
    display: flex;
    flex-flow: column nowrap;
    align-items: start;
    justify-content: start;
}

.resource>*:not(:first-child) {
    margin-top: 1rlh;
    margin-left: 0;
}

@media (width >=1200px) {

    .resource {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: start;
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
        label: 'LWVWI Voter Help Line',
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