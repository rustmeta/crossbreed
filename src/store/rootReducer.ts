import { combineReducers } from 'redux'
import { RootState } from './state'
import { clonesReducer } from './clones/reducer'
import { pagesReducer } from './pages/reducer'

export const rootReducer = combineReducers<RootState>({
  clones: clonesReducer,
  pages: pagesReducer,
})
