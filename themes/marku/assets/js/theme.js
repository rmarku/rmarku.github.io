// Three-state theme control: system (default), light, dark.
//
// The previous version had two always-visible buttons and a bug that made the
// stored preference unreachable. It also had no way back to "follow the OS"
// once you had picked a side.
//
// The <html data-theme> attribute is set by an inline snippet in <head> before
// first paint; this module only wires the control and keeps remark42 in step.

const KEY = 'theme'
const STATES = ['system', 'light', 'dark']

export function resolved() {
  const stored = localStorage.getItem(KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function apply(state) {
  const el = document.documentElement
  if (state === 'system') {
    el.removeAttribute('data-theme')
    localStorage.removeItem(KEY)
  } else {
    el.setAttribute('data-theme', state)
    localStorage.setItem(KEY, state)
  }
  el.dataset.themeChoice = state
  window.REMARK42?.changeTheme(resolved())
  window.dispatchEvent(new CustomEvent('themechange', { detail: { resolved: resolved() } }))
}

export function init() {
  const toggle = document.querySelector('[data-theme-toggle]')
  if (!toggle) return

  const current = () => localStorage.getItem(KEY) ?? 'system'
  document.documentElement.dataset.themeChoice = current()

  toggle.addEventListener('click', () => {
    apply(STATES[(STATES.indexOf(current()) + 1) % STATES.length])
  })

  // While on "system", follow the OS if it changes mid-session.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (current() === 'system') apply('system')
  })
}
