import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';

import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { HashRouter, Route, Switch } from 'react-router-dom';

import { rootReducer } from './models';

import SignIn from './components/SignIn';
import Home from './components/home';
import RestaurantFinder from './components/RestaurantFinder';
import RestaurantReview from './components/RestaurantReview';
import AddReview from './components/AddReview';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/restaurantFinder' component={RestaurantFinder} />
        <Route exact path='/restaurantReview' component={RestaurantReview} />
        <Route exact path='/addReview/:name' component={AddReview} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('content')
);
