import type {
  Answer,
  NormalizedScore,
  ScoreResult,
  Quadrant,
  Question,
} from '@/types'
import { QUESTIONS } from '@/data/questions'
import { IDEOLOGIES } from '@/data/ideologies'

// ─── CONSTANTS ─────────────────────────────────────────────────────────────

const LIKERT_MAP: Record<number, number> = {
  1: -3,  // Strongly Agree
  2: -2,  // Agree
  3: -1,  // Slightly Agree
  4: 0,   // Neutral
  5: 1,   // Slightly Disagree
  6: 2,   // Disagree
  7: 3,   // Strongly Disagree
}

// Section weights — some domains are more ideologically diagnostic
const SECTION_WEIGHTS: Record<string, number> = {
  economy: 1.5,
  social: 1.3,
  government: 1.4,
  environment: 1.0,
  foreign_policy: 0.9,
  justice: 1.1,
  technology: 0.8,
  culture: 1.2,
}

// Anti-extreme bias correction factor — pulls extreme scores slightly toward center
// to correct for social desirability effects in survey responses
const ANTI_EXTREME_FACTOR = 0.92

// ─── NORMALIZATION ──────────────────────────────────────────────────────────

/**
 * Converts a raw score value to the range -100 to +100
 */
export function normalizeScore(raw: number, maxPossible: number): number {
  if (maxPossible === 0) return 0
  const normalized = (raw / maxPossible) * 100
  // Apply anti-extreme correction
  return Math.round(normalized * ANTI_EXTREME_FACTOR * 10) / 10
}

// ─── ANSWER PROCESSING ─────────────────────────────────────────────────────

/**
 * Converts a raw user response to an internal numeric value (-3 to +3)
 */
export function processAnswer(
  question: Question,
  rawResponse: string | number | string[]
): number {
  switch (question.type) {
    case 'likert7': {
      const val = typeof rawResponse === 'number' ? rawResponse : parseInt(rawResponse as string)
      return LIKERT_MAP[val] ?? 0
    }
    case 'yesno': {
      // "yes" aligns with the question effect direction
      return rawResponse === 'yes' ? 3 : rawResponse === 'no' ? -3 : 0
    }
    case 'tradeoff': {
      // Options have their own effect, handled separately
      return rawResponse === 'a' ? 3 : -3
    }
    case 'priority': {
      // Priority ranking normalized by position
      return 0 // Handled differently
    }
    default:
      return 0
  }
}

// ─── MAIN SCORING ENGINE ────────────────────────────────────────────────────

/**
 * The primary scoring function. Takes all answers and returns a full ScoreResult.
 *
 * Methodology:
 * 1. For each answer, retrieve the question's axis effects
 * 2. Multiply the response value by the effect magnitude and question weight
 * 3. Apply section-level weighting
 * 4. For tradeoff questions, use the selected option's effect instead
 * 5. Sum all weighted effects per axis
 * 6. Normalize to -100 to +100 range
 * 7. Apply anti-extreme bias correction
 * 8. Calculate confidence score from consistency
 * 9. Match to ideology
 */
