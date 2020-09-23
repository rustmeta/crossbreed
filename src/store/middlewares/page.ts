import { Middleware } from 'redux'
import { RootState } from '../state'

export const pageMiddleware: Middleware = (api) => (next) => (action) => {
  const activePage = (api.getState() as RootState).pages.activePage
  action.activePage = activePage

  return next(action)
}
