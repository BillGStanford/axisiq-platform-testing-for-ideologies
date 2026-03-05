import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy — AxisIQ',
  description: 'AxisIQ privacy policy. We collect no personal data. Your quiz answers are never stored.',
  canonicalPath: '/privacy',
  noIndex: false,
})

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        <section className="bg-slate-900 text-white py-12">
          <div className="container-narrow">
            <h1 className="heading-lg text-white mb-2">Privacy Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: January 1, 2025</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-narrow prose prose-slate max-w-none">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-10 not-prose">
              <p className="text-green-800 font-semibold text-sm mb-1">TL;DR — The short version:</p>
              <p className="text-green-700 text-sm">
                Your quiz answers are processed entirely in your browser and <strong>never sent to our servers</strong>. We don't collect your name, email, IP address, or any personal information. We may use anonymized, aggregated analytics (no individual tracking). That's it.
              </p>
            </div>

            {[
              {
                title: '1. Information We Do Not Collect',
                body: `AxisIQ does not collect:
• Your quiz answers or political positions
• Your name, email address, or any contact information
• Your IP address (beyond what web servers technically log for security)
• Device fingerprints or persistent identifiers
• Any information that could identify you as an individual

Your quiz responses are processed locally in your browser using JavaScript. They are never transmitted to our servers.`,
              },
              {
                title: '2. Analytics',
                body: `We may use Google Analytics 4 or a privacy-respecting alternative to collect aggregated, anonymized data such as:
• Number of page visits
• Number of quiz completions
• Geographic region (country-level only)
• Browser type and device category

This data cannot be used to identify individual users. IP anonymization is enabled. We do not use this data for advertising or sell it to third parties.

You can opt out of analytics tracking using your browser's "Do Not Track" setting or a browser extension like uBlock Origin.`,
              },
              {
                title: '3. Cookies',
                body: `AxisIQ uses only functional cookies necessary for the website to operate. We do not use tracking cookies, advertising cookies, or third-party cookies for targeting purposes.

If analytics is enabled, Google Analytics may set cookies as described in Google's privacy documentation. You can delete or block these at any time through your browser settings.`,
              },
              {
                title: '4. Sharing',
                body: `Your results page is shareable via a URL that encodes your scores as query parameters. This URL contains only your numeric scores and matched ideology — no personal information. If you share this URL, anyone with it can view your scores. Sharing is entirely optional and user-initiated.`,
              },
              {
                title: '5. Third-Party Services',
                body: `AxisIQ may use the following third-party services:
• Google Analytics 4 — anonymized website analytics
• Google AdSense — advertising (if enabled)
• Vercel — website hosting

Each of these services has its own privacy policy. We select services with strong privacy practices and configure them to minimize data collection.`,
              },
              {
                title: '6. Advertising',
                body: `AxisIQ may display advertisements to support free access to the platform. Advertisements are served by Google AdSense. We do not allow behavioral targeting based on quiz answers. Political ideology data is never used for ad targeting — this would be a fundamental violation of our values.

Ads can be disabled by users through standard ad-blocking tools.`,
              },
              {
                title: '7. Children',
                body: `AxisIQ is not directed at children under 13. We do not knowingly collect any data from children under 13. If you believe a child has provided personal information, contact us and we will address it promptly.`,
              },
              {
                title: '8. Changes to This Policy',
                body: `We may update this policy as our practices change. Material changes will be noted at the top of this page with the updated date. We will never introduce data practices that conflict with our core commitment to user privacy without prominent notice.`,
              },
              {
                title: '9. Contact',
                body: `Privacy inquiries: contact@axisiq.app

We take privacy seriously and will respond to legitimate requests promptly.`,
              },
            ].map((section) => (
              <div key={section.title} className="mb-10">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-3">{section.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
