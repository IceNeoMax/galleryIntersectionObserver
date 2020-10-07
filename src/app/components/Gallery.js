/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { debounce } from 'lodash-es';
import { search, addMore } from '../reducers/gallerySlice';
import ImageList from './ImageList';

const API_KEY = process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_KEY : process.env.API_KEY;

export const searchParams = {
  api_key: API_KEY,
  limit: 12,
  offset: 0,
  q: '',
  rating: 'G',
  lang: 'en'
}

const Gallery = props => {
  //get state from store
  const { images, favImages } = useSelector(state => state.gallery)
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);
  // TODO: useState for limit if required later
  const [limit] = useState(12);
  const [activeTab, setActiveTab] = useState(0);
  const [q, setQuery] = useState('');

  const changeSearch = debounce((q) => {
    offset !==0 && setOffset(0)
    q && setQuery(q)
    let searchTerm = {...searchParams, ...{ q, limit:24, offset: 0 }}
    dispatch(search(searchTerm))
  }, 500);

  const onChangeSearch = (e) => {
    changeSearch(e.target.value)
  }
  useEffect(() => {
    offset > 0 && dispatch(addMore({...searchParams, ...{ q, offset: (offset * limit) + 24 }}))
  }, [offset])

  const fetchMore = () => {
    setOffset(offset + 1);
  };

  return (
    <div>
      <div className="header">
        Galler<span className="header-black">easy | </span>
        <span className={activeTab === 0 ? 'active' : ''} onClick={() => setActiveTab(0)}>
          Search
        </span>
        <span
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => setActiveTab(1)}
        >
          Favourites {favImages.length ? `(${favImages.length})` : '(0)'}
        </span>
      </div>
      {activeTab === 0 ? <>
        <div className="center-flex">
          <TextField
            label="Start searching for images!"
            onChange={onChangeSearch}
            defaultValue={q}
            className="percent-width-60"
          />
        </div>
        <ImageList fetchMore={fetchMore} imagesList={images} />
      </> :
        <ImageList imagesList={favImages} />
      }
    </div>
  )
}

export default Gallery;
