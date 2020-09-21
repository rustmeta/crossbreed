import { Gene } from '../../models/Clone'

export const ADD_CLONE = 'ADD_CLONE'
export const DELETE_CLONE = 'DELETE_CLONE'
export const SELECT_CLONE = 'SELECT_CLONE'
export const DESELECT_CLONE = 'DESELECT_CLONE'
export const STAR_CLONE = 'STAR_CLONE'
export const UNSTAR_CLONE = 'UNSTAR_CLONE'

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

export type CloneActionType =
  | AddCloneAction
  | DeleteCloneAction
  | SelectCloneAction
  | DeSelectCloneAction
  | StarCloneAction
  | UnstarCloneAction
