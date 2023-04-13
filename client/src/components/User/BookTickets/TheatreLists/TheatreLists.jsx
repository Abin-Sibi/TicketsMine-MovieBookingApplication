import React, { useCallback, useEffect, useState } from "react";
import { BsHeartFill, BsCircleFill } from "react-icons/bs";
import { VscDeviceMobile } from "react-icons/vsc";
import { IoFastFoodOutline } from "react-icons/io5";
import styles from "./TheatreLists.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDetails } from "../../../../Redux/Reducers/MovieReducer";
import { getSeatInformation } from "../../../../Redux/Reducers/SeatInfoReducer";
import { handleSelectNameTime } from "../../../../Redux/Reducers/NameTimeReducer";
import axios from "../../../../axios";


export const TheatreLists = () => {
    const dispatch = useDispatch()
    const [theatre, setTheatre] = useState([])
    const [seat,setSeat] = useState(false)
    const movieId = useParams()
    const navigate = useNavigate()
    const selectDate = useSelector((state) => state.dateInfo);
    const { date } = selectDate;
    const moviedetails = useSelector((state) => state.movie.data)


    const fetchTheatreData = useCallback(() => {
        if (moviedetails._id && moviedetails.title && moviedetails.releasedate) {
            axios.get(`/api/theatre/getScreenShows/${moviedetails._id}/${moviedetails.title}/${moviedetails.releasedate}`)
                .then((response) => {
                    setTheatre(response.data.data);
                })
        }
    }, [moviedetails]);

    useEffect(() => {
        dispatch(movieDetails(movieId));
    }, [dispatch, movieId]);

    useEffect(() => {
        fetchTheatreData();
    },[fetchTheatreData, moviedetails]);

    const seatView = (showTime,theatreId,screenname,theatrename) => {
        setSeat(true)
        const dates = new Date();
        dates.setFullYear(date.year);
        dates.setMonth(date.month); // 0 represents January
        dates.setDate(date.date);
        const isoString = dates.toISOString();
        const dateOnly = isoString.substring(0, 10);
        console.log(']]]{}}yryryry',dateOnly,
        moviedetails?._id,
        showTime,
        theatreId,'kkkkk',screenname)
        
        dispatch(
            getSeatInformation(
             { date:dateOnly,
              movieId:moviedetails?._id,
              showtime:showTime,
              theatreid:theatreId}
            )
          );
          dispatch(handleSelectNameTime(theatrename,showTime,screenname,theatreId));
          setTimeout(()=>{
             navigate('/booktickets/seats',{state:showTime})
          },2000)
       
    }

    return (
        <div className={styles.container} >
            <div className={styles.container__info}>
                <div>
                    <BsCircleFill style={{ color: "#4ABD5D", fontSize: 10 }} />
                    <span style={{ color: "#4ABD5D" }}>AVAILABLE</span>
                </div>
                <div>
                    <BsCircleFill style={{ color: "rgb(253, 102, 0)", fontSize: 10 }} />
                    <span style={{ color: "rgb(253, 102, 0)", fontSize: 10 }}>FAST FILLING</span>
                </div>
            </div>
            <div style={{ padding: "15px" }}>
                {theatre.map((theatreData) => {
                        return (
                            <>
                                <div className={styles.container__card}>
                                    <div className={styles.container__card__title}>
                                        <BsHeartFill className={styles.container__card__title__icon} />
                                        <h4>{theatreData._id}</h4>
                                    </div>
                                    {theatreData.screens.map((screen) => {
                                        return (
                                            <div className={styles.container__card__info}>
                                                <div className={styles.container__card__info__options}>
                                                    <div style={{ color: "#49BA8E" }}>
                                                        <VscDeviceMobile />
                                                        <span>M-Ticket</span>
                                                    </div>
                                                    <div style={{ color: "#FFB23F" }}>
                                                        <IoFastFoodOutline />
                                                        <span>{screen.screenname}</span>
                                                    </div>
                                                </div>
                                                {console.log(screen.showInfo, 'wwwwwwwwwwwwwwwww')}
                                                {screen.showInfo.map((showinfo) => {
                                                    { console.log(showinfo, 'hhhhhhhhh') }
                                                    return (<>
                                                        {showinfo.map((data) => {
                                                            return (
                                                                <div className={styles.container__card__info__times__container}>
                                                                    <div>
                                                                        <div style={{ pointerEvents: "all" }} className={styles.button} onClick={()=>seatView(data.showtime,screen.theatreId,screen.screenname,theatreData._id)}>
                                                                            {data.showtime}
                                                                            <div className={styles.price__container}>
                                                                                <div style={{ alignItems: 'center' }}>
                                                                                    <p>Rs.{data.ticketprice}</p>
                                                                                    <span>{data.moviename}</span> <br />
                                                                                    <span style={{ color: "#4abd5d" }}>Available</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ display: "flex", alignItems: "center" }} >
                                                                        <BsCircleFill style={{ color: "#FFC610", fontSize: 8, marginRight: 5 }} /> <span style={{ fontSize: 12, color: "gray" }}>Cancellation Available</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </>
                                                    );
                                                })}
                                            </div>)
                                    })
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}