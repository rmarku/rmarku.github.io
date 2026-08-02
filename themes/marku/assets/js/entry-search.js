// Separate esbuild entry point carrying Fuse. See entry-mermaid.js for why
// these are not chunks of main.js.
//
// Loaded on first search interaction, so visitors who never search never
// download it -- the old code fetched both Fuse and a 36 KB index on every
// page load.

import * as search from './search.js'

export const attach = search.attach
