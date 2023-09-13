import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { RecoilRoot } from 'recoil';

import './index.css';
import './assets/scss/partials/custom.css';
import App from './routes';

function configureStore(initialState) {
  const middlewares = [thunkMiddleware];

  // Log only in development
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const enhancer = compose(applyMiddleware(...middlewares));
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

ReactDOM.render(
  <RecoilRoot>
    <Suspense fallback={true}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </RecoilRoot>,
  document.getElementById('root')
);

// Register service worker
registerServiceWorker();
