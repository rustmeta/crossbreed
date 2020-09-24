import { getHighest, crossbreed } from './crossbreed'

describe('generation', () => {
  it('gets highest from scoreobject', () => {
    expect(
      getHighest({
        Y: 2,
        G: 1,
        W: 1,
        X: 1,
        H: 0,
      })
    ).toBe('Y')

    expect(
      getHighest({
        Y: 1,
        G: 1,
        W: 1,
        X: 2,
        H: 0,
      })
    ).toBe('X')

    expect(
      getHighest({
        Y: 2,
        G: 1,
        W: 2,
        X: 1,
        H: 0,
      })
    ).toBe('YW')
  })

  it('calculates crossbreed', () => {
    expect(
      crossbreed([
        ['Y', 'H', 'H', 'G', 'G', 'Y'],
        ['H', 'X', 'X', 'G', 'Y', 'G'],
        ['G', 'Y', 'X', 'G', 'W', 'G'],
        ['Y', 'H', 'H', 'G', 'W', 'W'],
        //Y    H    X    G    W    G
      ])
    ).toEqual(['Y', 'H', 'X', 'G', 'W', 'G'])

    expect(
      crossbreed([
        ['Y', 'H', 'H', 'G', 'G', 'Y'],
        ['G', 'X', 'X', 'G', 'Y', 'G'],
        ['G', 'Y', 'X', 'G', 'W', 'G'],
        ['Y', 'H', 'H', 'G', 'W', 'W'],
        //YG   H    X    G    W    G
      ])
    ).toEqual(['YG', 'H', 'X', 'G', 'W', 'G'])

    expect(
      crossbreed([
        ['Y', 'H', 'H', 'G', 'G', 'Y'],
        ['H', 'X', 'X', 'G', 'Y', 'G'],
        ['G', 'Y', 'X', 'G', 'Y', 'G'],
        ['Y', 'H', 'H', 'G', 'W', 'W'],
        ['Y', 'H', 'H', 'G', 'W', 'W'],
        //Y    H    H    G    W    G
      ])
    ).toEqual(['Y', 'H', 'X', 'G', 'W', 'W'])
  })

  it('calculates 50/50', () => {
    expect(
      crossbreed([
        ['Y', 'Y', 'Y', 'G', 'G', 'G'],
        ['G', 'Y', 'Y', 'G', 'G', 'G'],
      ])
    ).toEqual(['YG', 'Y', 'Y', 'G', 'G', 'G'])
  })
})
