import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import styles from "../TheatreLists/TheatreLists.module.css";
import { selectDate } from "../../../../Redux/Reducers/DateReducer";

export const Calendar = () => {
    let currentDate = new Date().getDate();
    let currentDay = new Date().getDay();
    let currentMonth = new Date().getMonth() ;
    console.log(currentMonth,'ooooooooooo[pppp[')
  let currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
//   const moviedetails = useSelector((state) => state.movie.data)
    let [selectedDate, setSelectedDate] = useState(0);
    console.log(selectedDate)


let dates = [];
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

for (let i = 0; i < 7; i++) {
  if (currentDate > daysInMonth) {
    currentDate = 1;
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  }
  if (currentDay === 7) {
    currentDay = 0;
  }

  dates.push({
    date: currentDate,
    day: weekdays[currentDay],
    month: currentMonth,
    year: currentYear,
  });
  currentDate++;
  currentDay++;
}

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
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

    const handleDateChange = (index) => {

        setSelectedDate(index);
    }

    return (
        <div style={{ width: "250px",margin:"10px auto"}}>
            <Carousel className={styles.arrow} responsive={responsive} removeArrowOnDeviceType={["mobile"]}>
                {
                    dates?.map((item, index) => (
                        <div className={styles.dateItem} onClick={() => { handleDateChange(index);
                          dispatch(selectDate(dates[index].date, dates[index].day, dates[index].month, dates[index].year)); }} style={index === selectedDate ? { backgroundColor: "red", color: "white" } : { backgroundColor: "white", color: "black" }} key={item.date}>
                            <h2 style={index === selectedDate ? { color: "white" } : { color: "black" }}>{item.date}</h2>
                            <p>{item.day.slice(0, 3)}</p>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}