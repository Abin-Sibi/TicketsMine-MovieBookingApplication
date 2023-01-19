import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../axios'
import './Banner.css'
function Banner() {
  
  

  return (
    <div className="featured-content">
    <img className="featured-title" src="img/f-t-1.png" alt=""></img>
    <p className="featured-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor
        deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis
        minima voluptatibus incidunt. Accusamus, provident.</p>
    <button className="featured-button">WATCH</button>
    <Link to={"/booktickets/movie"}><button className="book-button">BOOK SHOW</button></Link>
</div>
  )
}

export default Banner