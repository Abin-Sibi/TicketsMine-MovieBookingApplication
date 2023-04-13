import { createSlice } from "@reduxjs/toolkit";


const initialState = { loading: false, dateInfo: {},error: null }
export const addSeatDataSlice = createSlice({
  name: "addSeatData",
  initialState,
  
  reducers: {
    getSeatsAndTotalAmountPending: (state) => {
        state.loading = true;
        state.error = null;
      },
    getBookedDetailsFail: (state, action) => {

      state.loading = false;
      state.error = action.payload;
      
    },
    getSeatsAndTotalAmount: (state, action) => {
        
        state.dateInfo = action.payload;
        state.loading = false;
        state.error = null;
        console.log( state.dateInfo,'action.payloadqqqqqqqqqqq')
    },
  },
});



export const handleAddingSeatingData = (seating) =>async (dispatch) => {
    dispatch(addSeatDataSlice.actions.getSeatsAndTotalAmountPending());
    try {
      dispatch(addSeatDataSlice.actions.getSeatsAndTotalAmount(seating));
    } catch (error) {
      dispatch(
        addSeatDataSlice.actions.getBookedDetailsFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export default addSeatDataSlice.reducer;