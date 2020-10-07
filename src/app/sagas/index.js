import { all, fork } from 'redux-saga/effects';
import gallery from './gallery';

const rootSaga = function* rootGenerator() {
  yield all([fork(gallery)]);
};

export default rootSaga;