import { PageIcon } from '../../models/Page'
export const ADD_PAGE = 'ADD_PAGE'
export const DELETE_PAGE = 'DELETE_PAGE'
export const EDIT_PAGE = 'EDIT_PAGE'
export const CHANGE_PAGE = 'CHANGE_PAGE'

interface AddPageAction {
  type: typeof ADD_PAGE
  payload: {
    id: string
    title: string
    icon: PageIcon
  }
}

interface DeletePageAction {
  type: typeof DELETE_PAGE
  payload: {
    id: string
  }
}

interface EditPageAction {
  type: typeof EDIT_PAGE
  payload: {
    id: string
    title?: string
    icon?: PageIcon
  }
}

interface ChangePageAction {
  type: typeof CHANGE_PAGE
  payload: {
    id: string
  }
}

export type PageActionType =
  | AddPageAction
  | DeletePageAction
  | EditPageAction
  | ChangePageAction
