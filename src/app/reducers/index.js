import { combineReducers } from 'redux';
import { reducer as gallery } from './gallerySlice';

const reducers = combineReducers({
	gallery
});

export default reducers;
