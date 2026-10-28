// Copyright (c) 2026 Kirk Rader

import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: '/',
        name: 'home',
        component: () => import('./pages/HomePage.vue'),
        meta: {
            title: 'Home',
        },
    },

    {
        path: '/about',
        name: 'about',
        component: () => import('./pages/AboutUs.vue'),
        meta: {
            title: 'About Us',
        },
    },

    {
        path: '/activism',
        name: 'activism',
        component: () => import('./pages/GetInvolved.vue'),
        meta: {
            title: 'Get Involved',
        },
    },

    {
        path: '/team',
        name: 'team',
        component: () => import('./pages/TeamResources.vue'),
        meta: {
            title: 'Team Resources',
        },
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'catchall',
        component: () => import('./pages/CatchAll.vue'),
        meta: {
            title: '404',
            hide: true,
        },
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})