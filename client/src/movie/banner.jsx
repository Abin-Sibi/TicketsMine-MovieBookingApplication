import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReviewModel from '../components/User/BookTickets/Reviews/AddReviews'
// import { Link } from "react-router-dom";
import "./movie.css";
import "react-datepicker/dist/react-datepicker.css";
// import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import {movieDetails} from '../Redux/Reducers/MovieReducer'
import Reviews from "../components/User/BookTickets/Reviews/Reviews";
function MoviePage() {

  const [submit, setsubmit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(movieDetails(movieId))
   },[])
  const navigate = useNavigate();
  let movieId = useParams()

  const handleOpen = () => {
      setOpen(true);
  };
    const moviedetails = useSelector((state)=>state.movie.data)
  return (
    <div>
      {/* {movieInfo && ( */}
        <>
          <div
            className="container-moviepage"
            style={{
              backgroundImage: `linear-gradient(90deg, rgb(34, 34, 34) 24.97%, rgb(34, 34, 34) 38.3%, rgba(34, 34, 34, 0.04) 97.47%, rgb(34, 34, 34) 100%),url(${`https://res.cloudinary.com/dp2p38wb5/image/upload/v1678028171/${moviedetails.imageUrl}.jpg`})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            
            <div className="container__movieDetail">
              <h1>{moviedetails.title}</h1>
              <div className="container__movieDetail_rating">
                <img
                  src={`https://res.cloudinary.com/dp2p38wb5/image/upload/v1678028171/${moviedetails.imageUrl}.jpg`}
                  alt="Rating"
                  style={{ width: 300 }}
                />
                <h1>90% </h1>
                <p style={{ marginBottom: 0 }}>
                   Ratings
                </p>
              </div>
              <div className="container__movieDetail_ratingButton">
                <div>
                  <h4 style={{ color: "white" }}>Add your rating and review</h4>
                  <p>Your ratings matter</p>
                </div>
                <div>
                  <button style={{ cursor: "pointer" }} 
              onClick={handleOpen}>
                    Rate Now
                    
                  </button>
                  <ReviewModel open={open} setOpen={setOpen} setsubmit={setsubmit} />
                </div>
              </div>
              <div className="container__movieDetail_language">
                <div>
                  <p>2D</p>
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/moviepage/trailer")}
                >
                  <p>Watch Trailer</p>
                </div>
              </div>
              <div style={{ color: "white", fontSize: 18 }}>
                <h5 style={{ color: "white", fontSize: 18 }}>
                 {moviedetails.duration} - {moviedetails.genre} - 30-10-2023
                </h5>
              </div>
              <div className="BookButton" onClick={()=>navigate(`/booktickets/buytickets/${moviedetails._id}`)}>
                <button>Book Tickets</button>
              </div>
            </div>
          </div>
          <div className="middleContainer">
            <div>
              <h1>About the movie</h1>
              <p>The movie is about some childrens and some jhfshf jhhkgdkhhs slkjhlkg ljhlvj  hjljj</p>
            </div>
            <hr />
            <div>
              <h1>Cast</h1>
              <p>The movie is about some childrens and some jhfshf jhhkgdkhhs slkjhlkg ljhlvj  hjljj</p>
            </div>
            <hr />
            <div>
              <h1>Crew of the movie</h1>
              <p>The movie is about some childrens and some jhfshf jhhkgdkhhs slkjhlkg ljhlvj  hjljj</p>
            </div>
            <hr />
            <div>
              <h1>Reviews{submit}</h1>
              <Reviews movieId={movieId} submit={submit} setsubmit={setsubmit}/>
            </div>
            <hr />
          </div>
        </>
      {/* )} */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade>
            <div>
              <div style={{ textAlign: "center", position: "relative" }}>
                <h5 style={{ margin: 0, padding: 0, marginTop: 10 }}>
                  How was the movies?
                </h5>
                <p style={{ margin: 0, padding: 0 }}>
                  jhdfishfo uifhofh ofufhfoudasfh ffouf fds hfugfsdihugfgf  ufgffgfd ffugfusdgf ifgddufdgsdfgfgyugfdf h fgdf fgdf  fgdyfgd ffd fydfdgf dfdfhdf dfgdfgf dfdfgdgffss dfydg fd gff fd fd f
                </p>
                <button
                  
                  style={{ position: "absolute", right: 10, top: 0 }}
                >
                  X
                </button>
              </div>
              <hr />
              <div>
                <Typography id="discrete-slider" gutterBottom>
                  How would you rate the movie?
                </Typography>
                <Slider
                  
                  defaultValue={10}
                  
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={0}
                  max={100}
                  color="secondary"
                />

                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "#f84464",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 60,
                    position: "relative",
                  }}
                >
                  <h1
                    style={{
                      color: "white",
                      margin: 0,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    %
                  </h1>
                </div>
              </div>
              <button
                
                style={{
                  width: "80%",
                  margin: "30px",
                  height: 50,
                  fontSize: 18,
                  color: "white",
                  backgroundColor: "#f84464",
                  borderRadius: 10,
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                Submit Rating
              </button>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default MoviePage;