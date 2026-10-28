<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <header>
        <LogoPartial v-if="mobile" />
        <LogoFull v-else />
        <template v-for="(route, index) of router.getRoutes()" :key="route.path">
            <template v-if="!route.meta.hide">
                <RouterLink v-if="route.path !== router.currentRoute.value.path" :to="route.path"
                    :class="index === 0 ? 'right link' : 'link'">
                    {{ routeName(route) }}
                </RouterLink>
                <span v-else :class="index === 0 ? 'right link' : 'link'">
                    {{ routeName(route) }}
                </span>
            </template>
        </template>
        <MdiIcon :d="mdiThemeLightDark" class="clickable" @click.stop.prevent="toggleTheme" />
    </header>
    <main>
        <RouterView />
    </main>
    <footer>
        <RouterLink :to="{ name: 'team' }">
            team
        </RouterLink>
        <QrCode v-model="href" />
    </footer>
</template>

<style scoped>
header,
footer {
    background-color: var(--highlight-color);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0 1rem;
}

header {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: var(--header-height);
}

header>*:not(:last-child) {
    margin-right: 1rem;
}

main {
    position: absolute;
    left: 0;
    right: 0;
    top: var(--header-height);
    bottom: var(--footer-height);
    overflow: auto;
    padding: 1rex 1rem;
}

footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--footer-height);
    justify-content: space-around;
}

.link {
    white-space: nowrap;
}

.right {
    margin-left: auto;
}
</style>

<script setup>
import LogoFull from './components/LogoFull.vue'
import LogoPartial from './components/LogoPartial.vue'
import MdiIcon from './components/MdiIcon.vue'
import QrCode from './components/QrCode.vue'
import { mdiThemeLightDark } from '@mdi/js'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, provide, ref } from 'vue'

const href = ref('')
let mediaQuery = null
const mobile = ref(true)
let removeGuard = null
const router = useRouter()

function routeName(route) {

    if (mobile.value) {

        return route.name ?? route.path
    }

    return route.meta?.title ?? route.name ?? route.path
}

function toggleTheme() {

    const body = document.getElementsByTagName('body').item(0)
    const classes = body.classList

    if (classes.contains('dark-theme')) {

        classes.remove('dark-theme')
        classes.add('light-theme')
        return
    }

    if (classes.contains('light-theme')) {

        classes.remove('light-theme')
        classes.add('dark-theme')
        return
    }

    classes.add('dark-theme')
}

function updateHref() {

    href.value = new URL(router.currentRoute.value.path, window.location.href).href
}

function updateMobile(query) {
    mobile.value = query.matches
}

onMounted(() => {

    mediaQuery = window.matchMedia('(width <= 1200px)')
    mediaQuery.addEventListener('change', updateMobile)
    updateMobile(mediaQuery)
    removeGuard = router.afterEach(updateHref)
    updateHref()
})

onUnmounted(() => {

    removeGuard()
    mediaQuery.removeEventListener('change', updateMobile)
})

provide('mobile', mobile)
provide('routeName', routeName)
</script>