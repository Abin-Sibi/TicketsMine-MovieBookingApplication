import React from "react";
import "./Carrousal.css";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Carrousal() {

  const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 2
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

  const dataList = [
    "../images/wallpaperflare.com_wallpaper.jpg",
    "../images/wp9424755-avatar-poster-wallpapers.jpg",
    "..//images/rorschach-mammootty-new-poster-1662918882.jpg",
    "../images/wp11581820-kantara-wallpapers.jpg",
    "../images/8a6a68144592045.628efcd3e77b5.jpg",
    "../images/wp8512156-tenet-movie-wallpapers.jpg",
    "../images/wp11144115-kgf-chapter-2-poster-wallpapers.jpg"
]
  return (
     <div style={{ padding: "5px 0px",background:"black" }}>
     <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile"]} autoPlay infinite>
         {
             dataList?.map((banner, index) => (
                 <div style={{ padding: "0px 15px" }} key={index + 1}>
                     <img style={{ width: "102%",height:"360px", cursor: "pointer" }} src={banner} alt="Advertisement banner" />
                 </div>
             ))
         }
     </Carousel>
 </div>
  );
}

export default Carrousal;