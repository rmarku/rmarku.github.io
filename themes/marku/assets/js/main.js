// Entry bundle: only what every page needs. Mermaid and Fuse are built as
// separate esbuild entries (see entry-mermaid.js) and their URLs handed in via
// esbuild's params, so neither is downloaded unless the page needs it.

import * as params from '@params'

import * as codeCopy from './code-copy.js'
import * as comments from './comments.js'
import * as searchOpen from './search-open.js'
import * as theme from './theme.js'

theme.init()
codeCopy.init()
comments.init()
searchOpen.init(params.searchUrl)

if (document.querySelector('pre.mermaid')) {
  import(/* @vite-ignore */ params.mermaidUrl)
}
