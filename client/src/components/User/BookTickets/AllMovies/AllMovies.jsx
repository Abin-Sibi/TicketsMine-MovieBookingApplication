import Card from '../MovieCarrousal/MovieCard'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../../../../axios'

function AllMovies() {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        console.log("the consfja")
        axios.get("/api/user/getMovies").then((response) => {
            console.log(response.data, "this is the response got with movies")
            setMovieList(response.data)
        })
    }, [setMovieList])
  return (<div style={{margin:"50px"}}>
    <h1>Movies</h1>
     <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
    {movieList.map((movie) => (
        <Link style={{ textDecoration: "none", marginBottom: "20px", width: "300px" }} to={`/booktickets/movie/${movie._id}`}>
            <div style={{ border: " solid ", borderRadius: "5px", backgroundColor: "white" }}>
                <Card movieName={movie.title} movieGenre={movie.genre} imageUrl={movie.imageUrl} />
            </div>
        </Link>
    ))}
</div>

  </div>
   
  )
}

export default AllMovies