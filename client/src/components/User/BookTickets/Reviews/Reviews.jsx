import React, { useEffect, useState } from 'react'
import './Reviews.css'
import axios from '../../../../axios'
import { format } from 'timeago.js'
import StarIcon from "@mui/icons-material/Star";

function Reviews({ movieId, submit, setsubmit }) {
  const [review, setreview] = useState()

  console.log(movieId, 'this is the movieid hkj')

  useEffect(() => {
    async function getReview() {
      const { data } = await axios.get(`/api/user/getAllReview/${movieId.id}`)

      setreview(data)
      console.log(data, 'a3443443')
    }
    getReview()
  }, [submit, movieId])
  setsubmit(false)
  return (
    <div className='review-body'>
      {review?.map((item, index) => (
        <div className='bubble-list'>
          <div className='bubble clearfix'>
            <img src='../../images/profile2.png'></img>
            <div className='bubble-content'>
              <div className="review-container">
                <div className="review-name"><strong>{item.userName}</strong></div>
                <div className="review-rate"><StarIcon style={{ color: "gold" }} />{item.rating}/5</div></div>
              <div className='review-container2'>
                <div className="review-statement">{item.message}</div>
                <div className="review-time">{format(item?.date)}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Reviews