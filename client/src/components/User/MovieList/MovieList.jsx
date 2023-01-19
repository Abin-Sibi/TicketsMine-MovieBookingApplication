import React ,{useEffect}from 'react'
import { FaChevronRight } from 'react-icons/fa'
import '../MovieList/MovieList.css'

function MovieList() {
    
useEffect(() => {
    const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

    console.log(arrows,'arrowsss')
    arrows.forEach((arrow, i) => {
        const itemNumber = movieLists[i].querySelectorAll("img").length;
        let clickCounter = 0;
        arrow.addEventListener("click", () => {
          const ratio = Math.floor(window.innerWidth / 270);
          clickCounter++;
          if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
            movieLists[i].style.transform = `translateX(${
              movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
            }px)`;
          } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
          }
        });
      
        console.log(Math.floor(window.innerWidth / 270));
      });

      const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);
console.log('this is toggle query selector',ball,items)
ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});
}, []);

  return (
    <div className="movie-list-container">
                <h1 className="movie-list-title">NEW RELEASES</h1>
                <div className="movie-list-wrapper">
                    <div className="movie-list">
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="../images/8a6a68144592045.628efcd3e77b5.jpg" alt=""></img>
                            <span className="movie-list-item-title">Stranger Things</span>
                            <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                hic fugit similique accusantium.</p>
                                <div className='buttons-movielist'>
                                <button className="movie-list-item-button">Watch</button>
                            <button className="movie-list-book">Book</button>
                                </div>
                            
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="../images/download (1).jpeg" alt=""></img>
                            <span className="movie-list-item-title">Star Wars</span>
                            <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                hic fugit similique accusantium.</p>
                            <button className="movie-list-item-button">Watch</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="/images/images.jpeg" alt=""></img>
                            <span className="movie-list-item-title">Daredevil</span>
                            <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                hic fugit similique accusantium.</p>
                            <button className="movie-list-item-button">Watch</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="/images/movie2.jpeg" alt=""></img>
                            <span className="movie-list-item-title">Replica</span>
                            <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                hic fugit similique accusantium.</p>
                            <button className="movie-list-item-button">Watch </button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="/images/movie3.jpeg" alt=""></img>
                            <span className="movie-list-item-title">Under ground</span>
                            <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                hic fugit similique accusantium.</p>
                            <button className="movie-list-item-button">Watch </button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="../images/8a6a68144592045.628efcd3e77b5.jpg" alt=""></img>
                            <span className="movie-list-item-title">Her</span>
                            <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                hic fugit similique accusantium.</p>
                            <button className="movie-list-item-button">Watch </button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="../images/download (1).jpeg" alt=""></img>
                            <span className="movie-list-item-title">Her</span>
                            <p className="movie-list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                                hic fugit similique accusantium.</p>
                            <button className="movie-list-item-button">Watch </button>
                        </div>
                    </div>
                    <i className="fas fa-chevron-right arrow"><FaChevronRight/></i>
                </div>
            </div>
  )
}

export default MovieList

