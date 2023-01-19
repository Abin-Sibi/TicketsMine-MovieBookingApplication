import {React,useState} from 'react'
import  {Link} from 'react-router-dom'
import axios from '../../../axios';
import {toast,ToastContainer} from 'react-toastify'
import logstyle from '../Login/Login.module.css'

function NumberForgot({status,num}) {

        const [number, setNumber] = useState("");
        const generateError = (err) =>
        toast.error(err, {
            position: "bottom-right",
        })
      
        const handleSubmit = (event) => {
            event.preventDefault();
            axios.post(`/api/user/mobile`, { number }).then((res) => {
                console.log(res.data,"datass")
              
              if(res.data.errors){
                console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
                const { email,password,phone } = res.data.errors;
                    if (phone) generateError(phone)
              }else{
                status(res.data.to);
                num(number)
                setNumber("");
              }
            });
          };
        const handleChange = (event) => {
            setNumber(event.target.value);
          };
      
  return (
    <form className={logstyle.loginForm} action="" onSubmit={(e) => handleSubmit(e)}>
                        <div className={logstyle.formContent}>
                            <div className={logstyle.formItem}>
                                <label htmlFor="number">Enter your registered mobile number</label>
                                <input className={logstyle.input} type="number" name='mobile' value={number}  onChange={handleChange} />
                            </div>
                            <button className={logstyle.button} type='submit'>Submit</button>

                            <div >
                            
                            <span className={logstyle.twoLog}>Login with email-   <Link to="/login">Login with mail</Link></span>
                            </div>
                            
                        </div>
             <ToastContainer></ToastContainer>
 </form>
  )
}

export default NumberForgot