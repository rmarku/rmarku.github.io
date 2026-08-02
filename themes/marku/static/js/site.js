
// Dark mode
function setDark(val) {
  if (val) {
    document.documentElement.setAttribute('data-theme', 'dark')
    window.REMARK42?.changeTheme("dark")
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    window.REMARK42?.changeTheme("light")
    localStorage.setItem('theme', 'light')
  }
}
// Fall back to the OS preference only when nothing has been chosen. Calling
// setDark() unconditionally here meant the stored value was always clobbered a
// line after being read, so the toggle never survived a reload.
const storedTheme = localStorage.getItem('theme')
setDark(storedTheme ? storedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches)

// search

async function searchStart() {
  const response = await fetch("/index.json")
  const index = await response.json()

  const fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    includeScore: true,
    threshold: 0.25,
    tokenize: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      { name: "title", weight: 0.8 },
      { name: "contents", weight: 0.5 },
      { name: "tags", weight: 0.3 },
      { name: "categories", weight: 0.3 }
    ]
  }

  const fuse = new Fuse(index, fuseOptions)

  const searchInput = document.getElementById('searchInput')
  const searchResults = document.getElementById('searchResults')
  searchInput.addEventListener('keyup', () => {
    const search = searchInput.value
    if (search == '') {
      searchResults.innerHTML = ''
      return
    }

    const res = fuse.search(search)
    let html = ''
    for (const result of res) {
      html += `<p><a href="${result.item.permalink}">${result.item.title}</a></p>`
    }
    console.log(search)
    searchResults.innerHTML = html
  })
}

searchStart()

// Comments

!function (component) {
  for (const c of component) {
    const d = document
    const s = d.createElement('script')
    s.src = remark_config.host + '/web/' + c + '.js'
    s.defer = true
    d.head?.appendChild(s)
  }
}(remark_config.components || ["embed"]);

let remark42Instance = null

function addRemakeComment() {
  if (window.REMARK42) {
    if (remark42Instance) {
      remark42Instance.destroy()
    }
    const config = window.remark_config
    config.node = document.getElementById('remark42')
    config.url = window.location.origin + window.location.pathname
    remark42Instance = window.REMARK42.createInstance(config)
  }
  console.log('EVENT EXECUTED')
}

document.addEventListener('htmx:pushedIntoHistory', addRemakeComment)

// Mermaid diagrams
//
// The codeblock render hook emits <pre class="mermaid">. Mermaid itself is
// imported on demand, so pages without a diagram never pay for it. This lives
// here rather than in a <script type="module"> in the page because <body> is
// swapped by hx-boost on every in-site navigation, which would neither re-run a
// module script nor render diagrams on the newly swapped-in page.

let mermaidLib = null

async function renderMermaid() {
  const pending = document.querySelectorAll('pre.mermaid:not([data-processed])')
  if (pending.length === 0) return

  if (!mermaidLib) {
    mermaidLib = (await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')).default
    mermaidLib.initialize({
      startOnLoad: false,
      theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
    })
  }
  await mermaidLib.run({ nodes: pending })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderMermaid)
} else {
  renderMermaid()
}
document.addEventListener('htmx:pushedIntoHistory', renderMermaid)

