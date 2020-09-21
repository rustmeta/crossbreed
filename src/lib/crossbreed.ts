const weight = {
  Y: 0.6,
  H: 0.6,
  G: 0.6,

  W: 1,
  X: 1,
}

export function crossbreed(clones: string[][]) {
  let result: string[] = ['', '', '', '', '', '']

  for (let i = 0; i < 6; i++) {
    const score = newScore()

    for (let clone of clones) {
      const gene = clone[i].toUpperCase() as Gene
      score[gene] += weight[gene]
    }

    result[i] = getHighest(score)
  }

  return result
}

interface ScoreObject {
  Y: number
  H: number
  G: number
  W: number
  X: number
}

type Gene = 'Y' | 'G' | 'H' | 'W' | 'X'

const newScore = () =>
  ({
    Y: 0,
    H: 0,
    G: 0,
    W: 0,
    X: 0,
  } as ScoreObject)

export const getHighest = (score: ScoreObject) => {
  let highest = ''
  let highestScore = 0
  for (let gene in score) {
    const s = score[gene as Gene]
    if (s >= highestScore) {
      if (s > highestScore) {
        highest = gene
      } else {
        highest += gene
      }

      highestScore = s
    }
  }

  return highest
}
