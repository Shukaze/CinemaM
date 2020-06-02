import React from 'react';
import './style.css';

const CardFront = ({ coverImage }) => {
  return ( 
    <div className="front">
      <img src={coverImage} alt="coverImage"/>
      
    </div>
   );
}
export default CardFront;