import { createSlice, createAction } from '@reduxjs/toolkit'

const initialState = {
    images: [],
    favImages: [],
    loading: false,
    total: 0,
    loadmore: false
  }
const search = createAction("gallerySlice_search");
const addMore = createAction("gallerySlice_add_more");

const gallerySlice = createSlice({
  name: 'gallerySlice',
  initialState,
  reducers: {
    searchAsync(state, action) {
        const { images, total } = action.payload;
        state.images = images;
        state.total = total;
    },
    addFav(state, action){
      const index = state.images.findIndex(i => i.id === action.payload);
      state.favImages.unshift(state.images[index])
    },
    removeFav(state, action){
      state.favImages = state.favImages.filter(f => f.id !== action.payload);
    },
    addMoreAsync(state, action) {
      const { images } = action.payload;
      state.images = [...state.images, ...images]
    },
    stopLoading(state) {
        state.loading = false
    },
    loading(state) {
        state.loading = true
    },
    stopLoadmore(state) {
        state.loadmore = false
    },
    loadmore(state) {
        state.loadmore = true
    },
  },
});

const { actions, reducer } = gallerySlice;
export { actions, reducer, search, addMore }