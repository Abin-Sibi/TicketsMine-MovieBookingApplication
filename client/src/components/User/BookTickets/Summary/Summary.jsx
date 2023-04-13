import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
import styles from "../Summary/Summary.module.css";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";
import PaymentPage from "../Payment/PaymentPage";
import { useDispatch } from "react-redux";
import { handleAddTotalPrice } from "../../../../Redux/Reducers/AddTotalPrice";
// import Food from '../Components/SummeryPage/Food';

function SummaryPage() {
  const {state} = useLocation()
  console.log(state,"qqqqqqqqqqqqq")
  const [proceed, setProceed] = useState(false);
 const dispatch = useDispatch()

  let totalAmount = state.price + 28 ;

  const handleProceed = () => {
    dispatch(handleAddTotalPrice(totalAmount));
    setProceed(true);
  };

  return (
    <div className="">
        <Header/>
        <div className={styles.containerrr}>

          <div className={styles.summeryPart}>
            <div>Booking Summery</div>
            <div className={styles.categories}>
              <div style={{ textTransform: "uppercase" }}>
               KGF
              </div>
              <div>
                {state.price}
                </div>
            </div>
            <div className={styles.categories}>
              <div style={{ fontSize: "12px", lineHeight: "25px" }}>
                Internet handeling fees
              </div>
              <div>Rs 28.00</div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.categories}>
              <div>Sub total</div>
              <div>
                {totalAmount}
              </div>
            </div>

            <div
             onClick={handleProceed}
             className={styles.proceedBtn}>
              <div>Total : Rs 
                {totalAmount}
              </div>
              <div> Proceed</div>
            </div>
            <div className={styles.cancellation_policy}>
              You can cancel the tickets 20 min(s) before the show. Refunds will
              be done according to Cancellation Policy
            </div>
          </div>
        </div>
        <PaymentPage proceed={proceed} />
    </div>
  );
}

export default SummaryPage;