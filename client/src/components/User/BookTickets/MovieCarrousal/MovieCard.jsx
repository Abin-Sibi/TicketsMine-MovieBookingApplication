import React from 'react'
import styles from './MovieCarrousal.css';

function MovieCard(movie) {
    
    return (
        <div  className={styles.card} style={{marginLeft:"30px",background:"black",color:'white'}}> 
            <img src={`../images/download (1).jpeg`} />
            <div className={styles.title}>kjhgkjh</div>
            <div className={styles.genre}>iuhkhhhh</div>
        </div>
    )
}

export default MovieCard