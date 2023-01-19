import React from 'react'
import { useState } from 'react'
// import {  useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
// import axios from '../../../axios'
import Otp from './Otp'
import Number from './Number'

import logstyle from '../../User/Login/Login.module.css'

function OtpLogin() {

    // const generateError = (err) =>
    //     toast.error(err, {
    //         position: "bottom-right",
    //     })

        const [mobile, setMobile] = useState(true);
        const [userNumber, setUserNumber] = useState("");
        const [number, setNumber] = useState("");
      
        const changeStatus = (userNumber) => {
          setUserNumber(userNumber);
          setMobile(false);
        };
        const changeNum = (number) => {
            setNumber(number);
           
          };
    return (
        <>
            <div className={logstyle.containerOtp}>
            <div className={logstyle.loginRight}>
                      <img src='../images/login-1.jpg'></img>
                </div>
                <div className={logstyle.loginLeft}>
                    <div>
                    <h2 style={{color:"black"}}>Login Account</h2><br></br>
                    </div>
                    {mobile ? (
        <Number status={changeStatus} num ={changeNum} />
      ) : (
        <Otp userNumber={userNumber} number={number} />
      )}
                   
                    
                </div>
                
                <ToastContainer />
            </div>
        </>


    )
}

export default OtpLogin