# Marku

The theme behind [www.marku.me](https://www.marku.me/) — a bilingual (es/en),
reading-first blog and CV.

Not written to be reused elsewhere, but it is self-contained: layouts, styles,
scripts and translations all live under `themes/marku/`.

## Requirements

- Hugo **extended** ≥ 0.146 (the repo pins 0.164.0 in CI)
- Node ≥ 20 and [pnpm](https://pnpm.io) — only to populate `node_modules`.
  Hugo's embedded esbuild does the bundling; there is no separate build step.

```sh
pnpm install
hugo server --disableFastRender
```

## Layout

```
assets/
  css/        design tokens, cascade layers, component styles
  js/         ES modules, bundled by js.Batch
layouts/
  _markup/    render hooks (image, link, heading, codeblock, blockquote,
              table, passthrough)
  _partials/  head/*, nav, cards, resume/*
  _shortcodes/
i18n/         en.yaml, es.yaml
```

## Notes

- **No third-party runtime origins.** Fonts (Source Serif 4, Inter, JetBrains
  Mono), icons (Lucide) and the Fuse/Mermaid bundles are all served from this
  domain. `config/_default/module.yaml` mounts them out of `node_modules`.
- **Math renders to MathML at build time** via `transform.ToMath` in
  `_markup/render-passthrough.html`. No KaTeX JavaScript or stylesheet ships.
- **Navigation uses native cross-document View Transitions**, not a JS router.
- Colours are OKLCH tokens resolved with `light-dark()`; `[data-theme]` only
  flips `color-scheme`.