export function calculateScore(answers: Record<string, Answer>): ScoreResult {
  const questionMap = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]))

  let economicSum = 0
  let socialSum = 0
  let economicMaxPossible = 0
  let socialMaxPossible = 0

  // For confidence calculation
  const economicResponses: number[] = []
  const socialResponses: number[] = []

  for (const [questionId, answer] of Object.entries(answers)) {
    const question = questionMap[questionId]
    if (!question) continue

    const sectionWeight = SECTION_WEIGHTS[question.section] ?? 1.0
    const questionWeight = question.weight

    let effectiveValue = answer.value

    // For tradeoff questions: use selected option's effect
    if (question.type === 'tradeoff' && question.options) {
      const selectedOption = question.options.find(
        (o) => o.id === answer.rawResponse
      )
      if (selectedOption) {
        const economicContribution =
          selectedOption.effect.economic * questionWeight * sectionWeight
        const socialContribution =
          selectedOption.effect.social * questionWeight * sectionWeight

        economicSum += economicContribution
        socialSum += socialContribution

        const maxEco = Math.abs(selectedOption.effect.economic) * questionWeight * sectionWeight
        const maxSoc = Math.abs(selectedOption.effect.social) * questionWeight * sectionWeight
        economicMaxPossible += maxEco
        socialMaxPossible += maxSoc

        if (selectedOption.effect.economic !== 0) economicResponses.push(economicContribution / (maxEco || 1))
        if (selectedOption.effect.social !== 0) socialResponses.push(socialContribution / (maxSoc || 1))
        continue
      }
    }

    // For yesno: flip value if question effect is negative (question is negatively framed)
    if (question.type === 'yesno') {
      effectiveValue = answer.value
    }

    const economicEffect = question.effect.economic
    const socialEffect = question.effect.social

    const economicContribution = effectiveValue * economicEffect * questionWeight * sectionWeight
    const socialContribution = effectiveValue * socialEffect * questionWeight * sectionWeight

    economicSum += economicContribution
    socialSum += socialContribution

    const maxEco = 3 * Math.abs(economicEffect) * questionWeight * sectionWeight
    const maxSoc = 3 * Math.abs(socialEffect) * questionWeight * sectionWeight

    economicMaxPossible += maxEco
    socialMaxPossible += maxSoc

    if (economicEffect !== 0) economicResponses.push(economicContribution / (maxEco || 1))
    if (socialEffect !== 0) socialResponses.push(socialContribution / (maxSoc || 1))
  }

  const normalizedEconomic = normalizeScore(economicSum, economicMaxPossible)
  const normalizedSocial = normalizeScore(socialSum, socialMaxPossible)

  // Calculate confidence from variance in responses
  const confidence = calculateConfidence(economicResponses, socialResponses)

  // Calculate intensity
  const economicIntensity = getIntensity(Math.abs(normalizedEconomic))
  const socialIntensity = getIntensity(Math.abs(normalizedSocial))

  // Determine quadrant
  const quadrant = getQuadrant(normalizedEconomic, normalizedSocial)

  // Match ideology
  const ideologyMatch = matchIdeology(normalizedEconomic, normalizedSocial, quadrant)

  // Calculate percentiles (based on synthetic population distribution)
  const percentile = {
    economic: calculatePercentile(normalizedEconomic, 'economic'),
    social: calculatePercentile(normalizedSocial, 'social'),
  }

  return {
    raw: {
      economic: economicSum,
      social: socialSum,
    },
    normalized: {
      economic: normalizedEconomic,
      social: normalizedSocial,
    },
    percentile,
    confidence,
    intensity: {
      economic: economicIntensity,
      social: socialIntensity,
    },
    quadrant,
    ideologyId: ideologyMatch.id,
    subIdeologyId: ideologyMatch.subId,
  }
}

// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────

function getIntensity(
  absScore: number
): 'mild' | 'moderate' | 'strong' | 'extreme' {
  if (absScore < 20) return 'mild'
  if (absScore < 45) return 'moderate'
  if (absScore < 70) return 'strong'
  return 'extreme'
}

function getQuadrant(economic: number, social: number): Quadrant {
  const CENTER_THRESHOLD = 15
  const isCenter =
    Math.abs(economic) < CENTER_THRESHOLD && Math.abs(social) < CENTER_THRESHOLD

  if (isCenter) return 'center'
  if (economic >= 0 && social >= 0) return 'auth_right'
  if (economic < 0 && social >= 0) return 'auth_left'
  if (economic >= 0 && social < 0) return 'lib_right'
  return 'lib_left'
}

