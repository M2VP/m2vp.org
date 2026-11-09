<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <div>
        <div :class="componentStyles.resource">
            <img src="/myvotewi.webp" alt="My Vote Wisconsin">
            <div :class="componentStyles.description">
                <a :href="myVoteUrl" target="_blank">{{ myVoteUrl }}</a>
                &mdash; Wisconsin government site for voter registration
                information, elections schedule, sample ballots, polling
                place look-up etc.
            </div>
            <QrCode v-model="myVoteUrl" size="large" />
        </div>
    </div>
</template>

<script setup>
import QrCode from './QrCode.vue'
import { ref } from 'vue'

const myVoteUrl = ref('https://myvote.wi.gov')
const { componentStyles } = defineProps(['component-styles'])
</script>