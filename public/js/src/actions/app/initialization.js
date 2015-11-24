import { CALL_API } from 'redux-api-middleware';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FAILED  = 'REQUEST_FAILED';
export const APP_INITIALIZED = 'APP_INITIALIZED';

export function initialize() {
  return {[CALL_API]: {
      endpoint: '/getinitialdata',
      method: 'GET',
      credentials: 'same-origin',
      headers: {
       "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      types: [
        REQUEST_STARTED,
        APP_INITIALIZED,
        REQUEST_FAILED
      ]
    }
  }
}
