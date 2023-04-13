import React from 'react'
import { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../../axios'

import logstyle from "../Login/Login.module.css"

function Register() {
    const navigate = useNavigate()
    const [otp, setOtp] = useState("");
    const [getOtp, setGetOtp] = useState(false)
    const [values, setValues] = useState({
        email: "",
        phone: "",
        password: ""
    });
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);


    useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
      
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, [seconds]);

      const resendOTP = () => {
        setMinutes(0);
        setSeconds(30);
        handleSubmit();
      };

    const generateError = (err) =>
        toast.error(err, {
            position: "bottom-right",
        })

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            if(values.phone.length === 10){
                 const { data } = await axios.post("/api/user/register", {
                ...values,
            }, { withCredentials: true });
            if (data) {

                if (data.errors) {
                    console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
                    const { email, password, phone } = data.errors;
                    if (phone) generateError(phone)
                    else if (email) generateError(email)
                } else {
                    setGetOtp(true)
                    setMinutes(0);
                    setSeconds(30);
                }
            }
            }else{
                toast.error(`Enter a valid phone number`,{theme:"light"}, {
                    position: "bottom-right",
                  })
            }
           
        } catch (err) {
            console.log("this is catch error", err)
        }
    }

    const handleChange = (event) => {
        setOtp(event.target.value);
    };


    const handleSubmitOtp = (event) => {
        event.preventDefault();
        axios.post(`/api/user/otpverify`, { otp, ...values }, { withCredentials: true }).then((res) => {

            if (res.data.resp.valid) {
                console.log('response of otp', res)
                navigate('/', { replace: true });
            } else {
                toast.error(`Expired or wrong Otp`,{theme:"light"}, {
                    position: "bottom-right",
                  })
            }
        });
    };
    return (
        <>
            <div className={logstyle.containerOtp}>
                <div className={logstyle.loginRight}>
                    <img src='../images/login-1.jpg'></img>
                </div>
                {!getOtp ? (<div className={logstyle.loginLeft}>
                    <div>
                        <h2 style={{color:"black"}}>Register</h2><br></br>
                    </div>

                    <form className={logstyle.loginForm} action="" onSubmit={(e) => handleSubmit(e)}>
                        <div className={logstyle.formContent}>
                            <div className={logstyle.formItem}>
                                <label htmlFor="name">Name</label>
                                <input className={logstyle.input} type="name" name='name' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                            </div>
                            <div className={logstyle.formItem}>
                                <label htmlFor="email">Email</label>
                                <input className={logstyle.input} type="email" name='email' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                            </div>
                            <div className={logstyle.formItem}>
                                <label htmlFor="number">Phone</label>
                                <input className={logstyle.input} type="number" name='phone' pattern="[0-9]{10}" minLength="10" maxLength="10" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                            </div>
                            <div className={logstyle.formItem}>
                                <label htmlFor="password">Password</label>
                                <input className={logstyle.input} type="password" name='password' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                            </div>
                            <button className={logstyle.button} type='submit'>Submit</button>

                            <div >
                                <span className={logstyle.twoLog}>Already have an Account? <Link to="/login">Login</Link></span>
                                <br></br>

                            </div>

                        </div>




                    </form>

                </div>) : (<form className={logstyle.loginForm} style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: "120px"
                }} action="" onSubmit={(e) => handleSubmitOtp(e)}>
                    <div className={logstyle.formContent}>
                        <div className={logstyle.formItem}>
                            <label htmlFor="otp">Otp</label>
                            <input className={logstyle.input} type="number" name='otp' value={otp} onChange={handleChange} />
                        </div>
                        <div className={logstyle.countdownText}>
                            {seconds > 0 || minutes > 0 ? (
                                <p style={{color:"black"}}>
                                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </p>
                            ) : (
                                <p style={{color:"black"}}>Didn't recieve code?</p>
                            )}

                            <button className={logstyle.resendButton}
                                disabled={seconds > 0 || minutes > 0}
                                style={{
                                    color: seconds > 0 || minutes > 0 ? "rgb(92, 84, 84)" : "#FF5630",
                                }}
                                onClick={resendOTP}
                            >
                                Resend OTP
                            </button>
                        </div>
                        <button className={logstyle.button} type='submit'>Submit</button>

                        <div >

                            <span className={logstyle.twoLog}>Login with email-   <Link to="/login"> Otp Login</Link></span>
                        </div>

                    </div>
                </form>)}

                <ToastContainer />
            </div>
        </>

    )
}

export default Register

