import React from "react";
import styles from "./payment.module.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function FirstSection({ handlePayment }) {
  const stripe = useStripe();
  const elements = useElements();
  const handlePaymentGateway = async () => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        console.log("Stripe 23 | token generated!", paymentMethod);
              
        handlePayment(id);
        console.log(id,'eeeeeeeeeeeeeeeeee')
        //send token to backend here
      } catch (error) {
        console.log(error,'hehehehehehehehhehehsososos');
      }
    } else {
      console.log(error.message,'ueueueueueueueueyyeyeyey');
    }
  };
  return (
    <div>
      {/* <div className={styles.contact}>
        <div>
          <span>Share your contact details</span>
        </div>
        <div className={styles.contact_details}>
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Nobile number" />
          <button style={{ marginBottom: "-5px", color: "white" }}>
            continue
          </button>
        </div>
      </div> */}
      <div className={styles.contact} style={{borderRadius:"50px"}}>
        <div>More Payment options</div>
        <div className={styles.StoredCard}>
          <div className={styles.sidebar}>
            <div style={{ background: "white" }}>Credit / Debit card</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles.cardDetails}>
            <span>Enter your card details</span>
            <div className={styles.sampleCard}>
              <div style={{ fontSize: "13px", color: "gray" }}>Card Number</div>
              <CardElement />

              <div className={styles.otherDetails}>
              </div>
            </div>

            <div className={styles.payment}>
              <button onClick={handlePaymentGateway}>Make Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstSection;