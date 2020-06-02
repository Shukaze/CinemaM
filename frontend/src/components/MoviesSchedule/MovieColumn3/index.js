import React from 'react';
import moment from 'moment';
import FlippingCardFront from './Date';
import './style.css';

const MovieColumn3 = ({ movie }) => {
  const { startDate,_id } = movie;
 
  
  return (
    <div className='card-container'>     
      <div className='card-wrapper' id={_id} >
        <FlippingCardFront 
          startDate={moment(startDate).format('Do MMMM YYYY')}
          
        />
      </div>
    </div>
  );
}
const FlipCard = cardID => {
  const card = document.getElementById(`${cardID}`);
  card.classList.toggle('flipped');
}
export default MovieColumn3;
