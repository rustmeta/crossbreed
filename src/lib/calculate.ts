import { bwPowerSet } from './math'

interface Cache {
  [key: string]: any
}

type Gene = 'W' | 'X' | 'Y' | 'G' | 'H'

export function calculateBest(crops: string[], useCache = true) {
  let max_crop_parents: string[] = []
  let max_crop_value = -7
  let max_crop = ''
  let min_crop_parents_length = undefined

  for (const parents of bwPowerSet(crops, 8)) {
    let crop = crossbreed(parents)
    let value = evaluateCrop(crop, useCache)

    if (
      value > max_crop_value ||
      (min_crop_parents_length !== undefined &&
        value === max_crop_value &&
        parents.length < min_crop_parents_length)
    ) {
      max_crop_value = value
      max_crop_parents = parents
      max_crop = crop
      min_crop_parents_length = parents.length
    }
  }

  if (min_crop_parents_length !== undefined && max_crop_parents.length > 1) {
    return {
      clones: max_crop_parents,
      result: max_crop,
    }
  }

  return null
}

export function evaluateCrop(crop: string, use_cache = true) {
  let y_priority = 0.6
  let g_priority = 0.6
  let h_priority = 0

  let key = crop + 'Y' + y_priority + 'G' + g_priority + 'H' + h_priority
  if (use_cache && evaluateCrop.cache[key] != null) {
    return evaluateCrop.cache[key]
  }

  let value = 0

  for (let i = 0; i < 6; i++) {
    switch (crop.charAt(i)) {
      case 'W':
      case 'X':
        value -= 1
        break
      case 'Y':
        value += y_priority
        break
      case 'G':
        value += g_priority
        break
      case 'H':
        value += h_priority
        break
      case '?':
        value += 0
        break
    }
  }
  evaluateCrop.cache[key] = value
  return value
}
evaluateCrop.cache = {} as Cache

function crossbreed(parents: any) {
  // Use caching to speed up the function
  let key = parents.join('')
  if (crossbreed.cache[key] != null) {
    return crossbreed.cache[key]
  }

  let child = ''
  // For each of the 6 genes
  for (let i = 0; i < 6; i++) {
    let gene_table = {
      W: 0,
      X: 0,
      Y: 0,
      G: 0,
      H: 0,
    }

    // Add up all the parent genes at i-th gene
    parents.forEach((parent: any) => {
      let c = parent.charAt(i) as Gene
      gene_table[c] += c === 'X' || c === 'W' ? 1 : 0.6
    })

    // Find the dominant one
    let max_gene = '?'
    let max_crop_value = 0.6

    ;(Object.keys(gene_table) as Gene[]).forEach((gene: Gene) => {
      // Set new dominant gene if it is stronger or if it is equal in strength and is randomly better
      if (
        gene_table[gene] > max_crop_value ||
        (gene_table[gene] === max_crop_value &&
          gene_table[gene] > 0.6 &&
          Math.random() < 0.5)
      ) {
        max_gene = gene
        max_crop_value = gene_table[gene]
      }
    })

    // Set it for the child
    child += max_gene
  }
  crossbreed.cache[key] = child
  return child
}
crossbreed.cache = {} as Cache
