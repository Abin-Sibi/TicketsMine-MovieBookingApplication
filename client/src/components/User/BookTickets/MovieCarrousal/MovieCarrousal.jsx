import axios from "../../../../axios";
import React, { useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import Card from "./MovieCard";
import { useState } from "react";

function MovieCarrousal() {

    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        console.log("the consfja")
        axios.get("/api/user/getMovies").then((response) => {
            console.log(response.data, "this is the response got with movies")
            setMovieList(response.data)
        })
    }, [setMovieList])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        // <div style={{ width: "90%",height:"25%", margin: "auto" }}>
        //     <h1 style={{ marginTop: "40px",color:"white" }}>New Releases</h1>
        //     <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet", "mobile"]}>

        //      {movieList.map((movie)=>{
        //         return(<Link style={{ textDecoration: "none" }} to={`/booktickets/movie/${movie._id}`}><Card movieName={movie.title} movieGenre={movie.genre} imageUrl={movie.imageUrl} /></Link>)

        //      })}



        //     </Carousel>
        // </div >
        <div style={{ margin: "50px" }}>
            <div style={{ width: "90%", margin: "auto", display: "flex", alignItems: "center" }}>
                <h1 style={{ color: "white", marginRight: "auto" }}>New Releases</h1>
                <Link to="/allmovies" style={{ textDecoration: "none" }}>
                    <button style={{ backgroundColor: "white", color: "black", border: "none", padding: "10px 20px" }}>See all</button>
                </Link>
            </div>
            <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet", "mobile"]}>
                {movieList.map((movie) => {
                    return (
                        <Link style={{ textDecoration: "none" }} to={`/booktickets/movie/${movie._id}`}>
                            <Card movieName={movie.title} movieGenre={movie.genre} imageUrl={movie.imageUrl} />
                        </Link>
                    )
                })}
            </Carousel>
        </div>

    )
}

export default MovieCarrousal