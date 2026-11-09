<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <div class="voter-resource">
        <div class="voter-resource-description">
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
</template>

<script setup>
import QrCode from './QrCode.vue'
import { ref } from 'vue'

const helplineUrl = ref('tel:+1-608-285-2141')
</script>