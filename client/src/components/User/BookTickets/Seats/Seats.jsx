import React, { useEffect, useState } from "react";
import "./Seats.css";
import { rows } from "./SeatData";
import Header from "../../Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleAddingSeatingData } from "../../../../Redux/Reducers/AddSeatDataReducer";
const Silver = ["A", "B", "C", "D", "E", "F", "G", "H"];
const ticketList = {
  silver: [],
  price: 0,
};

function Seating({seatingActive = false,
  type1 = "SILVER",
  // type2 = "Premium",
  ticketPrice1 = 120}) {
  const [active, setActive] = React.useState(false);
  const [rowsData, setRowData] = useState(rows);
  const [seatActive, setSeatActive] = React.useState(seatingActive);
  const [price, setPrice] = React.useState(0);
  console.log(rowsData);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const seats = useSelector((state) => state.seatInformation);
  const { loading, seat } = seats;
  // const state = useLocation()

  useEffect(() => {
    if (seat.length >= 1) {
      setRowData(rowsData => {
        return rowsData.map(obj => {
          const matchingObject = seat.find(o => o.id === obj.id);
          if (matchingObject) {
            return {
              ...obj,
              seat: matchingObject.seat,
              isReserved: matchingObject.isReserved
            };
          } else {
            return obj;
          }
        });
      });
    }
  }, [seat]);  
  
  // const { dateInfo } = date;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleClick = (value) => {
    setRowData(
      rowsData.map((e) =>
        e.id === value ? { ...e, isSelected: !e.isSelected } : e
      )
    );

  };
console.log(rowsData,'888888888888')
  React.useEffect(() => {
    let a = rowsData.filter((e) => e.isSelected).length;
    // let b = rowsData2.filter((e) => e.isSelected).length;
    
    setPrice(a * ticketPrice1);
    setActive(price > 0 ? true : false);
  }, [price, rowsData]);

  const handleSeat = () => {
    console.log("rrrrrrrrrrrrrrrrrrr")
    rowsData.forEach((e) =>
      e.isSelected
        ? ticketList.silver.push({ seat: e.seat, id: e.id, isReserved: true })
        : ""
    );
console.log('aaaaaaaaaaaaaaaa')
    ticketList.price = price;
    setSeatActive(false);
    dispatch(handleAddingSeatingData(ticketList));
    navigate("/booktickets/summary",{state:ticketList});
  };

  return (
    <>
     <Header/>
      
      <div className="seatingModal__seatContainer">
        <div>
           <h1>Ann CinePlux</h1>
          <h5>
            Silver - Rs.150
          </h5>

          <div className="seatingModal__seatContainer_can">
            <div style={{ display: "grid" }}>
              {Silver.map((e) => (
                <div style={{ margin: 10, color: "gray" }} key={e}>
                  {e}
                </div>
              ))}
            </div>
            <div className="seatingModal__seatContainer_seats">
              {rowsData.map((e) => (
                <div
                onClick={() => handleClick(e.id)}
                  className={
                    e.disable? "disable": e.isReserved? "reserved": e.isSelected? "select": "seats"
                  }
                  key={e.id}
                >
                  <p>{e.number}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="Screen">
            <img src="https://i.imgur.com/XhsTL5Y.png" alt="screen" />
          </div>
          <div>helloooooo</div>
        </div>
      </div>
      <div
        style={active ? { display: "block" } : { display: "none" }}
        className="PriceButton"
      >
        <button
        onClick={() => handleSeat()}
          style={{
            height: 40,
            margin: 10,
            marginLeft: "40%",
            cursor: "pointer",
          }}
        >
          Rs. {price}
        </button>
      </div>
    </>
  );
}

export default Seating;

// function Seating() {
//   const [active, setActive] = React.useState(false);
//   const [rowsData, setRowData] = useState(rows);
//   const [ticketList, setTicketList] = useState({
//     silver: [],
//     price: 0,
//   });

//   const handleSeatClick = (rowId) => {
//     setRowData((prevState) =>
//       prevState.map((row) => {
//         if (row.id === rowId) {
//           return {
//             ...row,
//             seat: row.seat.map((seat) => {
//               if (row.id === rowId) {
//                 return {
//                   ...seat,
//                   isSelected: !seat.isSelected,
//                 };
//               }
//               return seat;
//             }),
//           };
//         }
//         return row;
//       })
//     );

//     setTicketList((prevState) => {
//       let updatedTicketList = { ...prevState };
//       const selectedSeat = `${String.fromCharCode(64 + rowId)}${rowId}`;
//       if (prevState.silver.includes(selectedSeat)) {
//         updatedTicketList.silver = prevState.silver.filter(
//           (seat) => seat !== selectedSeat
//         );
//         updatedTicketList.price = updatedTicketList.price - 150;
//       } else {
//         updatedTicketList.silver.push(selectedSeat);
//         updatedTicketList.price = updatedTicketList.price + 150;
//       }
//       return updatedTicketList;
//     });
//   };

//   return (
//     <>
//       <Header />

//       <div className="seatingModal__seatContainer">
//         <div>
//           <h1>Ann CinePlux</h1>
//           <h5>Silver - Rs.150</h5>

//           <div className="seatingModal__seatContainer_can">
//             <div style={{ display: "grid" }}>
//               {Silver.map((e) => (
//                 <div style={{ margin: 10, color: "gray" }} key={e}>
//                   {e}
//                 </div>
//               ))}
//             </div>
//             <div className="seatingModal__seatContainer_seats">
//               {rowsData.map((row) => (
//                 <div className="seatRow" key={row.id}>
//                   {/* {row.seat.map((seat) => ( */}
//                     <div
//                       className={
//                         row.disable
//                           ? "disable"
//                           : row.isReserved
//                           ? "reserved"
//                           : row.isSelected
//                           ? "select"
//                           : "seats"
//                       }
//                       // key={seat.id}
//                       onClick={() => handleSeatClick(row.id)}
//                     >
//                       <p>{row.number}</p>
//                     </div>
//                   {/* ))} */}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="Screen">
//             <img src="https://i.imgur.com/XhsTL5Y.png" alt="screen" />
//           </div>
//           <div>helloooooo</div>
//         </div>
//       </div>
//       <div
//         style={active ? { display: "block" } : { display: "none" }}
//         className="PriceButton"
//       >
//         <button
//           style={{
//             height: 40,
//             margin: 10,
//             marginLeft: "40%",
//             cursor: "pointer",
//           }}
//         >
//           Rs. {ticketList.price}
//         </button>
//       </div>
//     </>
//   );
// }
// export default Seating;

