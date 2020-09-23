import { ClonesState } from './clones/state'
import { PagesState } from './pages/state'

export interface RootState {
  clones: ClonesState
  pages: PagesState
}
