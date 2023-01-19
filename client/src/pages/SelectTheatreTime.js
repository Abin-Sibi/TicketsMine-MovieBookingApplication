import React from 'react'
import { Calendar } from '../components/User/BookTickets/Calander/Calander'
import { TheatreLists } from '../components/User/BookTickets/TheatreLists/TheatreLists'
import Header from '../components/User/Header/Header'

function SelectTheatreTime() {
  return (
    <div><Header/>
    <Calendar/>
        <TheatreLists/></div>
  )
}

export default SelectTheatreTime