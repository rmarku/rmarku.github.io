'use client'

import React, { useRef } from 'react'

import useScript from '../hooks/useScript'

const Comments = () => {
  const comment = useRef(null)

  const status = useScript({
    url: 'https://utteranc.es/client.js',
    theme: 'preferred-color-scheme',
    issueTerm: 'pathname',
    repo: 'rmarku/rmarku.github.io',
    ref: comment,
  })

  return <div className='w-full'>{<div ref={comment}></div>}</div>
}

export default Comments
