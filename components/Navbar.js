'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-bold text-xl">LaunchPro</span>

        {/* Desktop nav — hidden below sm */}
        <nav className="hidden sm:flex items-center gap-8 text-sm text-slate-300">
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#process" className="hover:text-white transition-colors">
            Process
          </a>
          <a
            href="#contact"
            className="px-4 py-2 bg-[#52a9ff] text-white rounded-lg hover:bg-[#3a9ef0] transition-colors"
          >
            Get Started
          </a>
        </nav>

        {/* Hamburger button — visible only below sm */}
        <button
          className="sm:hidden text-slate-300 hover:text-white text-2xl leading-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="sm:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col gap-4 text-sm">
          <a
            href="#services"
            onClick={close}
            className="text-slate-300 hover:text-white transition-colors"
          >
            Services
          </a>
          <a
            href="#process"
            onClick={close}
            className="text-slate-300 hover:text-white transition-colors"
          >
            Process
          </a>
          <a
            href="#contact"
            onClick={close}
            className="px-4 py-3 bg-[#52a9ff] text-white rounded-lg hover:bg-[#3a9ef0] transition-colors text-center"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  )
}
