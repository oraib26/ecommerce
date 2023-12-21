import React from 'react';
import './products.css'

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? 'star active' : 'star';
      stars.push(<span key={i} className={starClass}>&#9733;</span>);
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
