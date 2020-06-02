import React from 'react';
import './style.css';

const CardFront = ({ startDate }) => {
  return ( 
    <div className="front">
      <h3> {startDate} </h3>
    </div>
   );
}
export default CardFront;