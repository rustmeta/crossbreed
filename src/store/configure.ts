import { Store, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'
import { RootState } from './state'

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware()

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware)
  }

  const store = createStore(
    rootReducer as any,
    initialState as any,
    middleware
  ) as Store<RootState>

  //   if ((module as any).hot) {
  //     ;(module as any).hot.accept('app/reducers', () => {
  //       const nextReducer = require('app/reducers')
  //       store.replaceReducer(nextReducer)
  //     })
  //   }

  return store
}
