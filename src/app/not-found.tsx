import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white flex items-center">
        <div className="container-narrow text-center py-24">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-axiom-100 rounded-2xl mb-6">
            <Compass className="text-axiom-600" size={32} />
          </div>
          <h1 className="heading-lg text-slate-900 mb-4">Page Not Found</h1>
          <p className="text-slate-600 mb-8">
            This page doesn't exist. Try navigating from the home page.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="btn-primary">Go Home</Link>
            <Link href="/quiz" className="btn-secondary">Take the Quiz</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
