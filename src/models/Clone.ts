export interface Clone {
  id: string
  genes: Gene[]
  selected?: boolean
}

export type Gene = 'W' | 'X' | 'Y' | 'G' | 'H'
