import {React,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from '../../../axios';
import logstyle from '../Login/Login.module.css'

function Otp({ userNumber ,number}) {

        const [otp, setOtp] = useState("");
        const navigate = useNavigate();
      
        const handleSubmit = (event) => {
          event.preventDefault();
          axios.post(`/api/user/otp`, { otp, userNumber,number }).then((res) => {
        
            if (res.data.resp.valid) {
                console.log('response of otp',res)
              navigate('/',{replace:true});
            } else {
              toast.error(`Expired or wrong Otp`,{theme:"light"}, {
                position: "bottom-right",
              })
            }
          });
        };
        const handleChange = (event) => {
            setOtp(event.target.value);
          };
      
  return (
    <form className={logstyle.loginForm} action="" onSubmit={(e) => handleSubmit(e)}>
                        <div className={logstyle.formContent}>
                            <div className={logstyle.formItem}>
                                <label htmlFor="otp">Otp</label>
                                <input className={logstyle.input} type="number" name='otp' value={otp}  onChange={handleChange} />
                            </div>
                            <button className={logstyle.button} type='submit'>Submit</button>

                            <div >
                            
                            <span className={logstyle.twoLog}>Login with email-   <Link to="/login"> Otp Login</Link></span>
                            </div>
                            
                        </div>
 </form>
  )
}

export default Otp