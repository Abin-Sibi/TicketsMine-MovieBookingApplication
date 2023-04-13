import React, { useEffect, useState } from "react";
import '../OrderHistory/order.css'
import axios from "../../../axios";
import jwt_decode from 'jwt-decode'
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify'

function OrderHistory() {
    const [history, sethistory] = useState([]);
    const [cookies] = useCookies()
    
    useEffect(() => {
        console.log('hqqqqqqqqqqwwwwww')
        async function getHistroy() {
            const userId = await jwt_decode(cookies.userToken)
            console.log('hqqqqqqqqqqwwwwww', userId)
            const user = userId.id
            const { data } = await axios.get(
                `/api/user/getUserHistory/${user}`
            );
            console.log(data, '881188118811881')
            sethistory(data);
        }

        getHistroy();
    }, []);


    return (
        <>

            {history?.map((item) => (
                <div className="ticket3 ">
                    <div className="firsthalf ">
                        <div className="posters ">
                            <img
                                className=""

                                src={`https://res.cloudinary.com/dp2p38wb5/image/upload/v1678028171/${item.movieId.imageUrl}.jpg`}
                                alt=""
                            />
                        </div>
                        <div className="details">
                            <div className="title">{item?.movieId?.title}</div>
                            {/* <p>EVM ,Cherthala</p> */}
                            <div className="theaterDetail">
                                <p className="">{item?.cinemaId.application.name}, {item?.cinemaId.application.city} ,{item?.cinemaId.application.state}</p>
                                <p className="time">
                                    {item?.startAt} | {item?.showDate}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div class="dash"></div>
                    {/* <div class="dash border-dashed border-l-2 border-white-500 ..."></div> */}
                    <div className="secondhalf">
                        {/* <div className=" h-full w-50 p-5 flex justify-center text-center"> */}
                        <div className='seatingDetails'>
                            <p className="price">
                                Quantity : <span>{item?.seats.length}</span>
                            </p>
                            <p className="seatno font-semibold">
                                <span>Seats : </span>
                                {item?.seats?.map((dataSeat) => (
                                    <p>{dataSeat.seat},</p>
                                ))}
                            </p>
                            <p className="">TicketPrice  <span>Rs</span>{item?.ticketPrice}</p>
                            <div className="price">
                            <p>AMOUNT PAID</p> <span>Rs</span> {item?.total}
                            </div>
                        </div>
                    <div className="qr">
                        <img className="" src={item?.qrcode} alt="" />
                        <p>QR CODE</p>
                    </div>
                    {/* </div> */}
                </div>
        </div>
    ))
}
    </>
  );
}

export default OrderHistory;
