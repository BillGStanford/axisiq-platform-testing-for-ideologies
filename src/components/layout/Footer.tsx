import Link from 'next/link'
import { Compass, ExternalLink } from 'lucide-react'
import { BRAND, FOOTER_LINKS } from '@/lib/config'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-axiom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-display font-bold text-xl text-white mb-4"
            >
              <div className="w-8 h-8 bg-axiom-600 rounded-lg flex items-center justify-center">
                <Compass className="text-white" size={18} />
              </div>
              <span>
                Axis<span className="text-axiom-400">IQ</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-xs">
              The most methodologically rigorous political compass quiz. Research-backed, transparently scored, ideology-agnostic.
            </p>
            <p className="text-xs text-slate-500">
              AxisIQ is an independent educational platform. We have no political affiliation and accept no funding from political organizations.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-slate-500">
            © {BRAND.founded}–{new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500">
              Built for political education. Not affiliated with any party, candidate, or organization.
            </p>
            <a
              href={`https://${BRAND.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
            >
              {BRAND.domain}
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
