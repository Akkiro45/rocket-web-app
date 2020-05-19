import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import loadingReducer from '../store/reducers/loading';
import errorReducer from '../store/reducers/error';
import authReducer from '../store/reducers/auth';
import linkReducer from './reducers/link';

const rootReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  auth: authReducer,
  link: linkReducer
});

let composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const configStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configStore;