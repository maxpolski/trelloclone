import { SEARCH_REQUEST_STARTED,
         SEARCH_REQUEST_FAILED,
         SEARCHING_DONE
       } from '../../actions/search/quickSearch';

export default function quickSearch(state = {}, action) {
  switch (action.type) {
    case SEARCH_REQUEST_STARTED:
      console.log('started');
      let newState = Object.assign({}, state, {isQuerying: true});
      return newState;
    case SEARCHING_DONE:
      console.log('results', action.payload);
      newState = Object.assign( {},
                                state,
                                {
                                  isQuerying: false,
                                  results: action.payload.results
                                }
                              );
      return newState;
    case SEARCH_REQUEST_FAILED:
      console.log('failed');
      newState = Object.assign( {},
                                state,
                                {
                                  isQuerying: false,
                                  error: 'request failed'
                                }
                              );
      return newState;
    default:
      return state;
  }
}
