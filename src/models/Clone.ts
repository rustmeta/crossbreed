export interface Clone {
  id: string
  genes: Gene[]
  selected?: boolean
  selectedAmount?: number
  favorite?: boolean
}

export type Gene = 'W' | 'X' | 'Y' | 'G' | 'H' | ''

export const emptyClone = (): Gene[] => ['', '', '', '', '', '']
