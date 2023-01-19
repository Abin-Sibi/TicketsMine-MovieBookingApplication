import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../../axios'
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs'
import "./Header.css";
import { FaCaretDown } from 'react-icons/fa'
function Header() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.userToken) {
                navigate("/login")
            } else {
                const { data } = await axios.get("/", { withCredentials: true });
                if (!data.status) {
                    removeCookie("userToken")
                    navigate("/login")
                }
            }
        }
        verifyUser();
    }, [cookies, navigate, removeCookie])
    const logOut = () => {
        axios.get("/api/user/logout").then((data) => {
            console.log(data.data, "hiiiiiiiiiiiiiiiii")
            navigate("/login")
        })
    }
    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className="logo-container">
                    <h1 className="logo">Tickets<span style={{ "fontSize": "40px" }}>M</span>ine</h1>
                </div>
                <div>

                </div>
                <div className="menu-container">
                    <ul className="menu-list">
                        <li className="menu-list-item">Home</li>
                        <li className="menu-list-item">Movies</li>
                        <li className="menu-list-item">Series</li>
                        <li className="menu-list-item">Popular</li>
                        <li className="menu-list-item"><span style={{ "fontSize": "15px" }}><b><Link style={{textDecoration:"none",color:"white"}} to={"/booktickets"}> Book Tickets</Link></b></span></li>

                    </ul>
                </div>
                <div className="profile-container">
                    <img className="profile-picture" src="../images/profile2.png" alt=""></img>
                    <div className="profile-text-container">
                        <span className="profile-text"><button style={{ color:"white",backgroundColor:"black" }} onClick={logOut}>Logout</button></span>
                        {/* <i className="fas fa-caret-down"><FaCaretDown /></i> */}
                    </div>
                    <div className="toggle">
                        <i className="fas  toggle-icon"><BsMoonFill /></i>
                        <i className="fas  toggle-icon"><BsFillSunFill /></i>
                        <div className="toggle-ball"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header