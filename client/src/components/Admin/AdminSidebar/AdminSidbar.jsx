import React, { useState ,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import {useCookies} from 'react-cookie'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaFile,
}from "react-icons/fa";
import {CgFilm, CgLogOut} from "react-icons/cg"
import { NavLink } from 'react-router-dom';
import "../../Theatre/TheatreSidebar/TheatreSidebar.css"
import axios from '../../../axios'
import { toast } from 'react-toastify';


const AdminSidebar = ({children}) => {
    const [cookies,removeCookie] = useCookies([]);
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const navigate = useNavigate();
    
    useEffect(() => {
      const verifyUser = async () => {
        if (!cookies.adminToken) {
          navigate("/admin/login");
        } else {
          const { data } = await axios.get("/api/admin/", {
            withCredentials: true,
          });
          console.log(data);
          if (!data.status) {
            removeCookie("adminToken");
            navigate("/admin/login");
          }
        }
      };
  
      verifyUser();
    }, [cookies, navigate, removeCookie]);

    const menuItem=[
        {
            path:"/admin",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/about",
            name:"Profile",
            icon:<FaUserAlt/>
        },
        {
            path:"/addmovies",
            name:"Movie",
            icon:<CgFilm/>
        },
        {
            path:"/application",
            name:"Application",
            icon:<FaFile/>
        },
    ]
   
    const logOut = ()=>{
       axios.get("/api/admin/logout").then((data)=>{
        console.log(data.data,"hiiiiiiiiiiiiiiiii")
        navigate("/admin/login")
       })
      
  }
    return (
        <div className='cont'>
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Admin</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" >
                           <div className="icon" >{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}}  className="link_text">{item.name}</div>

                       </NavLink>
                   ))
               }
               <div className='theatreLogout'>
                <div className="icon">{<CgLogOut/>}</div>
               <div style={{display: isOpen ? "block" : "none"}} onClick={logOut}  className="link_text">Logout</div>
               </div>
               
           </div>
           <main>{children}</main>
        </div>
    );
};

export default AdminSidebar;