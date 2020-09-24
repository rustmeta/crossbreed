import { evaluate, getScore } from './evaluate'

describe('evaluation', () => {
  it('getScore', () => {
    expect(getScore(['Y', 'Y', 'Y', 'G', 'G', 'G'])).toBe(33)
    expect(getScore(['Y', 'X', 'Y', 'H', 'W', 'G'])).toBe(12)
  })

  it('evaluation', () => {
    const bestScore = getScore(['Y', 'Y', 'G', 'G', 'G', 'G'])

    const s1 = evaluate(['Y', 'Y', 'Y', 'G', 'G', 'G'], bestScore)
    const s2 = evaluate(['W', 'Y', 'Y', 'G', 'G', 'G'], bestScore)

    expect(s1).toBeLessThan(s2)
  })

  it('evaluate best gene', () => {
    const bestScore = getScore(['Y', 'Y', 'Y', 'G', 'G', 'G'])
    expect(evaluate(['Y', 'G', 'Y', 'G', 'Y', 'G'], bestScore)).toBe(0)
  })

  it('evaluates near perfect', () => {
    const bestScore = getScore(['Y', 'Y', 'G', 'G', 'G', 'G'])
    const s1 = evaluate(['Y', 'G', 'Y', 'G', 'Y', 'G'], bestScore)
    const s2 = evaluate(['Y', 'G', 'Y', 'G', 'Y', 'H'], bestScore)

    expect(s1).not.toBe(0)
    expect(s1).toBeLessThan(s2)
  })

  it('evaluates from 50/50 method', () => {
    const bestScore = getScore(['Y', 'Y', 'G', 'G', 'G', 'G'])
    const s1 = evaluate(['YG', 'G', 'GY', 'G', 'Y', 'G'], bestScore)
    expect(s1).toBe(3)
  })
})
