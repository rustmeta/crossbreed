import {
  ADD_CLONE,
  CloneActionType,
  DELETE_CLONE,
  SELECT_CLONE,
  DESELECT_CLONE,
  STAR_CLONE,
  UNSTAR_CLONE,
} from './types'
import { Gene } from '../../models/Clone'

export function addClone(genes: Gene[]): CloneActionType {
  return {
    type: ADD_CLONE,
    payload: {
      genes,
    },
  }
}

export function deleteClone(id: string): CloneActionType {
  return {
    type: DELETE_CLONE,
    payload: {
      id,
    },
  }
}

export function selectClone(id: string): CloneActionType {
  return {
    type: SELECT_CLONE,
    payload: {
      id,
    },
  }
}

export function deselectClone(id: string): CloneActionType {
  return {
    type: DESELECT_CLONE,
    payload: {
      id,
    },
  }
}

export function starClone(id: string): CloneActionType {
  return {
    type: STAR_CLONE,
    payload: {
      id,
    },
  }
}

export function unstarClone(id: string): CloneActionType {
  return {
    type: UNSTAR_CLONE,
    payload: {
      id,
    },
  }
}
