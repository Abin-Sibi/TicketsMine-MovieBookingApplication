import React, { useState } from "react";
import { useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import axios from "../../../../axios";
import jwt_decode from 'jwt-decode'
import { Input, Modal } from "antd";
import { Backdrop, Fade, Slider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
const { TextArea } = Input;

export default function ReviewForm({ open, setOpen, movieId, setsubmit }) {
  const movieInfo = useSelector((state) => state.movie);
  // const [open, setOpen] = React.useState(false);
  const [cookies] = useCookies()
  const [value, setvalue] = useState("");
  const [message, setMessage] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };
  //   const sessionDetails = JSON.parse(sessionCookie);
  const handleSubmit = async(event) => {
    const movieId = movieInfo?.data._id;
    //  const userId = localStorage.getItem("userInfo")
    const userId = await jwt_decode(cookies.userToken)
    // localStorage.getItem("userInfo");
    // let userEmail = JSON.parse(user);

    event.preventDefault();

    axios.post("/reviews", {
      message,
      rating,
      movieId,
      userId,
    });
    handleClose();
    setMessage(null);
    setRating(0);
    setsubmit(true);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        footer={null}
        header={null}
        closable={false}
      >
        <Fade in={open}>
          <div>
            <div style={{ textAlign: "center", position: "relative" }}>
              <h5 style={{ margin: 0, padding: 0, marginTop: 10 }}>
                How was the movies?
              </h5>
              <p style={{ margin: 0, padding: 0, fontSize: "24px" }}>
                {movieInfo && movieInfo.data.title}
              </p>
              <CloseIcon
                style={{
                  position: "absolute",
                  right: 10,
                  top: 0,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />
            </div>
            <hr />
            <div>
              <Typography id="discrete-slider" gutterBottom>
                How would you rate the movie?
              </Typography>
              <Rating
                // className={classes.rating}
                name="review-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />

              {/* <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "#f84464",
                color: "white",
                display: "flex",
                alignItems: "center",
                marginLeft: 180,
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
                {rValue}%
              </h1>
            </div> */}
              <hr />
              <Typography id="discrete-slider" gutterBottom>
                Write something about movie
              </Typography>
              <hr />
              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                width: "80%",
                margin: "30px",
                height: 50,
                fontSize: 18,
                color: "white",
                backgroundColor: "#FF1203",
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
    </>
  );
}
