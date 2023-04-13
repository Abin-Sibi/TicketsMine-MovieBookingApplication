import { createSlice } from "@reduxjs/toolkit";

const addTotalPriceSlice = createSlice({
  name: "addTotalPrice",
  initialState: { loading: false, dateInfo: {} },
  reducers: {
    addTotalAmountWhichBooked: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  addTotalAmountWhichBooked,
  addTotalAmountWhichBookedFail
} = addTotalPriceSlice.actions;

export default addTotalPriceSlice.reducer;




  export const handleAddTotalPrice = (totalAmount) => (dispatch) => {
    try {
      dispatch(addTotalAmountWhichBooked(totalAmount));
    } catch (error) {
      dispatch(
        addTotalAmountWhichBookedFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      ));
    }
  };