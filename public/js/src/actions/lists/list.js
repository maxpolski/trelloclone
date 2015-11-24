import { CALL_API } from 'redux-api-middleware';

export const REQUEST_STARTED  = 'REQUEST_STARTED';
export const REQUEST_FAILED   = 'REQUEST_FAILED';
export const ADD_NEW_LIST     = 'ADD_NEW_LIST';
export const DELETE_LIST      = 'DELETE_LIST';
export const EDIT_LIST        = 'EDIT_LIST';
export const SYNC_LISTS_ORDER = 'SYNC_LISTS_ORDER';

export function addNewList(id, name) {
  return {[CALL_API]: {
      endpoint: '/addlist',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'id=' + id + '&name=' + name,
      types: [
        REQUEST_STARTED,
        ADD_NEW_LIST,
        REQUEST_FAILED
      ]
    }
  }
}

export function deleteList(boardId, listId) {
  return {[CALL_API]: {
      endpoint: '/deletelist',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'boardId=' + boardId + '&listId=' + listId,
      types: [
        REQUEST_STARTED,
        DELETE_LIST,
        REQUEST_FAILED
      ]
    }
  }
}

export function editList(boardId, listId, newTitle) {
  return {[CALL_API]: {
      endpoint: '/editlist',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'boardId=' + boardId + '&listId=' + listId + '&newTitle=' + newTitle,
      types: [
        REQUEST_STARTED,
        EDIT_LIST,
        REQUEST_FAILED
      ]
    }
  }
}

export function syncListsOrder(lists) {
  lists = JSON.stringify(lists);
  return {[CALL_API]: {
      endpoint: '/synclists',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: lists,
      types: [
        REQUEST_STARTED,
        SYNC_LISTS_ORDER,
        REQUEST_FAILED
      ]
    }
  }
}
