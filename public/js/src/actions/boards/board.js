import { CALL_API } from 'redux-api-middleware';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FAILED  = 'REQUEST_FAILED';
export const ADD_NEW_BOARD   = 'ADD_NEW_BOARD';
export const EDIT_BOARD      = 'EDIT_BOARD';
export const DELETE_BOARD    = 'DELETE_BOARD';

export function addNewBoard(name) {
  return {[CALL_API]: {
      endpoint: '/addboard',
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'name=' + name,
      credentials: 'same-origin',
      types: [
        REQUEST_STARTED,
        ADD_NEW_BOARD,
        REQUEST_FAILED
      ]
    }
  }
}

export function editBoard(id, newName) {
  return {[CALL_API]: {
      endpoint: '/editboard',
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'id=' + id + '&name=' + newName,
      credentials: 'same-origin',
      types: [
        REQUEST_STARTED,
        EDIT_BOARD,
        REQUEST_FAILED
      ]
    }
  }
}

export function deleteBoard(id) {
  return {[CALL_API]: {
      endpoint: '/deleteboard',
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'id=' + id,
      credentials: 'same-origin',
      types: [
        REQUEST_STARTED,
        DELETE_BOARD,
        REQUEST_FAILED
      ]
    }
  }
}
