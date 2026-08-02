// Separate esbuild entry point, not a chunk of main.js.
//
// js.Build's `splitting` option does not emit sibling chunk files the way
// esbuild's CLI does -- everything ends up inlined, which put ~3.5 MB of
// Mermaid into the entry bundle on every page. Building it as its own entry
// and handing main.js the URL keeps it out until a page actually has a
// diagram. (js.Batch is the other option, but it needs templates.Defer and is
// far more machinery than two entry points.)

import * as mermaid from './mermaid.js'

mermaid.init()
