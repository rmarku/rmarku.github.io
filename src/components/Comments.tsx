'use client'

import { FC, useEffect, useState } from 'react'

interface Props {
  id: string
  url: string
  title: string
}

const Comments: FC<Props> = ({ id, url, title }) => {
  useEffect(() => {
    const script = document.createElement('script')
    const anchor = document.getElementById('comments')
    script.setAttribute('src', 'https://cusdis.com/js/cusdis.es.js')
    script.setAttribute('async', 'true')
    script.setAttribute('defer', 'true')

    if (anchor) {
      anchor.appendChild(script)
    }

    return () => {
      if (anchor) {
        anchor.innerHTML = ''
      }
    }
  }, [id, url, title])

  return (
    <div id='comments'>
      <div
        id='cusdis_thread'
        data-host='https://cusdis.com'
        data-app-id='3f1522a7-e7b3-40ab-9419-bd410f550b65'
        data-page-id={id}
        data-page-url={url}
        data-page-title={title}
        data-theme={'light'}></div>
    </div>
  )
}

export default Comments
