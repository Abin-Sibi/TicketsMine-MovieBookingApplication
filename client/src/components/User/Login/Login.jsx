import React from 'react'
import { useState,useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { BsGoogle } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../../axios'
import jwtDecode from 'jwt-decode'


import logstyle from'../Login/Login.module.css'

function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [cookies,removeCookie] = useCookies([]);

    function handleCallbackResponse(response){
     console.log(response.credential,"google credentialsssssss")
     let userObject = jwtDecode(response.credential)
     console.log(userObject,"Kkkkk")
    }
    useEffect(()=>{
        /*global google*/
        google.accounts.id.initialize({
            client_id:"171742127444-1elipvvqfkj399mqacfpm11u13gpikbs.apps.googleusercontent.com",
            callback:handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme:"outline",size:"large"}
        )
        const verifyUser = async ()=>{
            if(cookies.userToken){
             navigate("/")
            }
        }
        verifyUser();
    },[navigate])

    const generateError = (err) =>
        toast.error(err, {
            position: "bottom-right",
        })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/user/login", {
                ...values,

            }, { withCredentials: true });
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email)
                    else if (password) generateError(password)
                } else {
                    console.log('kjhgkg')
                    navigate("/", { replace: true });
                }
            }
        } catch (err) {
            console.log("this is catch error", err)
        }
    }
    return (
        <>
            <div className={logstyle.container}>
            <div className={logstyle.loginRight}>
                      <img src='../images/login-1.jpg'></img>
                </div>
                <div className={logstyle.loginLeft} >
                    <div>
                    <h2 style={{color:"black",marginTop:"10px"}}>Login Account</h2><br></br>
                    </div>
                    
                    <form className={logstyle.loginForm}  action="" onSubmit={(e) => handleSubmit(e)}>
                        <div className={logstyle.formContent} >
                            <div className={logstyle.formItem} >
                                <label htmlFor="email">Email</label>
                                <input className={logstyle.input}  type="email" name='email' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                            </div>
                            <div className={logstyle.formItem} >
                                <label htmlFor="password">Password</label>
                                <input className={logstyle.input}  type="password" name='password' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                                <span className={logstyle.forgotpassword} >Forgot password? <Link to="/forgotpassword">click here</Link></span>
                            </div>
                           
                            <button className={logstyle.button}  type='submit'>Submit</button>

                            <div >
                            <span className={logstyle.twoLog} >Don't have an Account? <Link to="/register">Register</Link></span>
                            <br></br>
                            <span className={logstyle.twoLog} >Login with otp click here-   <Link to="/otp"> Otp Login</Link></span>
                            </div>
                            
                        </div>

                        <div className={logstyle.loginFormFooter} >
                                  <a href="#" className={logstyle.twoLogins} >
                                    <img className={logstyle.imgfooter1}  src="../images/Facebook_f_logo_(2021).svg.webp" alt="" />Facebook Login
                                  </a>
                                  <a href="#" className={logstyle.twoLogins} id='signInDiv' >
                                    <img className={logstyle.imgfooter1} src="../images/google2.png" alt="" />Google Login
                                  </a>
                        </div>


                    </form>
                    
                </div>
                
                <ToastContainer />
            </div>
        </>


    )
}

export default Login