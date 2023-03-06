import { configureStore } from '@reduxjs/toolkit'
import MovieReducer from '../Reducers/MovieReducer'

export const store = configureStore({
  reducer: {
    movie :MovieReducer,
    
  },
})