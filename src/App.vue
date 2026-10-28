<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <header>
        <QrCode v-model="href" :size="smallscreen ? 'small' : 'medium'" />
        <LogoPartial />
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
        <LogoFull class="center" />
    </footer>
</template>

<style scoped>
.center {
    margin-top: 0;
}

footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--footer-height-small);
    background-color: var(--highlight-color);
}

header {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: var(--header-height-small);
    background-color: var(--highlight-color);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0 1rem;
}

.link {
    white-space: nowrap;
}

header>*:not(:last-child) {
    margin-right: 1rem;
}

main {
    position: absolute;
    left: 0;
    right: 0;
    top: var(--header-height-small);
    bottom: var(--footer-height-small);
    overflow: auto;
    padding: 1rex 1rem;
}

.right {
    margin-left: auto;
}

@media (width >=1200px) {

    .center {
        margin-top: 0.5rex;
    }

    footer {
        height: var(--footer-height-large);
    }

    header {
        height: var(--header-height-large);
    }

    main {
        top: var(--header-height-large);
        bottom: var(--footer-height-large);
    }
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
const smallscreen = ref(true)
let removeGuard = null
const router = useRouter()

function routeName(route) {

    if (smallscreen.value) {

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

function updateSmallScreen(query) {
    smallscreen.value = query.matches
}

onMounted(() => {

    mediaQuery = window.matchMedia('(width <= 1200px)')
    mediaQuery.addEventListener('change', updateSmallScreen)
    updateSmallScreen(mediaQuery)
    removeGuard = router.afterEach(updateHref)
    updateHref()
})

onUnmounted(() => {

    removeGuard()
    mediaQuery.removeEventListener('change', updateSmallScreen)
})

provide('smallscreen', smallscreen)
provide('routeName', routeName)
</script>