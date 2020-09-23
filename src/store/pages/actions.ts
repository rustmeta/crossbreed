import { PageIcon } from '../../models/Page'
import { v4 as uuid } from 'uuid'
import {
  ADD_PAGE,
  CHANGE_PAGE,
  DELETE_PAGE,
  EDIT_PAGE,
  PageActionType,
} from './types'

export function addPage(title?: string, icon?: PageIcon): PageActionType {
  return {
    type: ADD_PAGE,
    payload: {
      id: uuid(),
      title,
      icon,
    } as any,
  }
}

export function deletePage(id: string) {
  return {
    type: DELETE_PAGE,
    payload: {
      id,
    },
  }
}

interface EditParams {
  title?: string
  icon?: PageIcon
}

export function editPage(id: string, params: EditParams): PageActionType {
  return {
    type: EDIT_PAGE,
    payload: {
      id,
      ...params,
    },
  }
}

export function changePage(id: string): PageActionType {
  return {
    type: CHANGE_PAGE,
    payload: {
      id,
    },
  }
}
