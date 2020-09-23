import { Clone, Gene } from '../../models/Clone'

export type ClonesState = {
  inventory: Clone[]
  filter: Gene[]
}
