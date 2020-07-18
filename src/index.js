import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { BrowserRouter } from 'react-router-dom'

export const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
