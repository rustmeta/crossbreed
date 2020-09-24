import { Gene } from '../models/Clone'
import { bwPowerSet } from './math'
import { crossbreed } from './crossbreed'
import { evaluate } from './evaluate'

interface Suggestion {
  clones: Gene[][]
  result: string[]
}

export function suggest(clones: Gene[][], bestScore: number): Suggestion[] {
  let bestClones = [] as Gene[][][]
  let bestResults = [] as string[][]
  let closestScore = -1

  const add = (parents: Gene[][], result: string[]) => {
    bestClones.push(parents)
    bestResults.push(result)
  }

  for (const parents of bwPowerSet(clones, 8, 2)) {
    let crossed = crossbreed(parents)
    let value = evaluate(crossed, bestScore)

    if (value < closestScore) {
      // better
      closestScore = value
      bestClones = [parents]
      bestResults = [crossed]
    } else if (closestScore === -1) {
      // first
      closestScore = value
      add(parents, crossed)
    } else if (value === closestScore) {
      // same score
      add(parents, crossed)
    }
  }

  return bestClones.map((clones, i) => ({
    clones,
    result: bestResults[i],
  }))
}
