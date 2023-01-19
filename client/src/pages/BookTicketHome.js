import React from 'react'
import Carrousal from '../components/User/BookTickets/Carrousal/Carrousal'
import MovieCarrousal from '../components/User/BookTickets/MovieCarrousal/MovieCarrousal'
import Header from '../components/User/Header/Header'

function BookTicketHome() {
  return (
    <div>
        <Header/>
        <Carrousal/>
        <MovieCarrousal/>
    </div>
  )
}

export default BookTicketHome