import { PagesState } from './state'
import {
  ADD_PAGE,
  CHANGE_PAGE,
  DELETE_PAGE,
  EDIT_PAGE,
  PageActionType,
} from './types'
import { v4 as uuid } from 'uuid'

export let initialId = uuid()
const initialState = createInitialState()

export const pagesReducer = (
  state = initialState,
  action: PageActionType
): PagesState => {
  switch (action.type) {
    case ADD_PAGE:
      return Object.assign({}, state, {
        activePage: action.payload.id,
        pages: [
          ...state.pages,
          {
            ...action.payload,
          },
        ],
      })

    case DELETE_PAGE:
      let newPages = state.pages.filter(({ id }) => id !== action.payload.id)
      if (newPages.length === 0) {
        return createInitialState()
      }

      return Object.assign({}, state, {
        pages: newPages,
        activePage: newPages[0].id,
      })

    case EDIT_PAGE:
      return Object.assign({}, state, {
        pages: state.pages.map((p) => {
          if (p.id === action.payload.id) {
            if (action.payload.title) {
              p.title = action.payload.title
            }

            if (action.payload.icon) {
              p.icon = action.payload.icon
            }
          }

          return p
        }),
      })

    case CHANGE_PAGE:
      return Object.assign({}, state, {
        activePage: action.payload.id,
      })

    default:
      return state
  }
}

function createInitialState() {
  return {
    pages: [
      {
        id: initialId,
      },
    ],
    activePage: initialId,
  } as PagesState
}
