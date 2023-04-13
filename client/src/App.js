import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import Login from "./components/User/Login/Login"
import Register from "./components/User/Signup/Register"
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin";
import AdminLoginPage from "./components/Admin/Adminlogin/AdminLogin"
import "react-toastify/dist/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import TheatreLogin from "./components/Theatre/TheatreLogin/TheatreLogin";
import TheatreSignup from "./components/Theatre/TheatreSignUp/TheatreSignup";
import OtpLogin from "./components/User/Login/OtpLogin";
import BookTicketHome from "./pages/BookTicketHome";
import BookTicketsMovie from "./pages/BookTicketsMovie";
import SelectTheatreTime from "./pages/SelectTheatreTime";
import 'antd/dist/reset.css';
import AdminApplication from "./pages/AdminApplication";
import AdminMovie from "./pages/AdminMovie";
import TheatreHome from "./pages/TheatreHome";
import TheatreApplication from "./pages/TheatreApplication";
import TheatreManage from "./pages/ManageTheatre.js";
import ForgotPassword from "./components/User/ForgotPassword/ForgotPassword";
import NewPassword from "./components/User/ForgotPassword/NewPassword";
import Seating from "./components/User/BookTickets/Seats/Seats";
import AllMovieList from "./pages/AllMovieList";
import SummaryPage from "./components/User/BookTickets/Summary/Summary";
import UserOrderHistory from "./pages/OrderHistory";
import AdminUsers from "./pages/AdminUsers";
import { useCookies } from "react-cookie";

function App() {
  const [isApproved,setApprove] = useState()
  const [cookies] = useCookies()
  useEffect(()=>{
   theatreCheck()
  },[])
  async function theatreCheck(){
     const token = cookies.theatreToken
        const theatreId = await jwt_decode(token)
        setApprove(theatreId.isApproved)

  }
 
  return (
    <BrowserRouter>
    
      <Routes>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/otp" element={<OtpLogin />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/booktickets" element={<BookTicketHome />}></Route>
        <Route exact path="/allmovies" element={<AllMovieList/>}></Route>
        <Route exact path="/booktickets/movie/:id" element={<BookTicketsMovie/>} />
        <Route exact path="/booktickets/buytickets/:id" element={<SelectTheatreTime/>} />
        <Route exact path="/booktickets/seats" element={<Seating/>} />
        <Route exact path="/booktickets/summary" element={<SummaryPage/>} />
        <Route exact path="/Orderhistory" element={<UserOrderHistory/>} />



        <Route exact path="/theatre" element={<TheatreLogin />} />
        <Route exact path="/theatre/signup" element={<TheatreSignup />} />
        <Route exact path="/theatrehome" element={isApproved ?<TheatreHome />:<TheatreApplication />} />
        <Route exact path="/theatreapplication" element={<TheatreApplication />} />
        <Route exact path="/theatremanage" element={<TheatreManage />} />




        <Route exact path="/admin/login" element={<AdminLoginPage />} />
        <Route exact path="/admin" element={<AdminLogin/>} />
        <Route exact path="/application" element={<AdminApplication />} />
        <Route exact path="/users" element={<AdminUsers />} />
        <Route exact path="/addmovies" element={<AdminMovie />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/newpassword" element={<NewPassword />} />
        
        </Routes>
        
    </BrowserRouter>
  );
}

export default App;
