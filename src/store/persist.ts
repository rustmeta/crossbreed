import { RootState } from './state'
import { LOCALSTORAGE_KEY } from '../constants/storage'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCALSTORAGE_KEY)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(LOCALSTORAGE_KEY, serializedState)
    console.info('state saved')
  } catch {
    // ignore write errors
  }
}
