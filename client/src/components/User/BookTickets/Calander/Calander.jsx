import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import styles from "../TheatreLists/TheatreLists.module.css";

export const Calendar = () => {
    let currentDate = new Date().getDate();
    let currentDay = new Date().getDay();
    let [selectedDate, setSelectedDate] = useState(0);
    console.log(selectedDate)


    let dates = [];
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 0; i < 5; i++) {
        if (currentDate > 30) currentDate = 1;
        if (currentDay === 7) currentDay = 0;

        dates.push({ date: currentDate, day: weekdays[currentDay] });
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
                        <div className={styles.dateItem} onClick={() => { handleDateChange(index);  }} style={index === selectedDate ? { backgroundColor: "red", color: "white" } : { backgroundColor: "white", color: "black" }} key={item.date}>
                            <h2 style={index === selectedDate ? { color: "white" } : { color: "black" }}>{item.date}</h2>
                            <p>{item.day.slice(0, 3)}</p>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}