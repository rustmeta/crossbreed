import { Gene } from '../../models/Clone'

export const ADD_CLONE = 'ADD_CLONE'
export const DELETE_CLONE = 'DELETE_CLONE'
export const SELECT_CLONE = 'SELECT_CLONE'
export const SELECT_ALL_CLONEs = 'SELECT_ALL_CLONEs'
export const DESELECT_ALL_CLONEs = 'DESELECT_ALL_CLONEs'
export const DESELECT_CLONE = 'DESELECT_CLONE'
export const STAR_CLONE = 'STAR_CLONE'
export const UNSTAR_CLONE = 'UNSTAR_CLONE'
export const CHANGE_AMOUNT_CLONE = 'CHANGE_AMOUNT_CLONE'
export const SET_FILTER = 'SET_FILTER'

interface AddCloneAction {
  type: typeof ADD_CLONE
  payload: {
    genes: Gene[]
  }
}

interface DeleteCloneAction {
  type: typeof DELETE_CLONE
  payload: {
    id: string
  }
}

interface SelectCloneAction {
  type: typeof SELECT_CLONE
  payload: {
    id: string
  }
}

interface SelectAllCloneAction {
  type: typeof SELECT_ALL_CLONEs
}

interface DeselectAllCloneAction {
  type: typeof DESELECT_ALL_CLONEs
}

interface DeSelectCloneAction {
  type: typeof DESELECT_CLONE
  payload: {
    id: string
  }
}

interface StarCloneAction {
  type: typeof STAR_CLONE
  payload: {
    id: string
  }
}

interface UnstarCloneAction {
  type: typeof UNSTAR_CLONE
  payload: {
    id: string
  }
}

interface ChangeAmountCloneAction {
  type: typeof CHANGE_AMOUNT_CLONE
  payload: {
    id: string
    amount: number
  }
}

interface SetFilterAction {
  type: typeof SET_FILTER
  payload: {
    filter: Gene[]
  }
}

export type CloneActionType =
  | AddCloneAction
  | DeleteCloneAction
  | SelectCloneAction
  | DeSelectCloneAction
  | StarCloneAction
  | UnstarCloneAction
  | SelectAllCloneAction
  | DeselectAllCloneAction
  | ChangeAmountCloneAction
  | SetFilterAction
