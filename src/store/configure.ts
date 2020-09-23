import { Store, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'
import { RootState } from './state'
import { loadState, saveState } from './persist'
import throttle from 'lodash/throttle'
import thunk from 'redux-thunk'
import { pageMiddleware } from './middlewares/page'

export function configureStore(): Store<RootState> {
  let middleware = applyMiddleware(thunk, pageMiddleware)

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware)
  }

  const persistedState = loadState()

  const store = createStore(
    rootReducer as any,
    persistedState as any,
    middleware
  ) as Store<RootState>

  store.subscribe(
    throttle(() => {
      saveState(store.getState())
    }, 1000)
  )

  return store
}
