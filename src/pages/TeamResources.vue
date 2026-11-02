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
        Logo font is
        <strong>
            <em>
                Arial Bold Italic
            </em>
        </strong>.
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
        Use unicode <code>U+00B2</code> (<code>&amp;#xB2;</code> or
        <code>&amp;sup2;</code>) rather than
        <code>&lt;sup&gt;2&lt;/sup&gt;</code> because
    </p>

    <pre>
        &lt;span class="logo"&gt;
            &lt;span&gt;
                M&amp;#xB2;VP
            &lt;/span&gt;
        &lt;/span&gt;
    </pre>

    <div class="copy-scope">

        <div>
            renders as
            <span class="m2vp-logo copy-anchor" @mouseenter="showCopyPrompt" @mouseleave="hideCopyPrompts"
                @click="copyText">
                <span>
                    M&#xB2;VP
                </span>
            </span>
            rather than
            <span class="m2vp-logo">
                <span>
                    M<sup>2</sup>VP
                </span>
            </span>
            when using fonts like Arial.
        </div>

        <div class="copy-prompt">
            Click to copy
        </div>

    </div>

    <div class="copy-scope">

        <div>
            Similarly, use <code>U+2022</code> (<code>&amp;#x2022;</code> or <code>&amp;bull;</code>)
            rather than <code>*</code> or the like in
            <span class="m2vp-logo copy-anchor" @mouseenter="showCopyPrompt" @mouseleave="hideCopyPrompts"
                @click="copyText">
                <span>
                    Monona&#x2022;McFarland Voters for Progress
                </span>
            </span>
        </div>

        <div class="copy-prompt">
            Click to copy
        </div>

    </div>

    <dialog closedby="any" ref="copied">
        Copied '{{ copiedText }}' to clipboard
    </dialog>

</template>

<style scoped>
.copy-scope {
    anchor-scope: --copy-anchor;
    margin: 1rlh 0;
}

.copy-anchor {
    anchor-name: --copy-anchor;
    cursor: copy;
}

.copy-prompt {
    position-anchor: --copy-anchor;
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

    hideCopyPrompts()
    copiedText.value = event.target.innerText
    navigator.clipboard.writeText(copiedText.value)
    copied.value.show()
}

function findCopyScope(target) {

    if (target === null) {

        throw 'no copy-scope found'
    }

    if (target.classList.contains('copy-scope')) {

        return target
    }

    return findCopyScope(target.parentElement)
}

function hideCopyPrompts() {

    const prompts = document.getElementsByClassName('copy-prompt')

    for (let index = 0; index < prompts.length; ++index) {

        prompts.item(index).style.setProperty('display', 'none')
    }
}


function showCopyPrompt(event) {

    copied.value.close()

    const scope = findCopyScope(event.target)
    const prompt = scope.querySelector('.copy-prompt')

    prompt.style.setProperty('display', 'inline-block')
}
</script>