import { CALL_API } from 'redux-api-middleware';

export const SEARCH_REQUEST_STARTED = 'SEARCH_REQUEST_STARTED';
export const SEARCH_REQUEST_FAILED  = 'SEARCH_REQUEST_FAILED';
export const SEARCHING_DONE  = 'SEARCHING_DONE';

export function searchHandle(query) {
  return {[CALL_API]: {
      endpoint: '/search',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'query=' + query,
      types: [
        SEARCH_REQUEST_STARTED,
        SEARCHING_DONE,
        SEARCH_REQUEST_FAILED
      ]
    }
  }
}
