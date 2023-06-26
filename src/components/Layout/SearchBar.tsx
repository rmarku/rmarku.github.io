'use client'

import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import { SupportedLanguages } from '@/lib/i18n'
import { useTranslation } from '@/lib/i18n/utils'
import { Post } from '@/lib/posts'

enum Keys {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}

type SearchBarProps = {
  serarchText: string
  posts: Post[]
}

const SearchBar: React.FC<SearchBarProps> = ({ serarchText, posts }) => {
  const router = useRouter()
  const [activeOption, setActiveOption] = useState(0)
  const [filteredOptions, setFilteredOptions] = useState<Fuse.FuseResult<Post>[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const [userInput, setUserInput] = useState('')

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ['title', 'description', 'content', 'tags'],
      includeScore: true,
      includeMatches: true,
      threshold: 0.25,
    })
  }, [posts])

  useEffect(() => {
    if (userInput && fuse) {
      const filtered = fuse.search(userInput)
      setFilteredOptions(filtered)
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
  }, [userInput, fuse])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Keys.Enter) {
      setActiveOption(0)
      goTo(filteredOptions[0].item)
    } else if (e.key === Keys.ArrowUp && activeOption !== 0) {
      setActiveOption(activeOption - 1)
    } else if (e.key === Keys.ArrowDown && activeOption !== filteredOptions.length - 1) {
      setActiveOption(activeOption + 1)
    }
  }
  const goTo = (p: Post) => {
    const url = '/' + p.lang + '/posts/' + p.slug
    setShowOptions(false)
    router.push(url)
  }

  return (
    <div className='relative'>
      <input
        type='text'
        placeholder={serarchText}
        className='w-full p-2 border-2 text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
        onChange={(e) => setUserInput(e.currentTarget.value)}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {showOptions && userInput && (
        <div className='overflow-visible min-w-full w-3/3 -m-32 absolute z-10 mt-2 border-2 border-gray-300 rounded-md bg-white text-black divide-y divide-gray-300'>
          {filteredOptions.map((optionName, index) => (
            <div
              className={`p-2 hover:bg-indigo-500 hover:text-white ${
                index === activeOption && 'bg-indigo-500 text-white'
              }`}
              key={optionName.refIndex}
              onClick={() => goTo(optionName.item)}>
              <MarkText resultKey='title' result={optionName} className='font-bold' />
              <br />
              <MarkText resultKey='description' result={optionName} className='text-sm font-light' />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

type MarkTextProps = {
  resultKey: keyof Post
  result: Fuse.FuseResult<Post>
  [key: string]: any // for additional props
}

const MarkText: React.FC<MarkTextProps> = ({ resultKey, result, ...props }): JSX.Element => {
  let txt: (string | JSX.Element)[] = [result.item[resultKey] as string]
  const match = result.matches?.find((m) => m.key === resultKey)
  let start = 0

  if (match) {
    let lastEnd = 0
    const text = match.value as string
    txt = []

    match.indices.forEach(([startIndex, endIndex], index) => {
      // Add the text before the match.
      txt.push(text.substring(start, startIndex))
      // Add the matched text, with a highlight.
      txt.push(<mark key={index}>{text?.substring(startIndex, endIndex + 1)}</mark>)
      // Update the start position for the next iteration.
      start = endIndex + 1
    })
    // Add the text after the last match.
    txt.push(text?.substring(start))
  }
  return <span {...props}>{txt}</span>
}

export default SearchBar
