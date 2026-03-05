# AxisIQ — Political Compass Quiz Platform

> **"Better than the Political Compass Quiz."**
> The most methodologically rigorous political compass quiz on the internet.

---

## Brand Overview

| Element | Value |
|---|---|
| **Brand Name** | AxisIQ |
| **Domain** | axisiq.app |
| **Tagline** | The Political Compass. Reimagined. |
| **SEO Tagline** | Find Your Political Ideology | AxisIQ Political Compass Quiz |
| **Tone** | Institutional, credible, academic, data-driven |
| **Primary Color** | `#4c53e5` (Axiom Indigo) |
| **Display Font** | Playfair Display (serif — authority, academia) |
| **Body Font** | DM Sans (clean, modern, readable) |
| **Mono Font** | DM Mono (scores, data, methodology) |

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: TailwindCSS + custom design system
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives (shadcn/ui patterns)
- **Animations**: Framer Motion + CSS animations
- **Analytics**: Google Analytics 4 (lazy, opt-out friendly)
- **Ads**: Google AdSense (lazy loaded, toggleable)
- **Hosting**: Vercel (recommended)

**No backend. No database. 100% frontend/static.**

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage (hero, features, SEO content)
│   ├── layout.tsx              # Root layout (fonts, GA4, AdSense)
│   ├── globals.css             # Design system CSS
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # robots.txt
│   ├── quiz/
│   │   └── page.tsx            # Quiz intro + active quiz
│   ├── results/
│   │   └── page.tsx            # Full results page
│   ├── methodology/
│   │   └── page.tsx            # Methodology documentation
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── faq/
│   │   └── page.tsx            # FAQ
│   ├── privacy/
│   │   └── page.tsx            # Privacy policy
│   └── blog/
│       ├── page.tsx            # Blog index
│       ├── what-is-political-compass/page.tsx
│       ├── left-vs-right/page.tsx
│       ├── authoritarian-vs-libertarian/page.tsx
│       └── how-accurate-are-political-tests/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header with mobile menu
│   │   ├── Footer.tsx          # Full footer with link columns
│   │   └── AdSlot.tsx          # Toggleable AdSense component
│   ├── quiz/
│   │   ├── QuestionRenderer.tsx # All question types (Likert, Yes/No, Tradeoff)
│   │   └── QuizProgress.tsx    # Section progress, overall progress bar
│   └── results/
│       └── CompassVisualization.tsx  # SVG compass with animated dot
│
├── data/                       # All static data (no DB required)
│   ├── questions.ts            # 70+ questions with weights and effects
│   └── ideologies.ts           # 10+ ideology profiles (full detail)
│
├── hooks/
│   └── useQuizState.ts         # All quiz state management
│
├── lib/
│   ├── config.ts               # Site config, brand, navigation
│   ├── scoring.ts              # Full scoring engine with methodology
│   ├── seo.ts                  # SEO utilities, JSON-LD generators
│   ├── analytics.ts            # GA4 event tracking
│   ├── share.ts                # Share URL generation and social openers
│   └── utils.ts                # cn() utility
│
└── types/
    └── index.ts                # All TypeScript interfaces
```

---

## Quick Start

```bash
# 1. Clone or download the project
cd axiom-quiz

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your GA4 and AdSense IDs

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

---

## Deployment to Vercel (Recommended)

### Option A: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B: GitHub + Vercel Dashboard
1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GA4_ID` = your GA4 measurement ID
   - `NEXT_PUBLIC_ADSENSE_ID` = your AdSense publisher ID  
   - `NEXT_PUBLIC_ANALYTICS_ENABLED` = `true`
   - `NEXT_PUBLIC_ADS_ENABLED` = `true`
5. Deploy

### Custom Domain
In Vercel project settings → Domains → Add `axisiq.app`

---

## Configuration

### Enable Analytics (GA4)
```env
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

### Enable Ads (AdSense)
```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADS_ENABLED=true
```

Ad slots are placed:
- `below-hero` — homepage, below the hero section
- `between-sections` — quiz page, between sections
- `after-results` — results page, below the compass

---

## Scoring System

The AxisIQ scoring engine (`src/lib/scoring.ts`) implements:

1. **Answer normalization**: Likert 7→±3, Yes/No→±3, Tradeoff→option effects
2. **Contribution calculation**: `value × axis_effect × question_weight × section_weight`
3. **Summation**: All contributions summed per axis
4. **Normalization**: Divided by max possible, scaled to -100/+100
5. **Anti-extreme correction**: Factor 0.92 applied
6. **Confidence**: Standard deviation of normalized responses → 40–100%
7. **Ideology matching**: Minimum Euclidean distance to ideology centroids
8. **Percentile**: Estimated against synthetic population distribution

---

## Adding Content

### Add a Question
Edit `src/data/questions.ts`:
```typescript
{
  id: 'eco_13',
  type: 'likert7',
  section: 'economy',
  text: 'Your question here.',
  effect: { economic: 1.5, social: 0 },  // axis effects
  weight: 1.5,                             // question weight
  tags: ['relevant', 'tags'],
}
```

### Add an Ideology
Edit `src/data/ideologies.ts` and add a full `Ideology` object.
Update `economicRange` and `socialRange` to position it on the compass.

### Add a Blog Article
Create `src/app/blog/your-slug/page.tsx` following the existing pattern.
Add the slug to `src/app/sitemap.ts`.

---

## SEO Checklist

- ✅ Full metadata API usage (title, description, keywords)
- ✅ OpenGraph tags (title, description, image, URL)
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ JSON-LD structured data (Organization, Quiz, Article, WebSite)
- ✅ Dynamic sitemap.xml
- ✅ robots.txt
- ✅ Security headers (vercel.json)
- ✅ Semantic HTML
- ✅ ARIA attributes
- ✅ Google Fonts with preconnect

---

## Performance Notes

- All pages are server-rendered by default (Next.js App Router)
- Quiz runs entirely client-side (no server calls during quiz)
- Google Fonts loaded with `display=swap`
- Analytics and AdSense loaded with `strategy="afterInteractive"` / `"lazyOnload"`
- Images use Next.js `<Image>` with `avif/webp` formats
- Code splitting is automatic via Next.js

---

## Future Roadmap (Not Implemented)

- [ ] User accounts + saved results
- [ ] Friends comparison feature
- [ ] Multiple quiz modes (short 20q, deep 100q)
- [ ] AI-generated ideology explanation (via API)
- [ ] Email capture + results PDF
- [ ] Regional quiz variants (US, UK, EU)
- [ ] Historical quiz results dashboard
- [ ] Paid premium detailed report

The codebase is structured to support all of these additions cleanly.

---

## License

AxisIQ is proprietary software. All rights reserved.

---

*Built with ❤️ for political clarity.*