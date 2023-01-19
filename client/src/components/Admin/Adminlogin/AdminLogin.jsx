import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import '../Adminlogin/AdminLogin.css'
import { useCookies } from "react-cookie";

function AdminLoginPage() {
    const navigate = useNavigate();
    const initialValues = { email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      console.log(formValues);
    };
  
    const generateError = (error) =>
      toast.error(error, {
        position: "top-right",
      });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    };

    const [cookies] = useCookies();
    useEffect(()=>{
        const verifyUser = async ()=>{
            if(cookies.adminToken){
             navigate("/admin")
            }
        }
        verifyUser();
    },[navigate])
  
    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        axios
          .post("/api/admin/login", {
            email: formValues.email,
            password: formValues.password,
          })
          .then((response) => {
            console.log('here i am hi hi')
            if (
              response.data === "Admin not found" ||
              response.data === "Please check your password"
            ) {
                console.log('here i am hu hu')
              generateError(response.data);
            } else {
                console.log('here i am')
              navigate("/admin", { replace: true });
            }
          });
      }
    }, [formErrors]);
  
    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        const error = "This is not a valid email format!";
        generateError(error);
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
      } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
      }
      return errors;
    };
  
    return (
      <div className="form containermain-admin  ">
        <form className="containerlogin " onSubmit={handleSubmit}>
          <h1 style={{color:"black"}}>Admin Login </h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Email</label>
              <input
              className="inputadmin"
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <label>Password</label>
              <input
              className="inputadmin"
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    );
}

export default AdminLoginPage
