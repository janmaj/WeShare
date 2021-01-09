import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import {Provider} from 'react-redux'
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
