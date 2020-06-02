import React from 'react';
import './style.css';

import MovieCard from './MovieColumn1';
import MovieColumn2 from './MovieColumn2';
import MovieColumn3 from './MovieColumn3';

const MoviesSchedule = ({ movies, currentPage, pageSize }) => {
  const currentMovies = movies.slice((currentPage - 1) * pageSize, pageSize * currentPage);
  return (
      <table >
          <tr>
      <th>{ 
        !!movies &&
        currentMovies.map(movie => <MovieCard movie={movie} key={movie._id}/>) 
      }</th>
      <th>{ 
        !!movies &&
        currentMovies.map(movie => <MovieColumn2 movie={movie} key={movie._id}/>) 
      }</th>
      <th>{ 
        !!movies &&
        currentMovies.map(movie => <MovieColumn3 movie={movie} key={movie._id}/>) 
      }</th>
    </tr>
    </table>
  )
}
export default MoviesSchedule;