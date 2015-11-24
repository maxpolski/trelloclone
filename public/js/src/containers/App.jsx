import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { reduxReactRouter,
         routerStateReducer,
         ReduxRouter
       } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { devTools, persistState } from 'redux-devtools';

import Layout from './app/Layout';
import BoardsListView from './app/layout/workspace/boards/boardsListView';
import BoardView from './app/layout/workspace/boards/boardView';

import appReducer from '../reducers';

const store = compose(
  applyMiddleware(apiMiddleware),
  reduxReactRouter({
    createHistory
  }),
  devTools()
)(createStore)(appReducer);

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/" component={Layout}>
              <Route path="/boardslist" component={BoardsListView} />
              <Route path="/board/" component={BoardView} />
              <Route path="/board/:id" component={BoardView} />
            </Route>
          </ReduxRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
