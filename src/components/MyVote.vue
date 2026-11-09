<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <div class="voter-resource">
        <img src="/myvotewi.webp" alt="My Vote Wisconsin">
        <div class="voter-resource-description">
            <a :href="myVoteUrl" target="_blank">{{ myVoteUrl }}</a>
            &mdash; Wisconsin government site for voter registration
            information, elections schedule, sample ballots, polling
            place look-up etc.
        </div>
        <QrCode v-model="myVoteUrl" size="large" />
    </div>
</template>

<script setup>
import QrCode from './QrCode.vue'
import { ref } from 'vue'

const myVoteUrl = ref('https://myvote.wi.gov')
</script>