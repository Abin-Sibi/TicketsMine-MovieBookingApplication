import React from 'react'
import styles from './MovieCarrousal.css';

function MovieCard({movieName,movieGenre,imageUrl}) {
    console.log("jjjjjjjjjjjj",movieName,movieGenre)
    return (
        <>
        
        <div  className={styles.card} style={{margin:"3px",background:"black",color:'white'}}> 
            <img src={`https://res.cloudinary.com/dp2p38wb5/image/upload/v1678028171/${imageUrl}.jpg`} />
            <div className={styles.title}>{movieName}</div>
            <div className={styles.genre}>{movieGenre}</div>
        </div>
        </>
        
    )
}

export default MovieCard