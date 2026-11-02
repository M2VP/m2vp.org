<!-- Copyright (c) 2026 Kirk Rader -->

<template>

    <h1>
        Style Guide
    </h1>

    <table class="logos">
        <thead>
            <tr>
                <th>
                    &nbsp;
                </th>
                <th>
                    SVG
                </th>
                <th>
                    PNG
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>
                    Full Logo
                </th>
                <td>
                    <img src="/logo-full.svg">
                </td>
                <td>
                    <img src="/logo-full.png">
                </td>
            </tr>
            <tr>
                <th>
                    Partial Logo
                </th>
                <td>
                    <img src="/logo-partial.svg">
                </td>
                <td>
                    <img src="/logo-partial.png">
                </td>
            </tr>
            <tr>
                <th>
                    Email Logo
                </th>
                <td>
                    <img src="/logo-email.svg">
                </td>
                <td>
                    <img src="/logo-email.png">
                </td>
            </tr>
        </tbody>
    </table>

    <h2>
        Style Guide
    </h2>

    <p>
        Logo font is <em><strong>Arial Bold Italic</strong></em>.
    </p>

    <p>
        Logo color is
        <code class="ex1">
                #00a0ff
            </code>
        or
        <code class="ex2">
                rgb(0, 160, 255)
            </code>
    </p>

    <p>
        Use unicode <code>U+00B2</code> (<code>&amp;#x00B2;</code> or
        <code>&amp;sup2;</code>) rather than
        <code>&lt;sup&gt;2&lt;/sup&gt;</code> because
    </p>

    <pre>
&lt;span class="logo"&gt;
    &lt;span&gt;M&amp;#x00B2;VP&lt;/span&gt;
&lt;/span&gt;
</pre>

    <p>
        renders as <span class="ex1 ex3 copy-anchor-1" @mouseenter="showCopyPrompt1" @mouseleave="hideCopyPrompt1"
            @click="copyText">M&#x00B2;VP</span> rather
        than <span class="ex1 ex3">M<sup>2</sup>VP</span> when using fonts like
        Arial.
    </p>

    <div class="copy-prompt-1">
        Click to copy
    </div>

    <p>
        Similarly, use <code>&amp;#x2022;</code> or <code>&amp;bull;</code>
        rather than <code>*</code> or the like in <span class="ex1 ex3 copy-anchor-2" @mouseenter="showCopyPrompt2"
            @mouseleave="hideCopyPrompt2" @click="copyText">Monona&#x2022;McFarland Voters
            for Progress</span>.
    </p>

    <div class="copy-prompt-2">
        Click to copy
    </div>

    <dialog closedby="any" ref="copied">
        Copied '{{ copiedText }}' to clipboard
    </dialog>

</template>

<style scoped>
.copy-anchor-1 {
    anchor-name: --copy-anchor-1;
}

.copy-anchor-2 {
    anchor-name: --copy-anchor-2;
}

.copy-anchor-1,
.copy-anchor-2 {
    cursor: copy;
}

.copy-prompt-1 {
    position-anchor: --copy-anchor-1;
}

.copy-prompt-2 {
    position-anchor: --copy-anchor-2;
}

.copy-prompt-1,
.copy-prompt-2 {
    display: none;
    position: fixed;
    inset-block-start: anchor(end);
    inset-inline-start: anchor(self-start);
    width: max-content;
    color: var(--foreground-color);
    background-color: var(--highlight-color);
}

.ex1 {
    color: #00a0ff;
}

.ex2 {
    color: rgb(0 160 255);
}

.ex3 {
    font-family: Arial;
    font-style: italic;
    font-weight: bold;
    white-space: nowrap;
}

.logos td {
    background-color: var(--highlight-color);
}

td,
th {
    margin: 1rex 1rem;
    padding: 1rex 1rem;
}
</style>

<script setup>
import { ref, useTemplateRef } from 'vue'

const copied = useTemplateRef('copied')
const copiedText = ref('')

function copyText(event) {

    hideCopyPrompt1()
    hideCopyPrompt2()
    copiedText.value = event.target.innerText
    navigator.clipboard.writeText(copiedText.value)
    copied.value.show()
}

function hideCopyPrompt1() {

    const prompt = document.querySelector('.copy-prompt-1')

    prompt.style.setProperty('display', 'none')
}

function hideCopyPrompt2() {

    const prompt = document.querySelector('.copy-prompt-2')

    prompt.style.setProperty('display', 'none')
}

function showCopyPrompt1() {

    copied.value.close()

    const prompt = document.querySelector('.copy-prompt-1')

    prompt.style.setProperty('display', 'inline-block')
}

function showCopyPrompt2() {

    copied.value.close()

    const prompt = document.querySelector('.copy-prompt-2')

    prompt.style.setProperty('display', 'inline-block')
}
</script>