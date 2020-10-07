import React from 'react';
import '../style/skeleton.scss';

const SkeletonLoading = () => {
    return(
        <div className="skeletonContainer">
            {[...Array(12)].map((e, i) => <span key={i} className="skeleton-box" />)}
        </div>
    )
}

export default SkeletonLoading;