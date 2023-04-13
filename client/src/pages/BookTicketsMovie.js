import React from 'react'
import { useParams } from 'react-router-dom'
import Reviews from '../components/User/BookTickets/Reviews/Reviews'
import Header from '../components/User/Header/Header'
import MoviePage from '../movie/banner'

function BookTicketsMovie() {
  let movieId = useParams()
  console.log(movieId,"this is the id")
  
  return (
    <div>
        <Header/>
        <MoviePage movieId={movieId}/>
        
              
        
        
        </div>
  )
}

export default BookTicketsMovie