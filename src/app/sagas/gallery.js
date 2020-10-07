import { all, put, call, takeLatest, delay } from 'redux-saga/effects'
import {actions, search, addMore} from '../reducers/gallerySlice';
import { getImages } from '../services/api';
import { toast } from 'react-toastify';

export function* getSearchImages({ payload }) {
  yield put(actions.loading());
  let { data, errMess } = yield call(getImages, payload);
  yield put(actions.stopLoading());
  if (errMess) {
    toast.error(errMess);
  } else {
    yield put(
      actions.searchAsync({
        images: data.data || [],
        total: data.pagination.total_count || 0,
      }),
    );
  }
}

export function* fetchMoreImages({ payload }) {
  yield put(actions.loadmore());
  let { data, errMess } = yield call(getImages, payload);
  yield delay(500);
  yield put(actions.stopLoadmore());
  if (errMess) {
    toast.error(errMess);
  } else {
    yield put(
      actions.addMoreAsync({
        images: data.data || [],
        total: data.pagination.total_count || 0,
      }),
    );
  }
}

export default function* gallery() {
  yield takeLatest(search, getSearchImages),
  yield takeLatest(addMore, fetchMoreImages)
}