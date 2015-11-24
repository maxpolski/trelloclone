import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import user from './reducers/user/user';
import boards from './reducers/boards/boards';
import app from './reducers/app/app';
import quickSearch from './reducers/search/quickSearch';

const appReducer = combineReducers({
  app,
  user,
  boards,
  router,
  quickSearch
});

export default appReducer;
