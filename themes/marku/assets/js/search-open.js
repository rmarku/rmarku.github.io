// Light half of search, always in the entry bundle: opens the dialog, handles
// keyboard navigation, and pulls in the Fuse chunk on first use.

export function init(chunkUrl) {
  const dialog = document.querySelector('[data-search-dialog]')
  if (!dialog) return

  const input = dialog.querySelector('[data-search-input]')
  const results = dialog.querySelector('[data-search-results]')
  let attaching = null

  const open = () => {
    if (!dialog.open) dialog.showModal()
    input.focus()
    attaching ??= import(/* @vite-ignore */ chunkUrl).then((m) => m.attach(dialog))
  }

  document.querySelectorAll('[data-search-open]').forEach((el) => {
    el.addEventListener('click', open)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== '/' || event.metaKey || event.ctrlKey) return
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)) return
    if (document.activeElement?.isContentEditable) return
    event.preventDefault()
    open()
  })

  // Roving focus between the field and the result links.
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    const links = [...results.querySelectorAll('a')]
    if (!links.length) return
    event.preventDefault()
    const at = links.indexOf(document.activeElement)
    const next = event.key === 'ArrowDown' ? at + 1 : at - 1
    ;(links[(next + links.length) % links.length] ?? links[0]).focus()
  })
}
