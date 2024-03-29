import { Cache } from './cache'

const value = {
  X: -2,
  W: -2,

  Y: 5,
  G: 6,
  H: 0,

  YG: 4,
  GY: 4,

  YH: 2.3,
  HY: 2.3,
  GH: 2.3,
  HG: 2.3,
}

export const SCORE_YYGGGG = getScore(['Y', 'Y', 'G', 'G', 'G', 'G'])
export const SCORE_YYYGGG = getScore(['Y', 'Y', 'Y', 'G', 'G', 'G'])
export const SCORE_YYGGGH = getScore(['Y', 'Y', 'Y', 'G', 'G', 'H'])

export function getScore(clone: string[]) {
  return clone.reduce((score, gene) => {
    const valueScore = (value as any)[gene]
    score += valueScore ? valueScore : 0
    return score
  }, 0)
}

export function evaluate(clone: string[], bestScore: number) {
  const key = clone.join('') + bestScore
  if (evaluate.cache[key]) {
    return evaluate.cache[key]
  }

  return Math.abs(bestScore - getScore(clone))
}
evaluate.cache = {} as Cache<number>
