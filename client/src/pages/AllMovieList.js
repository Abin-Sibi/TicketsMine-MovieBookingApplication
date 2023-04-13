import React from 'react';
import AllMovies from '../components/User/BookTickets/AllMovies/AllMovies';
import MovieFilter from '../components/User/BookTickets/AllMovies/MovieFilter';
import Header from '../components/User/Header/Header';

function AllMovieList() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px', paddingRight: '10px' }}>
          <MovieFilter />
        </div>
        <AllMovies style={{ flex: '1' }} />
      </div>
    </>
  );
}

export default AllMovieList;