function matchIdeology(
  economic: number,
  social: number,
  quadrant: Quadrant
): { id: string; subId?: string } {
  const candidates = IDEOLOGIES.filter((i) => i.quadrant === quadrant)

  if (candidates.length === 0) return { id: 'centrist' }

  // Score each ideology by distance from user's position within its range
  let bestMatch = candidates[0]
  let bestScore = Infinity

  for (const ideology of candidates) {
    const ecoMid = (ideology.economicRange[0] + ideology.economicRange[1]) / 2
    const socMid = (ideology.socialRange[0] + ideology.socialRange[1]) / 2

    const distance = Math.sqrt(
      Math.pow(economic - ecoMid, 2) + Math.pow(social - socMid, 2)
    )

    if (distance < bestScore) {
      bestScore = distance
      bestMatch = ideology
    }
  }

  return { id: bestMatch.id }
}

/**
 * Calculates confidence as 100 minus the normalized standard deviation of responses.
 * High variance = low confidence (user is inconsistent across related questions).
 */
function calculateConfidence(
  economicResponses: number[],
  socialResponses: number[]
): number {
  const allResponses = [...economicResponses, ...socialResponses]
  if (allResponses.length === 0) return 50

  const mean = allResponses.reduce((a, b) => a + b, 0) / allResponses.length
  const variance =
    allResponses.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
    allResponses.length
  const stdDev = Math.sqrt(variance)

  // stdDev of 0 = perfectly consistent = 100% confidence
  // stdDev of 1 = max inconsistency = ~40% confidence
  const confidence = Math.max(40, Math.round(100 - stdDev * 60))
  return confidence
}

/**
 * Simulates a population percentile based on a synthetic normal distribution.
 * The synthetic distribution is calibrated to a slightly left-libertarian mean
 * (which reflects most political quiz participant populations).
 */
function calculatePercentile(score: number, axis: 'economic' | 'social'): number {
  // Synthetic population parameters (mean, std)
  const params = {
    economic: { mean: -5, std: 35 },  // Population slightly left of center
    social: { mean: -10, std: 30 },   // Population slightly libertarian
  }

  const { mean, std } = params[axis]
  const z = (score - mean) / std

  // Approximate cumulative normal distribution
  return Math.round(normalCDF(z) * 100)
}

// Abramowitz & Stegun approximation for CDF
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = 0.3989423 * Math.exp(-0.5 * x * x)
  const p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.7814779 + t * (-1.8212559 + t * 1.3302744))))
  return x > 0 ? 1 - p : p
}

// ─── UTILITY EXPORTS ────────────────────────────────────────────────────────

export function getAxisLabel(score: number, axis: 'economic' | 'social'): string {
  const labels = {
    economic: {
      far_left: 'Far Left',
      left: 'Left',
      center_left: 'Centre-Left',
      center: 'Centre',
      center_right: 'Centre-Right',
      right: 'Right',
      far_right: 'Far Right',
    },
    social: {
      far_left: 'Strongly Libertarian',
      left: 'Libertarian',
      center_left: 'Mildly Libertarian',
      center: 'Neutral',
      center_right: 'Mildly Authoritarian',
      right: 'Authoritarian',
      far_right: 'Strongly Authoritarian',
    },
  }

  const l = labels[axis]
  if (score < -65) return l.far_left
  if (score < -35) return l.left
  if (score < -10) return l.center_left
  if (score < 10) return l.center
  if (score < 35) return l.center_right
  if (score < 65) return l.right
  return l.far_right
}

export function encodeResultToUrl(result: ScoreResult): string {
  const params = new URLSearchParams({
    e: String(result.normalized.economic),
    s: String(result.normalized.social),
    i: result.ideologyId,
    c: String(result.confidence),
  })
  return params.toString()
}

export function decodeResultFromUrl(
  searchParams: URLSearchParams
): Partial<ScoreResult> | null {
  const e = searchParams.get('e')
  const s = searchParams.get('s')
  const i = searchParams.get('i')
  const c = searchParams.get('c')

  if (!e || !s || !i) return null

  return {
    normalized: {
      economic: parseFloat(e),
      social: parseFloat(s),
    },
    ideologyId: i,
    confidence: c ? parseInt(c) : 75,
    quadrant: getQuadrant(parseFloat(e), parseFloat(s)),
  }
}
