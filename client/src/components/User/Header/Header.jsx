import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../../axios'
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs'
import "./Header.css";
import jwt_decode from 'jwt-decode'
import { FaCaretDown } from 'react-icons/fa'
import { Button, Menu, MenuItem, Select } from '@mui/material'
function Header() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [user, setUser] = useState()
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.userToken) {
                navigate("/login")
            } else {
                const { data } = await axios.get("/", { withCredentials: true });
                const userId = await jwt_decode(cookies.userToken)
                setUser(userId.name)
                if (!data.status) {
                    removeCookie("userToken")
                    navigate("/login")
                }
            }
        }
        verifyUser();
    }, [cookies, navigate, removeCookie])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

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
                        <li className="menu-list-item"><span style={{ "fontSize": "15px" }}><b><Link style={{ textDecoration: "none", color: "white" }} to={"/booktickets"}> Book Tickets</Link></b></span></li>

                    </ul>
                </div>
                <div className="toggle">
                    <i className="fas  toggle-icon"><BsMoonFill /></i>
                    <i className="fas  toggle-icon"><BsFillSunFill /></i>
                    <div className="toggle-ball"></div>
                </div>
                <div className="profile-container">
                    <img className="profile-picture" src="../images/profile2.png" alt=""></img>
                    <div className="profile-text-container">

                        <Button
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className="profile-text" style={{"textDecoration":'none', color: "black" }}>{user}
                        </Button>
                        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem ><Link style={{"textDecoration":'none', color: "black" }} to={'/OrderHistory'}>My tickets</Link></MenuItem>
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                        </Menu>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Header