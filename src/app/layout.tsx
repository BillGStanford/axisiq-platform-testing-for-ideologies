import type { Metadata } from 'next'
import Script from 'next/script'
import { buildMetadata, getOrganizationJsonLd, getWebsiteJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/config'
import './globals.css'

export const metadata: Metadata = buildMetadata({
  canonicalPath: '/',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([getOrganizationJsonLd(), getWebsiteJsonLd()]),
          }}
        />
      </head>
      <body
        className="font-body antialiased bg-slate-50 text-slate-900 selection:bg-axiom-100 selection:text-axiom-900"
        style={{
          '--font-display': "'Playfair Display', Georgia, serif",
          '--font-body': "'DM Sans', system-ui, sans-serif",
          '--font-mono': "'DM Mono', monospace",
        } as React.CSSProperties}
      >
        {/* Google Analytics 4 */}
        {siteConfig.analyticsEnabled && siteConfig.ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteConfig.ga4Id}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure'
                });
              `}
            </Script>
          </>
        )}

        {/* Google AdSense */}
        {siteConfig.adsEnabled && siteConfig.adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}

        {children}
      </body>
    </html>
  )
}
