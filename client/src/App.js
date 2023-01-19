import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/otp" element={<OtpLogin />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/booktickets" element={<BookTicketHome />}></Route>
        <Route exact path="/booktickets/movie" element={<BookTicketsMovie/>} />
        <Route exact path="/booktickets/buytickets" element={<SelectTheatreTime/>} />
        <Route exact path="/theatre" element={<TheatreLogin />} />
        <Route exact path="/theatre/signup" element={<TheatreSignup />} />
        <Route exact path="/theatrehome" element={<TheatreHome />} />
        <Route exact path="/theatreapplication" element={<TheatreApplication />} />
        <Route exact path="/theatremanage" element={<TheatreManage />} />
        <Route exact path="/admin/login" element={<AdminLoginPage />} />
        <Route exact path="/admin" element={<AdminLogin/>} />
        <Route exact path="/application" element={<AdminApplication />} />
        <Route exact path="/addmovies" element={<AdminMovie />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/newpassword" element={<NewPassword />} />
        
        </Routes>
        
    </BrowserRouter>
  );
}

export default App;
