import { Store, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'
import { RootState } from './state'
import { loadState, saveState } from './persist'
import throttle from 'lodash/throttle'

export function configureStore(): Store<RootState> {
  let middleware = applyMiddleware()

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware)
  }

  const persistedState = loadState()

  const store = createStore(
    rootReducer as any,
    persistedState as any,
    middleware
  ) as Store<RootState>

  //   if ((module as any).hot) {
  //     ;(module as any).hot.accept('app/reducers', () => {
  //       const nextReducer = require('app/reducers')
  //       store.replaceReducer(nextReducer)
  //     })
  //   }

  store.subscribe(
    throttle(() => {
      saveState(store.getState())
    }, 1000)
  )

  return store
}
