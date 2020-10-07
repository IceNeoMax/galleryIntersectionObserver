import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import Gallery from '../components/Gallery';
import { search } from '../actions/gallery';

jest.useRealTimers();

const initialState = {
  gallery: {
    images: [],
    favImages: [],
    loading: false,
    total: 0,
    loadmore: false,
  },
};

const middlewares = [createSagaMiddleware()];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

test('renders Gallery without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Gallery />
    </Provider>,
    div,
  );
});

test('should dispatch right action', () => {
  store.dispatch(
    search({
      api_key: process.env.REACT_APP_API_KEY,
      limit: 8,
      offset: 0,
      q: '',
      rating: 'G',
      lang: 'en',
    }),
  );

  const actions = store.getActions();
  const expectedPayload = { type: 'SEARCH' };
  expect(actions).toMatchObject([expectedPayload]);
});

