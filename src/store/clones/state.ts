import { Clone, Gene } from '../../models/Clone'

export type ClonesState = {
  pages: {
    [key: string]: {
      inventory: Clone[]
      filter: Gene[]
    }
  }
}
