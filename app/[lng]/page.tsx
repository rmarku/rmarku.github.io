'use client'
import { DarkProvider } from '../../lib/darkContext'

export default function Page({ params }: { params: { lng: string } }) {
  const { lng } = params
  return <DarkProvider>{lng}</DarkProvider>
}
