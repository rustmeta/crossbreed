import { calculateBest } from './calculate'

describe('calculate best', () => {
  it('calculates best simple', () => {
    const res = calculateBest(
      ['YGXWYG', 'GGYGWY', 'YWGYYY', 'GGGGGG', 'YYGWXG', 'YYGGWX'],
      false
    )
    expect(res).not.toBeNull()
    if (!res) {
      return
    }

    const { result, clones } = res
    expect(result).toBe('YGGGYG')
    expect(clones).toEqual(['YGXWYG', 'GGYGWY', 'YWGYYY', 'GGGGGG'])
  })
})
