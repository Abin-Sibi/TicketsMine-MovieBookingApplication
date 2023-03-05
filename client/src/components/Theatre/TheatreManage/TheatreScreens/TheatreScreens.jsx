import axios from '../../../../axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode"

function TheatreScreens({refresh}) {
    const [screen,setScreen] = useState([]);
    const [cookies] = useCookies([])
   
   
    useEffect(() => {
        getscreen();
    }, [refresh])
    console.log(screen,"jjjjjjscreens are here------")
   
   var getscreen = useCallback( async()=>{
    console.log('...........shlshlfd')
    console.log(refresh,"refresh jhih")
    const token =cookies.theatreToken
    const theatreId = await jwt_decode(token)
    console.log(theatreId,"ksssssssssssssss")
    axios.get(`/api/theatre/getscreens/${theatreId.id}`).then((response)=>{
        console.log(response.data.screen,"screens are herep")
        setScreen(response.data.screen)
        // console.log(screen,"jjjjjjscreens are here------")
    })
   })

  
  
  return (
   <>
   {screen?.map((screen,i)=>{
    return(
        <div style={{marginTop:"50px",backgroundColor:"black",borderRadius:"10px",maxWidth:"600px",height:"150px"}}>
        <h1>Screen 1 - {screen.screenname}</h1>
        <span>{screen.rows},{screen.column}</span>
       </div>
    )
    
   })
    
   }
   
   </>
  )
}

export default TheatreScreens