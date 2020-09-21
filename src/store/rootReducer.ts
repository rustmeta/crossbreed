import { combineReducers } from 'redux'
import { RootState } from './state'
import { clonesReducer } from './clones/reducer'

export const rootReducer = combineReducers<RootState>({
  clones: clonesReducer,
})
