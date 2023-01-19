import React from 'react'
import { useState ,useEffect} from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../../axios'

import logstyle from '../../User/Login/Login.module.css'

function TheatreLogin() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [cookies] = useCookies([]);
    useEffect(()=>{
        const verifyUser = async ()=>{
            if(cookies.theatreToken){
             navigate("/theatrehome")
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
            const { data } = await axios.post("/api/theatre/login", {
                ...values,

            }, { withCredentials: true });
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email)
                    else if (password) generateError(password)
                } else {
                    console.log('kjhgkg')
                    var user = true;
                    navigate("/theatrehome", { replace: true });
                }
            }
        } catch (err) {
            console.log("this is catch error", err)
        }
    }
    return (
        <>
            <div className={logstyle.containerTheatre}>
            <div className={logstyle.loginRight}>
                      <img src='../images/theatre-log.jpg'></img>
                </div>
                <div className={logstyle.loginLeft}>
                    <div>
                    <h2 style={{color:"black"}}>Theatre Login</h2><br></br>
                    </div>
                    
                    <form className={logstyle.loginForm} action="" onSubmit={(e) => handleSubmit(e)}>
                        <div className={logstyle.formContent}>
                            <div className={logstyle.formItem}>
                                <label htmlFor="email">Email</label>
                                <input className={logstyle.input} type="email" name='email' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                            </div>
                            <div className={logstyle.formItem}>
                                <label htmlFor="password">Password</label>
                                <input className={logstyle.input} type="password" name='password' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                            </div>
                            <button className={logstyle.button} type='submit'>Submit</button>

                            <div >
                            <span className={logstyle.twoLog}>Don't have an Account? <Link to="/theatre/signup">Register</Link></span>
                            </div>
                            
                        </div>
                    </form>
                    
                </div>
                
                <ToastContainer />
            </div>
        </>


    )
}

export default TheatreLogin