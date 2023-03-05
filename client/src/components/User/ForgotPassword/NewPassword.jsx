import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import logstyle from '../Login/Login.module.css'
import axios from '../../../axios';
import { useLocation, useNavigate } from 'react-router-dom';

function NewPassword(props) {

    const [newpass, setNewpass] = useState();
    const [confirmpass, setConfirmpass] = useState();
    const navigate = useNavigate();
    const {state} = useLocation()
    

    const handleSubmit = async (e) => {
        e.preventDefault();     

        try {
            if(newpass===confirmpass){
                console.log(state)
                const { data } = await axios.post("/api/user/newpassword", {
                    confirmpass,state
    
                });
                console.log(data,'jjjjjjjjjjjjjjj')
                if (data.status) {
                    toast.success(`Password changed successfully`,{theme:"light"}, {
                        position: "top-right",
                      })
                        console.log('kjhgkg')
                        navigate("/login");
                   
                }
            }else{
                toast.error(`Passwords not matching`,{theme:"light"}, {
                    position: "top-right",
                  })
            }
            
        } catch (err) {
            console.log("this is catch error", err)
        }
    }

  return (
    <>
    <div className={logstyle.containerOtp}>
        <div className={logstyle.loginRight}>
            <img src='../images/login-1.jpg'></img>
        </div>
        <div className={logstyle.loginLeft}>
            <div>
                <h2 style={{color:"black"}}>Forgot Password</h2><br></br>
            </div>

            <form className={logstyle.loginForm} action="" onSubmit={(e) => handleSubmit(e)}>
                <div className={logstyle.formContent}>
                    <div className={logstyle.formItem}>
                        <label htmlFor="newpass">New password</label>
                        <input className={logstyle.input} type="password" name='newpass' onChange={(e) => setNewpass( e.target.value )} />
                    </div>
                    <div className={logstyle.formItem}>
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input className={logstyle.input} type="password" name='confirmpassword' onChange={(e) => setConfirmpass( e.target.value )} />
                    </div>
                    <button className={logstyle.button} type='submit'>Submit</button>
                </div>
            </form>

        </div>

        <ToastContainer />
    </div>
</>
  )
}

export default NewPassword