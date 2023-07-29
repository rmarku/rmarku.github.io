import { useEffect, useRef, useState } from 'react'

// Define the type for the params
interface Params {
  url: string
  theme: string
  issueTerm: string
  repo: string
  ref: React.RefObject<HTMLElement>
}

// Define the type for the status
type Status = 'loading' | 'idle' | 'ready' | 'error'

const useScript = (params: Params): Status => {
  const { url, theme, issueTerm, repo, ref } = params

  const [status, setStatus] = useState<Status>(url ? 'loading' : 'idle')

  console.log(params)

  useEffect(() => {
    if (!url) {
      setStatus('idle')
      return
    }

    let script = document.createElement('script')
    script.src = url
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('theme', theme)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('repo', repo)

    // Add script to document body
    if (ref.current) {
      ref.current.appendChild(script)
    }

    // store status of the script
    const setAttributeStatus = (event: Event) => {
      // set status based on the type property
      setStatus(event.type === 'load' ? 'ready' : 'error')
    }

    script.addEventListener('load', setAttributeStatus)
    script.addEventListener('error', setAttributeStatus)

    return () => {
      // useEffect clean up
      if (script) {
        script.removeEventListener('load', setAttributeStatus)
        script.removeEventListener('error', setAttributeStatus)
      }
    }
  }, [url])

  return status
}

export default useScript
