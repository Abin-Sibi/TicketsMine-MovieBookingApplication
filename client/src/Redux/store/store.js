import { configureStore } from '@reduxjs/toolkit'
import MovieReducer from '../Reducers/MovieReducer'
import dateReducer from '../Reducers/DateReducer'
import seatInformationReducer from '../Reducers/SeatInfoReducer';
import NameTimeReducer from '../Reducers/NameTimeReducer';
import AddTotalPrice from '../Reducers/AddTotalPrice';
import AddSeatDataReducer from '../Reducers/AddSeatDataReducer';
import PostBookingDetails from '../Reducers/PostBookingDetails';

export const store = configureStore({
  reducer: {
    movie :MovieReducer,
    seatInformation: seatInformationReducer,
    dateInfo:dateReducer,
    dateInfoSelected:NameTimeReducer,
    totalPrice:AddTotalPrice,
    SeatData:AddSeatDataReducer,
    payment:PostBookingDetails
  },
})