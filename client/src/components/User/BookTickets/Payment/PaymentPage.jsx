import React from "react";
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode"
import { makeStyles } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import FirstSection from "./FirstSection";
import styles from "./payment.module.css";
import SecondSection from "./SecondSection";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { postBookingDetails } from "../../../../Redux/Reducers/PostBookingDetails"; 
// import { getBookingDetails, postBookingDetails } from '../Redux/booking/action';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Counter = () => (
  <CountdownCircleTimer
    isPlaying
    duration={600}
    colors={[
      ["#004777", 0.33],
      ["#F7B801", 0.33],
      ["#A30000", 0.33],
    ]}
  >
    {({ remainingTime }) =>
      Math.floor(remainingTime / 60) + " : " + (remainingTime % 60) + " Minutes"
    }
  </CountdownCircleTimer>
);

function PaymentPage({proceed})  {

    const [state, setState] = React.useState(false);
    const [cookies] = useCookies([])
    const dispatch = useDispatch();
  
    const [counter, setCounter] = React.useState(true);
    const navigate = useNavigate();
    const booking_details = useSelector((state) => state.dateInfoSelected);
    const movieInfo = useSelector((state) => state.movie.data);
    const priceAndSeat = useSelector((state) => state.totalPrice.dateInfo);
    const seatData = useSelector((state) => state.SeatData);
    const date = useSelector((state) => state.dateInfo.date);
    console.log(date,'date][][][][][]')
    console.log(priceAndSeat,'totalPrice[][][][][][]')
    console.log(seatData,'seatData[][][][][][]')
    const paymentInfo = useSelector((state) => state.payment);
    console.log("qrrrr",paymentInfo,paymentInfo?.payment?.qrcode);
    const { loading, payment} = paymentInfo;
    // console.log(paymentSucess);
    // const { data, qrcode, status } = payment;
    console.log(booking_details,'booking_details][p{}}{}{}{}{}{}{}')
    // const { date } = selectDate;
    const token = cookies.userToken
    
    const { dateInfo } = seatData;
   
    const handleClose = () => {
      setState(false);
    };
  
    const handlePayment = async(id) => {
      setState(true);
      const userId = await jwt_decode(token)
      const dates = new Date();
      dates.setFullYear(date.year);
      dates.setMonth(date.month); // 0 represents January
      dates.setDate(date.date);
      
      const isoString = dates.toISOString();
      console.log(isoString,';;pppppppppiiueue')
      const dateOnly = isoString.substring(0, 10);
      const data = {
        cinemaId: booking_details.dateInfo.theaterId,
        cinemaScreen: booking_details.dateInfo.screen,
        startAt: booking_details.dateInfo.time,
        ticketPrice: "120",
        seats: dateInfo.silver,
        total: dateInfo.price,
        movieId: movieInfo._id,
        userId: userId.id,
        showDate: dateOnly,
        bookedDate: new Date(),
        paymentId: id,
      };
      console.log("ttttttttttttttttttttttttttttttttttttttt")
      dispatch(postBookingDetails(data)).then((res) => {
        if (res) {
          console.log("POSTED");
          // dispatch(getBookingDetails());
        }
      });
      setTimeout(() => {
        setCounter(false);
      }, 2000);
    };
    const handleMove = () => {
      navigate("/");
    };
  
    const PUBLIC_KEY =
      "pk_test_51MrG87SGEjvtURnZZEj76M59mc2OZ1faoEEgKBN3EdkaoIGV5r7UjSPrZ9rW6wkZt5XImyFd9rYOAoFT92ZDRSU600JXGs7vum";
  
    const stripeTestPromise = loadStripe(PUBLIC_KEY);
  
  
    return (
      <div>
        <Dialog
          fullScreen
          open={proceed}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar style={{ position: "relative", background: "#1F2533" }}>
            <Toolbar>
              <Typography variant="h6" style={{ flex: 1 }}>
                <svg height="40" width="150">
                  <Link to="/"></Link>
                </svg>
              </Typography>
            </Toolbar>
          </AppBar>
  
          <div className={styles.page}>
            <div className={styles.firstSection}>
              <Elements 
              stripe={stripeTestPromise}
              >
                <FirstSection handlePayment={handlePayment} />
              </Elements>
            </div>
            <div className={styles.secondSection}>
              <SecondSection />
              <div
                style={{
                  width: "80px",
                  margin: "20px auto",
                  fontSize: "20px",
                  wordBreak: "break-word",
                }}
              >
                <Counter />
              </div>
            </div>
          </div>
        </Dialog>
  
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={state}
          TransitionComponent={Transition}
        >
          {counter && (
            <DialogTitle
              id="customized-dialog-title"
              style={{ background: "#F84464", color: "white" }}
              onClose={handleClose}
            >
              Please hold tight we are getting your tickets ready.
            </DialogTitle>
          )}
          <DialogContent dividers>
            <img style={{width:'100%'}} src=""/>
            {counter ? (
              <img
                style={{ width: "70%", margin: "0 15%" }}
                src=""
                alt=""
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "white",
                  background: "#F84464",
                  padding: "100px 50px",
                  borderRadius: "5px",
                }}
              >
                <img 
                src={paymentInfo?.payment?.qrcode}
                 alt="hello" />
                <h1>Congratulations!</h1>
                <div style={{ fontSize: "20px" }}>We have got your tickets</div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleMove}
              variant="contained"
              color="secondary"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default PaymentPage