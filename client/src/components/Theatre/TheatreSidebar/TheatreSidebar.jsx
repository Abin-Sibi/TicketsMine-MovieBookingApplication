import React, { useState ,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import {useCookies} from 'react-cookie'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaFile,
    FaFilm
}from "react-icons/fa";
import {CgLogOut} from "react-icons/cg"
import TheatreApply from "../TheatreApplication/TheatreApply";
import { NavLink } from 'react-router-dom';
import "../TheatreSidebar/TheatreSidebar.css"
import axios from '../../../axios'
import { toast } from 'react-toastify';


const Sidebar = ({children}) => {
    const [cookies,removeCookie] = useCookies([]);
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const navigate = useNavigate();
    useEffect(() => {
        const verifyUser = async ()=>{
            if(!cookies.theatreToken){
             navigate("/theatre")
            }else{
                const { data } = await axios.get("/api/theatre/theatrehome",{withCredentials:true});
                if(!data.status){
                    removeCookie("theatreToken")
                    navigate("/theatre")
                }
            }
        }
        verifyUser();
    }, [cookies,navigate,removeCookie])
    
    const menuItem=[
        {
            path:"/theatrehome",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/about",
            name:"Profile",
            icon:<FaUserAlt/>
        },
        {
            path:"/theatreManage",
            name:"Theatre",
            icon:<FaFilm/>
        },
        {
            path:"/theatreapplication",
            name:"Application",
            icon:<FaFile/>
        },
    ]
    const logOut = ()=>{
        axios.get("/api/theatre/logout").then((data)=>{
            console.log(data.data,"hiiiiiiiiiiiiiiiii")
            navigate("/theatre")
           })
    }
    return (
        <div className='cont'>
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Theatre</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
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

export default Sidebar;