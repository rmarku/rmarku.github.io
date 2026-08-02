// Heavy half of search: Fuse plus the index. Bundled into entry-search.js and
// pulled in only once someone opens the dialog.

import Fuse from 'fuse.js'

export async function attach(dialog) {
  const input = dialog.querySelector('[data-search-input]')
  const results = dialog.querySelector('[data-search-results]')
  const empty = dialog.querySelector('[data-search-empty]')

  const response = await fetch(dialog.dataset.searchIndex)
  const fuse = new Fuse(await response.json(), {
    includeScore: true,
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'description', weight: 0.25 },
      { name: 'tags', weight: 0.15 },
      { name: 'content', weight: 0.1 },
    ],
  })

  const escape = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]))

  const render = (matches) => {
    results.innerHTML = matches
      .slice(0, 12)
      .map(({ item }) => `
        <li>
          <a href="${escape(item.permalink)}">
            <span class="search-result-title">${escape(item.title)}</span>
            ${item.description ? `<span class="search-result-desc">${escape(item.description)}</span>` : ''}
          </a>
        </li>`)
      .join('')
    empty.hidden = matches.length > 0
  }

  const run = () => {
    const query = input.value.trim()
    if (!query) {
      results.innerHTML = ''
      empty.hidden = true
      return
    }
    render(fuse.search(query))
  }

  input.addEventListener('input', run)
  run() // whatever was typed while the chunk was still downloading
}
