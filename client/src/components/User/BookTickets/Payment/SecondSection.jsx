import React from 'react'
import { useSelector } from 'react-redux';
import styles from './payment.module.css';

function SecondSection() {
    // const city = useSelector(state => state.app.city)
    const booking_details = useSelector(state=>state.dateInfoSelected)  
const movieInfo = useSelector((state) => state.movie.data);
  const { movieInformation } = movieInfo;
    const handleChange = (e) => {

    }
    return (
        <div>
            <div className={styles.summeryPart}>
                <div>Booking Summery</div>
                <div className={styles.categories}>
                    <div style={{ textTransform: 'uppercase' }}>{booking_details.dateInfo?.name}</div>
                    {/* <div>{booking_details.silver.length + booking_details.platinium.length} Ticket(s)</div> */}
                </div>
                <span>{booking_details.dateInfo?.screen}</span>
                {/* <div className={styles.categories}>
                    <div style={{fontSize:'12px', lineHeight:'25px'}}>Internet handeling fees</div>
                    <div>Rs 28.00</div>
                </div> */}
                <div className={styles.line}></div>
                <div className={styles.categories}>
                    <div>Sub total</div>
                    <div>Rs. {booking_details.price}</div>
                </div>


                <div style={{ fontSize: '12px', margin: '0 30px', fontWeight: '600' }}>Your current State is <a href="">kerala</a></div>
                <div className={styles.total}>
                    <div>Amount Payable</div>
                    <div>Rs. {booking_details.price}</div>
                </div>
                {/* <h3 className={styles.ticketType}>Select Ticket Type</h3> */}

                <div className={styles.cancellation_policy}>You can cancel the tickets 20 min(s) before the show. Refunds will be done according to <a href="">Cancellation Policy</a></div>
            </div>
        </div>
    )
}

export default SecondSection