export function* bwPowerSet(originalSet: any, maxDepth = -1) {
  if (maxDepth === -1) maxDepth = originalSet.length
  const numberOfCombinations = 2 ** originalSet.length
  for (
    let combinationIndex = 0;
    combinationIndex < numberOfCombinations;
    combinationIndex += 1
  ) {
    const subSet = []

    let depth = 0
    let depth_c = combinationIndex
    while (depth_c !== 0) {
      depth_c = depth_c & (depth_c - 1)
      depth++
      if (depth > maxDepth) break
    }

    if (depth <= maxDepth) {
      for (
        let setElementIndex = 0;
        setElementIndex < originalSet.length;
        setElementIndex += 1
      ) {
        if (combinationIndex & (1 << setElementIndex)) {
          subSet.push(originalSet[setElementIndex])
        }
      }

      yield subSet
    }
  }

  return
}
