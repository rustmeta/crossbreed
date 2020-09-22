import { ClonesState } from './state'
import {
  CloneActionType,
  ADD_CLONE,
  DELETE_CLONE,
  SELECT_CLONE,
  DESELECT_CLONE,
  STAR_CLONE,
  UNSTAR_CLONE,
  SELECT_ALL_CLONEs,
  DESELECT_ALL_CLONEs,
} from './types'
import { Gene, Clone } from '../../models/Clone'
import { v4 as uuid } from 'uuid'

const initialState: ClonesState = {
  inventory: [],
}

export const clonesReducer = (
  state = initialState,
  action: CloneActionType
): ClonesState => {
  switch (action.type) {
    case ADD_CLONE:
      return {
        inventory: [...state.inventory, createClone(action.payload.genes)],
      }

    case DELETE_CLONE:
      return {
        inventory: state.inventory.filter((c) => c.id !== action.payload.id),
      }

    case SELECT_CLONE:
      return {
        inventory: state.inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.selected = true
          }
          return c
        }),
      }

    case DESELECT_CLONE:
      return {
        inventory: state.inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.selected = false
          }
          return c
        }),
      }

    case SELECT_ALL_CLONEs:
      return {
        inventory: state.inventory.map((c) => {
          c.selected = true
          return c
        }),
      }

    case DESELECT_ALL_CLONEs:
      return {
        inventory: state.inventory.map((c) => {
          c.selected = false
          return c
        }),
      }

    case STAR_CLONE:
      return {
        inventory: state.inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.favorite = true
          }
          return c
        }),
      }

    case UNSTAR_CLONE:
      return {
        inventory: state.inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.favorite = false
          }
          return c
        }),
      }

    default:
      return state
  }
}

function createClone(genes: Gene[]): Clone {
  return {
    id: uuid(),
    genes,
  }
}
