<!-- Copyright (c) 2026 Kirk Rader -->

<template>
    <h1>About Us</h1>

    <ContactInfo />

    <div class="container">

        <p>
            <span class="logo-color">
                Monona•McFarland Voters for Progress (M²VP)
            </span>
            is a group of volunteers from the Monona and McFarland areas
            committed to activism in support of our neighbors, communities,
            state, country and planet.
        </p>

        <p>
            We believe that a just, diverse, inclusive society benefits
            everyone.
        </p>

        <p>
            We believe that the general welfare of all human beings is of higher
            priority than the narrow interests of the wealthiest few.
        </p>

        <p>
            We believe that liberty for individuals is founded on freedom and
            equality for all -- regardless of gender identity or expression,
            sexual orientation, race, ethnicity, religious affiliation or
            socio-economic class.
        </p>

        <p>
            If you feel similarly and are looking for ways to contribute to a
            more equitable and inclusive society there are many ways to
            <RouterLink :to="{ name: 'activism' }">
                get involved.
            </RouterLink>
        </p>

        <p>
            Contact us at
            <a href="mailto:info@m2vp.org">
                info@m2vp.org
            </a>
            if you would like more information.
        </p>

    </div>

</template>

<style scoped>
.container {
    max-width: 40rem;
}

.logo-color {
    color: var(--logo-color);
}
</style>

<script setup>
import ContactInfo from '../components/ContactInfo.vue'
</script>