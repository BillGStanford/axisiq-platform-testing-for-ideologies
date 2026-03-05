// ============================================================
// QUESTION TYPES
// ============================================================

export type QuestionType =
  | 'likert7'      // Strongly Agree → Strongly Disagree (7-point)
  | 'yesno'        // Yes / No binary
  | 'tradeoff'     // Choose between two values
  | 'priority'     // Rank priorities (select order)
  | 'slider'       // Continuous slider
  | 'multichoice'  // Multiple choice (pick one)

export type Axis = 'economic' | 'social' | 'diplomatic' | 'state'

export interface AxisWeight {
  economic: number   // Left(-) ↔ Right(+)
  social: number     // Libertarian(-) ↔ Authoritarian(+)
  diplomatic?: number
  state?: number
}

export interface Question {
  id: string
  type: QuestionType
  section: SectionId
  text: string
  subtext?: string
  effect: AxisWeight
  weight: number          // 1.0 = normal, 1.5 = elevated, 2.0 = high importance
  tags: string[]
  options?: QuestionOption[]   // For multichoice / tradeoff
  priorities?: string[]        // For priority ranking
}

export interface QuestionOption {
  id: string
  label: string
  effect: AxisWeight
}

export type SectionId =
  | 'economy'
  | 'social'
  | 'government'
  | 'environment'
  | 'foreign_policy'
  | 'justice'
  | 'technology'
  | 'culture'

export interface QuizSection {
  id: SectionId
  title: string
  description: string
  icon: string
  questionCount: number
  color: string
}

// ============================================================
// SCORING TYPES
// ============================================================

export interface RawScore {
  economic: number
  social: number
}

export interface NormalizedScore {
  economic: number   // -100 to +100 (Left to Right)
  social: number     // -100 to +100 (Libertarian to Authoritarian)
}

export interface ScoreResult {
  raw: RawScore
  normalized: NormalizedScore
  percentile: {
    economic: number
    social: number
  }
  confidence: number        // 0-100, based on answer consistency
  intensity: {
    economic: 'mild' | 'moderate' | 'strong' | 'extreme'
    social: 'mild' | 'moderate' | 'strong' | 'extreme'
  }
  quadrant: Quadrant
  ideologyId: string
  subIdeologyId?: string
}

export type Quadrant =
  | 'auth_right'    // Authoritarian Right
  | 'auth_left'     // Authoritarian Left
  | 'lib_right'     // Libertarian Right
  | 'lib_left'      // Libertarian Left
  | 'center'        // Centrist

export interface Answer {
  questionId: string
  value: number        // Normalized: -3 to +3 for likert, -1/+1 for yes/no
  rawResponse: string | number | string[]
}

export interface QuizState {
  currentSection: SectionId
  currentQuestionIndex: number
  answers: Record<string, Answer>
  startedAt: number
  completedSections: SectionId[]
  isComplete: boolean
}

// ============================================================
// IDEOLOGY TYPES
// ============================================================

export interface Ideology {
  id: string
  name: string
  subName?: string
  description: string
  longDescription: string
  quadrant: Quadrant
  economicRange: [number, number]   // [min, max] on -100 to 100 scale
  socialRange: [number, number]
  color: string
  textColor: string
  tags: string[]
  historicalParties: string[]
  modernParties: string[]
  historicalFigures: string[]
  modernFigures: string[]
  organizations: string[]
  thinkers: string[]
  suggestedReading: Book[]
  similarIdeologies: string[]     // ideology ids
  opposingIdeologies: string[]    // ideology ids
  keyBeliefs: string[]
  critiques: string[]
  economicPolicies: string[]
  socialPolicies: string[]
}

export interface Book {
  title: string
  author: string
  year: number
  description: string
}

// ============================================================
// PEOPLE & ORGANIZATIONS
// ============================================================

export interface PoliticalFigure {
  id: string
  name: string
  era: 'historical' | 'modern'
  years?: string
  nationality: string
  role: string
  ideologyId: string
  description: string
  known_for: string[]
}

export interface Organization {
  id: string
  name: string
  type: 'party' | 'think_tank' | 'ngo' | 'international' | 'movement'
  country?: string
  founded?: number
  ideologyId: string
  description: string
  website?: string
}

// ============================================================
// SEO TYPES
// ============================================================

export interface SeoContent {
  id: string
  title: string
  description: string
  slug: string
  content: SeoSection[]
  keywords: string[]
  publishedAt: string
  updatedAt: string
}

export interface SeoSection {
  heading: string
  body: string
}

// ============================================================
// SHARE TYPES
// ============================================================

export interface ShareData {
  ideologyName: string
  economicScore: number
  socialScore: number
  quadrant: Quadrant
  confidence: number
  shareUrl: string
  ogTitle: string
  ogDescription: string
  twitterText: string
  linkedinText: string
}

// ============================================================
// CONFIG TYPES
// ============================================================

export interface SiteConfig {
  name: string
  tagline: string
  domain: string
  description: string
  ga4Id?: string
  adsenseId?: string
  adsEnabled: boolean
  analyticsEnabled: boolean
}
