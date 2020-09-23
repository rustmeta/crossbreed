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
  CHANGE_AMOUNT_CLONE,
} from './types'
import { Gene, Clone } from '../../models/Clone'
import { v4 as uuid } from 'uuid'
import { countSeeds } from '../../lib/crossbreed'
import { message } from 'antd'
import { RootState } from '../state'

const initialState: ClonesState = {
  inventory: [],
}

export const clonesReducer = (
  state = initialState,
  action: CloneActionType
): ClonesState => {
  switch (action.type) {
    case ADD_CLONE:
      if (!checkCount(state)) {
        return state
      }

      return {
        inventory: [...state.inventory, createClone(action.payload.genes)],
      }

    case DELETE_CLONE:
      return {
        inventory: state.inventory.filter((c) => c.id !== action.payload.id),
      }

    case SELECT_CLONE:
      if (!checkCount(state)) {
        return state
      }

      return {
        inventory: state.inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.selected = true
            c.selectedAmount = 1
          }
          return c
        }),
      }

    case DESELECT_CLONE:
      return {
        inventory: state.inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.selected = false
            c.selectedAmount = 1
          }
          return c
        }),
      }

    case SELECT_ALL_CLONEs:
      if (!checkCount(state)) {
        return state
      }

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
          c.selectedAmount = 1
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

    case CHANGE_AMOUNT_CLONE:
      if (!checkCount(state)) {
        return state
      }

      return {
        inventory: state.inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.selectedAmount =
              action.payload.amount > 0 ? action.payload.amount : 1
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

function checkCount(state: ClonesState) {
  const clones = state.inventory.filter((c) => c.selected)
  const count = countSeeds(clones)

  if (count >= 8) {
    message.error('You can only fit 8 + 1 seed in a large planter box')
    return false
  }

  return true
}
