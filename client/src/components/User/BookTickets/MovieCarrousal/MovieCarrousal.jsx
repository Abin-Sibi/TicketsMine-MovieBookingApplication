import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import Card from "./MovieCard";

function MovieCarrousal({movies}) {
      
     
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
        <div style={{ width: "90%",height:"25%", margin: "auto" }}>
            <h1 style={{ marginTop: "40px",color:"white" }}>New Releases</h1>
            <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet", "mobile"]}>


                
                        <Link style={{ textDecoration: "none" }} to={"/booktickets/movie"}><Card  /></Link>
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    
            </Carousel>
        </div >
    )
}

export default MovieCarrousal