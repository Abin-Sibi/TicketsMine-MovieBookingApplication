// import { createSlice } from '@reduxjs/toolkit'
// import axios from '../../axios'

// const initialState = {
//     data:{},
// }

// export const movieSlice = createSlice({
//   name: 'movie',
//   initialState,
//   reducers: {
//     movieDetails:async(state,action)=>{
//         console.log(action.payload.id,"this id is in the moviereducer")
//         // async function details(){
//            let {data} = await axios.get(`/api/user/getmovieById/${action.payload.id}`)
            
//            state.data = data
//            console.log(state.data,"faaaaaaa")
//          return state.data
//         // }
//         // details()
        
       
//    }
//   },
// })

// // Action creators are generated for each case reducer function
// export const { movieDetails} = movieSlice.actions

// export default movieSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
    data: {},
    isLoading: false,
    error: null,
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    fetchMovieDetailsPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchMovieDetailsSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchMovieDetailsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
})

export const movieDetails = (id) => async (dispatch) => {
  dispatch(movieSlice.actions.fetchMovieDetailsPending());
  try {
    const { data } = await axios.get(`/api/user/getmovieById/${id.id}`);
    dispatch(movieSlice.actions.fetchMovieDetailsSuccess(data));
  } catch (error) {
    dispatch(movieSlice.actions.fetchMovieDetailsError(error.message));
  }
}

export default movieSlice.reducer
