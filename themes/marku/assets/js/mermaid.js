// Mermaid is roughly a megabyte, so it lives in its own chunk that only pages
// carrying a diagram import. head/js.html decides, using the Page.Store flag
// that render-codeblock-mermaid.html sets.
//
// The old copy re-ran on htmx:pushedIntoHistory because hx-boost swapped <body>
// on every navigation. With cross-document view transitions the page really
// does reload, so that workaround is gone.

import mermaid from 'mermaid'

import { resolved } from './theme.js'

function theme() {
  return resolved() === 'dark' ? 'dark' : 'default'
}

export async function render() {
  const nodes = document.querySelectorAll('pre.mermaid:not([data-processed])')
  if (!nodes.length) return
  mermaid.initialize({ startOnLoad: false, theme: theme() })
  await mermaid.run({ nodes })
}

export function init() {
  render()
  // Re-render on theme change: Mermaid bakes colours into the generated SVG.
  window.addEventListener('themechange', () => {
    document.querySelectorAll('pre.mermaid[data-processed]').forEach((node) => {
      node.removeAttribute('data-processed')
      node.innerHTML = node.dataset.source ?? node.textContent
    })
    render()
  })
}
