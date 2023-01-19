import React,{useEffect} from 'react'
import Banner from '../components/User/Banner/Banner'
import Header from '../components/User/Header/Header'
import MovieList from '../components/User/MovieList/MovieList'
import Sidebar from '../components/User/Sidebar/Sidebar'
import '../components/User/Home.css'
// import Ban from '../movie/banner'

function Home() {
  useEffect(() => {
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
  }, [])
  
  return (
    <div>
         <Header></Header>
         <Sidebar></Sidebar>
         <div className="container-home">
        <div className="content-container">
         <Banner/>
         <MovieList/>
     </div>
     </div>
    </div>
  )
}

export default Home