import React, {useRef, useEffect} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { actions } from '../reducers/gallerySlice';
import SkeletonLoading from './skeleton';

const { addFav, removeFav } = actions;
const option = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5
}

const ImageList = props => {
  const { imagesList, fetchMore } = props;
  //get state from store
  const { loading, favImages, loadmore, total } = useSelector(state => state.gallery)
  const dispatch = useDispatch();
  //

  const ref = useRef();

  useEffect(() => {
    if(!fetchMore) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchMore();
      },
      option
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    }
  }, [fetchMore, ref]);
  
  const checkFavImage = (id) => {
    if (id) {
      const favIndex = favImages.findIndex(i => i.id === id);
      return favIndex > -1 ? <FavoriteIcon className="favourite-icon" onClick={() => dispatch(removeFav(id))} />
        : <FavoriteIcon className="favourite-icon--disabled" onClick={() => dispatch(addFav(id))} />
    }
    return null;
  }

  return (
    <>
      {loading ? <div className="center-flex"><CircularProgress /></div> :
        imagesList && imagesList.length > 0 &&
        <>
          <div className="galleryContainer">
            {imagesList.map(image =>
              <div key={image.id} className="galleryContainer--items">
                <span className="galleryContainer--items-favorite">
                  {checkFavImage(image.id)}
                </span>
                <img src={image.images.original.url} alt={image.title} />
              </div>
            )}
          </div>
          {total > imagesList.length ?
            (fetchMore && loadmore ? <SkeletonLoading /> : <div style={{height:'50px'}} ref={ref}></div>)
            : null
          }
        </>
      }
    </>
  )
}
ImageList.propTypes = {
  imagesList: PropTypes.array,
  fetchMore: PropTypes.func,
};

export default ImageList
