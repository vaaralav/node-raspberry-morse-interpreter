import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { merge } from 'lodash';
import { getStoredState, createPersistor } from 'redux-persist';

import { Root } from 'containers';
import rootSaga from 'modules/rootSaga';
import getRoutes from './routes';
import { history } from './services';
import configureStore from './store/configureStore';

async function renderClient() {
  const persistConfig = {
    whitelist: ['entities']
  };

  // window.__data = initial state passed down by server to client
  let initialState = window.__data; // eslint-disable-line
  try {
    const restoredState = await getStoredState(persistConfig);
    initialState = merge({}, initialState, restoredState);
  } catch (error) {
    console.log('error restoring state:', error);
  }

  const dest = document.getElementById('content');
  const store = configureStore(history, initialState);
  const persistor = createPersistor(store, persistConfig); // eslint-disable-line

  store.runSaga(rootSaga);

  render(
    <Root store={store} history={history} routes={getRoutes(store)} />,
    dest
  );

  if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger
  }
}

renderClient();
