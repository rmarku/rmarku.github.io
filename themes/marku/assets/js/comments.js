// remark42, loaded only on pages that have a mount point.
//
// The embed script used to be injected on every page from an IIFE in site.js,
// and its config hardcoded theme: 'dark' before JS corrected it -- a visible
// flash on light-mode loads.

import { resolved } from './theme.js'

export function init() {
  const node = document.getElementById('remark42')
  if (!node) return

  const { host, siteId, locale } = node.dataset

  window.remark_config = {
    host,
    site_id: siteId,
    locale,
    theme: resolved(),
    components: ['embed'],
    simple_view: false,
    no_footer: true,
    url: window.location.origin + window.location.pathname,
  }

  const script = document.createElement('script')
  script.src = `${host}/web/embed.js`
  script.defer = true
  document.head.appendChild(script)

  window.addEventListener('themechange', (event) => {
    window.REMARK42?.changeTheme(event.detail.resolved)
  })
}
