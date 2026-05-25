'use client'

import { useState, useEffect } from 'react'

const WORDS = [
  'ERP Implementation',
  'Online Store Setup',
  'Workflow Automation',
  'Digital Transformation',
]

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = WORDS[wordIndex]
    const atFullWord = displayText === currentWord
    const atEmpty = displayText === ''

    const delay = isDeleting ? 45 : atFullWord ? 1600 : 100

    const timeout = setTimeout(() => {
      if (!isDeleting && !atFullWord) {
        setDisplayText(currentWord.slice(0, displayText.length + 1))
      } else if (!isDeleting && atFullWord) {
        setIsDeleting(true)
      } else if (isDeleting && !atEmpty) {
        setDisplayText(displayText.slice(0, -1))
      } else if (isDeleting && atEmpty) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % WORDS.length)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [displayText, wordIndex, isDeleting])

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 py-32 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-m font-medium text-[#52a9ff] bg-[#52a9ff]/10 rounded-full border border-[#52a9ff]/30">
          E-commerce & ERP Specialists
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Smart Commerce &{' '}
          <span className="block text-[#52a9ff] min-h-[6rem] sm:min-h-[8rem] md:min-h-[12rem] xl:min-h-[6rem]">
            {displayText}
            <span className="animate-pulse ml-0.2">|</span>
          </span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          We help businesses launch online stores, integrate ERP systems, and automate
          workflows — from kickoff to go-live.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-4 bg-[#52a9ff] text-white font-semibold rounded-lg hover:bg-[#3a9ef0] transition-colors text-lg"
          >
            Start Your Project →
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 transition-colors text-lg"
          >
            See What We Do
          </a>
        </div>
      </div>
    </section>
  )
}
