import {
  ADD_CLONE,
  CloneActionType,
  DELETE_CLONE,
  SELECT_CLONE,
  DESELECT_CLONE,
  STAR_CLONE,
  UNSTAR_CLONE,
  SELECT_ALL_CLONEs,
  DESELECT_ALL_CLONEs,
  CHANGE_AMOUNT_CLONE,
  SET_FILTER,
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

export function selectAllClones(): CloneActionType {
  return {
    type: SELECT_ALL_CLONEs,
  }
}

export function deselectAllClones(): CloneActionType {
  return {
    type: DESELECT_ALL_CLONEs,
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

export function changeAmountClone(id: string, amount: number): CloneActionType {
  return {
    type: CHANGE_AMOUNT_CLONE,
    payload: {
      id,
      amount,
    },
  }
}

export function setFilter(filter: Gene[]): CloneActionType {
  return {
    type: SET_FILTER,
    payload: {
      filter,
    },
  }
}
