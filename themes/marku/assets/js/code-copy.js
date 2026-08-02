// One delegated listener for every code block's copy button.
//
// The source is read from the inert <script type="text/plain"> that
// render-codeblock.html emits, not from the DOM: Chroma renders line numbers
// into a table, so scraping the visible text would copy them too.

export function init() {
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('.code-copy')
    if (!button) return

    const raw = document.getElementById(`${button.dataset.copyFor}-raw`)
    if (!raw) return

    try {
      await navigator.clipboard.writeText(raw.textContent)
    } catch {
      return // clipboard blocked (insecure context, denied permission)
    }

    const done = button.querySelector('.code-copy-done')
    if (!done) return
    button.classList.add('is-copied')
    done.hidden = false
    setTimeout(() => {
      button.classList.remove('is-copied')
      done.hidden = true
    }, 1500)
  })
}
