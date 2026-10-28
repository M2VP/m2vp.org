<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <p>
        Scan this QR code to add us to your contacts:
    </p>
    <div class="container">
        <QrCode v-model="vcard" size="large" />
        <div class="links">
            <a href="https://m2vp.org" target="_blank">https://m2vp.org</a>
            <a href="mailto:info@m2vp.org">info@m2vp.org</a>
            <a href="tel:+1-608-285-2337">+1-608-285-2337</a>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}

.links {
    display: flex;
    flex-flow: column wrap;
    align-items: start;
}

.links>* {
    margin: 1rex 1rem;
}
</style>

<script setup>
import QrCode from './QrCode.vue'
import { ref } from 'vue'

const vcard = ref(`BEGIN:VCARD
VERSION:4.0
KIND:org
N;CHARSET=UTF-8:M²VP
ORG;CHARSET=UTF-8:Monona●McFarland Voters for Progress
TEL:+1-608-285-2337
EMAIL:info@m2vp.org
URL:https://m2vp.org
END:VCARD`)
</script>