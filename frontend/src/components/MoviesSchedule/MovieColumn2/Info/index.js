import React from 'react';
import './style.css';

const CardFront = ({ title, genre, trailerLink, movieLength }) => {
  return ( 
    <div className="front">
      
        <h4> {title} </h4>
        <p> {movieLength} / {genre} </p>
        

      </div>
   );
}
export default CardFront;