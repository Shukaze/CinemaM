import React from 'react';
import FlippingCardFront from './Info';
import './style.css';

const MovieColumn2 = ({ movie }) => {
  const { title, rate, genre, image, _id, trailerLink, movieLength } = movie;
 
  
  return (
    <div className='card-container'>     
      <div className='card-wrapper' id={_id} onClick={() => FlipCard(_id)}>
        <FlippingCardFront 
          movieLength={movieLength} 
          genre={genre}
          title={title}
        />
      </div>
    </div>
  );
}
const FlipCard = cardID => {
  const card = document.getElementById(`${cardID}`);
}
export default MovieColumn2;
