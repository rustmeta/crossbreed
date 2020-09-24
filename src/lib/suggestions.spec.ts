import { Gene } from '../models/Clone'
import { SCORE_YYGGGG } from './evaluate'
import { suggest } from './suggestions'

describe('suggestions', () => {
  it('suggests simple', () => {
    const myClones: Gene[][] = [
      ['Y', 'H', 'Y', 'G', 'G', 'G'],
      ['X', 'G', 'Y', 'Y', 'W', 'G'],
      ['W', 'G', 'H', 'H', 'Y', 'H'],
      ['Y', 'X', 'Y', 'G', 'G', 'X'],
    ] // Y G Y G G G

    const res = suggest(myClones, SCORE_YYGGGG)

    expect(res).toHaveLength(1)

    expect(res[0].clones).toEqual(myClones.slice())
    expect(res[0].result).toEqual(['Y', 'G', 'Y', 'G', 'G', 'G'])
  })

  it('suggests simple bigger', () => {
    const best: Gene[][] = [
      ['Y', 'H', 'Y', 'G', 'G', 'G'],
      ['X', 'G', 'Y', 'Y', 'W', 'G'],
      ['W', 'G', 'H', 'H', 'Y', 'H'],
      ['Y', 'X', 'Y', 'G', 'G', 'X'],
    ] // Y G Y G G G

    const myClones: Gene[][] = [
      ...best,
      ['X', 'Y', 'X', 'X', 'X', 'X'],
      ['Y', 'Y', 'X', 'X', 'W', 'X'],
      ['X', 'Y', 'X', 'G', 'X', 'W'],
    ]

    const res = suggest(myClones, SCORE_YYGGGG)

    expect(res).toHaveLength(1)

    expect(res[0].clones).toEqual(best.slice())
    expect(res[0].result).toEqual(['Y', 'G', 'Y', 'G', 'G', 'G'])
  })

  // it('suggests multiple', () => {
  //   const myClones: Gene[][] = [
  //     ['Y', 'H', 'Y', 'G', 'G', 'G'],
  //     ['X', 'G', 'Y', 'Y', 'W', 'G'],
  //     ['W', 'G', 'H', 'H', 'Y', 'H'],
  //     ['Y', 'X', 'Y', 'G', 'G', 'X'],
  //     ['Y', 'G', 'H', 'H', 'G', 'G'],
  //     ['X', 'Y', 'X', 'X', 'X', 'X'],
  //     ['Y', 'Y', 'X', 'X', 'W', 'X'],
  //     ['X', 'Y', 'X', 'W', 'X', 'W'],
  //   ]

  //   const res = suggest(myClones, SCORE_YYGGGG)

  //   expect(res).toHaveLength(1)
  // })

  // it('suggests different order', () => {
  //   const myClones: Gene[][] = [
  //     ['Y', 'H', 'Y', 'G', 'G', 'G'],
  //     ['X', 'G', 'Y', 'Y', 'W', 'G'],
  //     ['W', 'G', 'H', 'H', 'Y', 'H'],
  //     ['Y', 'X', 'Y', 'G', 'G', 'X'],
  //     ['X', 'Y', 'X', 'X', 'X', 'X'],
  //     ['Y', 'Y', 'X', 'X', 'W', 'X'],
  //     ['X', 'Y', 'X', 'W', 'X', 'W'],

  //     ['Y', 'H', 'G', 'G', 'G', 'G'],
  //     ['X', 'Y', 'G', 'Y', 'W', 'G'],
  //     ['W', 'Y', 'H', 'H', 'Y', 'H'],
  //     ['Y', 'X', 'G', 'G', 'G', 'X'],
  //   ]

  //   const res = suggest(myClones, SCORE_YYGGGG)
  //   const set = new Set<string>()

  //   for (let r of res) {
  //     set.add(r.result.join(''))
  //   }

  //   expect(set.size).toBe(1)
  //   const setArr = Array.from(set)
  //   expect(setArr[0]).toBe('YGYGGG')
  // })
})
