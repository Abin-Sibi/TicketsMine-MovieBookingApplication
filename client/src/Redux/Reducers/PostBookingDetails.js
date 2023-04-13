import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
const stripeApiKey = "sk_test_51MrG87SGEjvtURnZI3mv0ewaJ2ALmbKNtrLGlg98juLnduK3yNBM28siLMSIv5ebmr4Yg5xnjnmswJIeVXOlL22f00POjDomea"

const headers = {
    'Authorization': `Bearer ${stripeApiKey}`,
    'Content-Type': 'application/json',
  };

export const postBookingDetails = createAsyncThunk(
  "payment/postBookingDetails",
  async (datas, { rejectWithValue }) => {
    try {
        console.log(datas,"highhighhighhhgii")
      const response = await axios.post("/reservation", datas,{headers});
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postBookingDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(postBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(postBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
