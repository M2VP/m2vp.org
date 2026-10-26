<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <div class="container">
        <QrCode v-model="vcard" size="large" />
        <div class="links">
            <a href="mailto:info@m2vp.org">info@m2vp.org</a>
            <a href="https://m2vp.org" target="_blank">https://m2vp.org</a>
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
KIND:organization
ORG:M2VP
EMAIL;TYPE=work:info@m2vp.org
URL:https://m2vp.org
END:VCARD`)
</script>