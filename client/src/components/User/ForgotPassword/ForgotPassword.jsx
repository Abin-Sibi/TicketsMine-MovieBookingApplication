import React from 'react'
import { useState } from 'react'
// import {  useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
// import axios from '../../../axios'
import OtpForgot from './OtpForgot'
import NumberForgot from './NumberForgot'

import logstyle from '../Login/Login.module.css'

function ForgotPassword() {

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
            <h2 style={{color:"black"}}>Forgot password</h2><br></br>
            </div>
            {mobile ? (
<NumberForgot status={changeStatus} num ={changeNum} />
) : (
<OtpForgot userNumber={userNumber} number={number} />
)}
           
            
        </div>
        
        <ToastContainer />
    </div>
</>
  )
}

export default ForgotPassword

