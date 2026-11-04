Copyright © 2026 Kirk Rader

<div class="logo">
    <div>
        M²VP
    </div>
    <hr>
    <div>
        Monona•McFarland Voters for Progress
    </div>
</div>

---

# m2vp.org

[Vue] source files for <https://m2vp.org>

## Attribution / Dependencies

See [./package-lock.json] for the complete set of transitive dependencies.

- [Apache]
- [NodeJS]
- [@mdi/js]
- [qr]
- [Vue]
- [Vue Router]

Note that the only dependency on [Apache] is the existence of the
[./public/.htaccess](./public/.htaccess) file. If we ever change hosting
providers to one that uses a different software stack, we will have to port such
configuration to the new environment.

The only requirement is that the hosting environment serves plain HTML / CSS
files, with the ability to route 404 errors back to the default `/index.html`
page for use by [Vue Router].

## Installation

Assuming that [NodeJS] is properly installed and configured:

```bash
git clone https://github.com/M2VP/m2vp.org.git
cd m2vp.org
npm i
```

## Dev / Test

```bash
npm run dev
```

...then open the URL displayed in the console in a web browser.

## Build

```bash
npm run build
```

...then copy the contents of `./dist/` to the <https://m2vp.org> web server's
web root directory.

[Apache]: https://httpd.apache.org/
[@mdi/js]: https://www.npmjs.com/package/@mdi/js
[NodeJS]: https://nodejs.org/
[./package-lock.json]: ./package-lock.json
[qr]: https://www.npmjs.com/package/qr
[Vue]: https://vuejs.org
[Vue Router]: https://router.vuejs.org/

<style>
.logo {
    font-family: Arial;
    font-weight: bolder;
    font-style: italic;
    color: #00a0ff;
    white-space: nowrap;
}

.logo>*:first-child {
    font-size: x-large;
}

.logo hr {
    border-style: solid;
    border-width: 1px;
    border-color: #00a0ff;
}
</style>