'use client'

import { ReactElement, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import cpp from 'react-syntax-highlighter/dist/cjs/languages/hljs/cpp'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import shell from 'react-syntax-highlighter/dist/cjs/languages/hljs/shell'

import { frappe, latte } from './HLStyles'

SyntaxHighlighter.registerLanguage('cpp', cpp)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('shell', shell)

type SyntaxProps = {
  children: string
  language: string
  title: string | ReactElement
  [key: string]: any // for additional props
}
const Syntax: React.FC<SyntaxProps> = ({ children, language, title, ...props }) => {
  return (
    // @ts-ignore
    <div className='border rounded-lg shadow-md' style={frappe.hljs}>
      <div className='container flex justify-between'>
        <div className='flex pt-2 pl-5'>{title}</div>
        <div className='flex'>
          <Copy text={children} />
        </div>
      </div>
      <SyntaxHighlighter {...props} style={frappe} language={language} showLineNumbers>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

const Copy: React.FC<{ text: string }> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false)
  const setCopied = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }
  return (
    <CopyToClipboard text={text}>
      <button onClick={() => setCopied()}>
        {isCopied ? (
          <span title='Copied!'>
            <svg width='30' height='30' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                className='icon'
                fill-rule='evenodd'
                d='M11 5a1 1 0 0 0-1 1v2h4V6a1 1 0 0 0-1-1h-2Zm4.83 0A3.001 3.001 0 0 0 13 3h-2a3.001 3.001 0 0 0-2.83 2H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-2.17ZM16 7v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7H6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-2Z'
                clip-rule='evenodd'
              />
            </svg>
          </span>
        ) : (
          <span title='Copy to Clipboard'>
            <svg width='30' height='30' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                className='icon'
                d='M19.53 8 14 2.47a.75.75 0 0 0-.53-.22H11A2.75 2.75 0 0 0 8.25 5v1.25H7A2.75 2.75 0 0 0 4.25 9v10A2.75 2.75 0 0 0 7 21.75h7A2.75 2.75 0 0 0 16.75 19v-1.25H17A2.75 2.75 0 0 0 19.75 15V8.5a.75.75 0 0 0-.22-.5Zm-5.28-3.19 2.94 2.94h-2.94V4.81Zm1 14.19A1.25 1.25 0 0 1 14 20.25H7A1.25 1.25 0 0 1 5.75 19V9A1.25 1.25 0 0 1 7 7.75h1.25V15A2.75 2.75 0 0 0 11 17.75h4.25V19ZM17 16.25h-6A1.25 1.25 0 0 1 9.75 15V5A1.25 1.25 0 0 1 11 3.75h1.75V8.5a.76.76 0 0 0 .75.75h4.75V15A1.25 1.25 0 0 1 17 16.25Z'
              />
            </svg>
          </span>
        )}
      </button>
    </CopyToClipboard>
  )
}
export default Syntax
