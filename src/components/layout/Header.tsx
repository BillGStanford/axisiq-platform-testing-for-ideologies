'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Compass, ChevronRight } from 'lucide-react'
import { BRAND, NAV_LINKS } from '@/lib/config'
import { cn } from '@/lib/utils'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isQuizPage = pathname.startsWith('/quiz')

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMenuOpen
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-axiom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display font-bold text-xl text-slate-900 hover:text-axiom-700 transition-colors"
          >
            <div className="w-8 h-8 bg-axiom-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Compass className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <span>
              Axis<span className="text-axiom-600">IQ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.filter((l) => l.href !== '/quiz').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  pathname === link.href
                    ? 'text-axiom-700 bg-axiom-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!isQuizPage && (
              <Link
                href="/quiz"
                className="btn-primary text-sm py-2 px-4"
              >
                Take the Quiz
                <ChevronRight size={16} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container-axiom py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-axiom-700 bg-axiom-50'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 mt-2">
              <Link href="/quiz" className="btn-primary w-full text-sm justify-center">
                Take the Quiz
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
