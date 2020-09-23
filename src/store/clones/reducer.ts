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
  SET_FILTER,
} from './types'
import { Gene, Clone, emptyClone } from '../../models/Clone'
import { v4 as uuid } from 'uuid'
import { countSeeds } from '../../lib/crossbreed'
import { message } from 'antd'
import { initialId } from '../pages/reducer'
import { ActivePageAction } from '../types'
import { ADD_PAGE, DELETE_PAGE, PageActionType } from '../pages/types'

const initialState: ClonesState = {
  pages: {
    [initialId]: emptyState(),
  },
}

export const clonesReducer = (
  state = initialState,
  action:
    | (CloneActionType & ActivePageAction)
    | (PageActionType & ActivePageAction)
): ClonesState => {
  const page = action.activePage
  const inventory = page ? state.pages[page].inventory : []

  function assign(mod: any) {
    const newActive = Object.assign({}, state.pages[page], mod)

    return Object.assign(
      {},
      {
        pages: {
          ...state.pages,
          [page]: newActive,
        },
      }
    )
  }

  function checkCount() {
    const clones = inventory.filter((c) => c.selected)
    const count = countSeeds(clones)

    if (count >= 8) {
      message.error('You can only fit 8 + 1 seed in a large planter box')
      return false
    }

    return true
  }

  switch (action.type) {
    case ADD_CLONE:
      if (!checkCount()) {
        return state
      }

      return assign({
        inventory: [...inventory, createClone(action.payload.genes)],
      })

    case DELETE_CLONE:
      return assign({
        inventory: inventory.filter((c) => c.id !== action.payload.id),
      })

    case SELECT_CLONE:
      if (!checkCount()) {
        return state
      }

      return assign({
        inventory: inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.selected = true
            c.selectedAmount = 1
          }
          return c
        }),
      })

    case DESELECT_CLONE:
      return assign({
        inventory: inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.selected = false
            c.selectedAmount = 1
          }
          return c
        }),
      })

    case SELECT_ALL_CLONEs:
      if (!checkCount()) {
        return state
      }

      return assign({
        inventory: inventory.map((c) => {
          c.selected = true
          return c
        }),
      })

    case DESELECT_ALL_CLONEs:
      return assign({
        inventory: inventory.map((c) => {
          c.selected = false
          c.selectedAmount = 1
          return c
        }),
      })

    case STAR_CLONE:
      return assign({
        inventory: inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.favorite = true
          }
          return c
        }),
      })

    case UNSTAR_CLONE:
      return assign({
        inventory: inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.favorite = false
          }
          return c
        }),
      })

    case CHANGE_AMOUNT_CLONE:
      const clone = inventory.find((c) => c.id === action.payload.id)
      const currentAmount =
        clone && clone.selectedAmount ? clone.selectedAmount : 0

      if (action.payload.amount >= currentAmount && !checkCount()) {
        return state
      }

      return assign({
        inventory: inventory.map((c) => {
          if (c.id === action.payload.id) {
            c.selectedAmount =
              action.payload.amount > 0 ? action.payload.amount : 1
          }

          return c
        }),
      })

    case SET_FILTER:
      return assign({
        filter: action.payload.filter,
      })

    case ADD_PAGE:
      return Object.assign({}, state, {
        pages: {
          ...state.pages,
          [action.payload.id]: emptyState(),
        },
      })

    case DELETE_PAGE:
      const newPages = {
        ...state.pages,
      }

      delete newPages[action.payload.id]

      return Object.assign({}, state, {
        pages: newPages,
      })

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

function emptyState() {
  return {
    inventory: [],
    filter: emptyClone(),
  }
}
