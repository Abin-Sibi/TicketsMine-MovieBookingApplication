import React, { useEffect, useState } from "react";
import { BsHeartFill, BsCircleFill } from "react-icons/bs";
import { VscDeviceMobile } from "react-icons/vsc";
import { IoFastFoodOutline } from "react-icons/io5";
import styles from "./TheatreLists.module.css";


export const TheatreLists = () => {
   
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
                {
                  <>
                        <div  className={styles.container__card}>
                            <div className={styles.container__card__title}>
                                <BsHeartFill className={styles.container__card__title__icon} />
                                <h4>Ann Cine Complex</h4>
                            </div>
                            <div className={styles.container__card__info}>
                                <div className={styles.container__card__info__options}>
                                    <div style={{ color: "#49BA8E" }}>
                                        <VscDeviceMobile />
                                        <span>M-Ticket</span>
                                    </div>
                                    <div style={{ color: "#FFB23F" }}>
                                        <IoFastFoodOutline />
                                        <span>F&B</span>
                                    </div>
                                </div>
                                <div className={styles.container__card__info__times__container}>
                                    <div>
                                    
                                                    <div  style={
                                                        { pointerEvents: "all" } }  className={styles.button}>
                                                        02:00 PM
                                                        <div className={styles.price__container}>
                                                            <div>
                                                                <p>Rs. 150</p>
                                                                <span>NORMAL</span> <br />
                                                                <span style={{ color: "#4abd5d" }}>Available</span>
                                                            </div>
                                                            <div>
                                                                <p>Rs. 200</p>
                                                                <span>CLASSIC</span> <br />
                                                                <span style={{ color: "#4abd5d" }}>Available</span>
                                                            </div>
                                                            <div>
                                                                <p>Rs. 300</p>
                                                                <span>VIP</span> <br />
                                                                <span style={{ color: "#4abd5d" }}>Available</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                           
                                    </div>
                                   
                                         <div style={{ display: "flex", alignItems: "center" }} >
                                            <BsCircleFill style={{ color: "#FFC610", fontSize: 8, marginRight: 5 }} /> <span style={{ fontSize: 12, color: "gray" }}>Cancellation Available</span>
                                        </div>
                                  
                                </div>
                            </div>
                        </div>
                        
                               <div  className={styles.container__card}>
                            <div className={styles.container__card__title}>
                                <BsHeartFill className={styles.container__card__title__icon} />
                                <h4>Ann Cine Complex</h4>
                            </div>
                            <div className={styles.container__card__info}>
                                <div className={styles.container__card__info__options}>
                                    <div style={{ color: "#49BA8E" }}>
                                        <VscDeviceMobile />
                                        <span>M-Ticket</span>
                                    </div>
                                    <div style={{ color: "#FFB23F" }}>
                                        <IoFastFoodOutline />
                                        <span>F&B</span>
                                    </div>
                                </div>
                                <div className={styles.container__card__info__times__container}>
                                    
                                    <div>
                                    
                                                    <div  style={
                                                        { pointerEvents: "all" } }  className={styles.button}>
                                                        02:00 PM
                                                        <div className={styles.price__container}>
                                                            <div>
                                                                <p>Rs. 150</p>
                                                                <span>NORMAL</span> <br />
                                                                <span style={{ color: "#4abd5d" }}>Available</span>
                                                            </div>
                                                            <div>
                                                                <p>Rs. 200</p>
                                                                <span>CLASSIC</span> <br />
                                                                <span style={{ color: "#4abd5d" }}>Available</span>
                                                            </div>
                                                            <div>
                                                                <p>Rs. 300</p>
                                                                <span>VIP</span> <br />
                                                                <span style={{ color: "#4abd5d" }}>Available</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                           
                                    </div>
                                   
                                         <div style={{ display: "flex", alignItems: "center" }} >
                                            <BsCircleFill style={{ color: "#FFC610", fontSize: 8, marginRight: 5 }} /> <span style={{ fontSize: 12, color: "gray" }}>Cancellation Available</span>
                                        </div>
                                  
                                </div>
                            </div>
                        </div>
                        </>
                }
            </div>
        </div>
    )
}