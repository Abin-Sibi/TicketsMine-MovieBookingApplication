import React from 'react'
import '../Sidebar/Sidebar.css'
import { BsBookmark, BsSearch} from 'react-icons/bs'
import { FaHome,FaHourglassStart,FaUser,FaTv, FaShoppingCart } from 'react-icons/fa'
function Sidebar() {
  return (
    <div className="sidebar-user">
        <i className="left-menu-icon "><BsSearch/></i>
        <i className="left-menu-icon "><FaHome></FaHome></i>
        <i className="left-menu-icon "><BsBookmark/></i>
        <i className="left-menu-icon "><FaTv/></i>
        <i className="left-menu-icon "><FaHourglassStart/></i>
    </div>
  )
}

export default Sidebar