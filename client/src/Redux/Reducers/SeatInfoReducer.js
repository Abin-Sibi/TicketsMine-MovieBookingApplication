import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getSeatInformation = createAsyncThunk(
  'seatInformation/getSeatInformation',
  async ({date,movieId,showtime,theatreid}, { rejectWithValue }) => {
    try {
        console.log('aaaaaaaaaaa[]][[',date,movieId,showtime,theatreid,'klop[[p')
      const response = await axios.post('api/user/reservation/getSeatInfo', {date,movieId,showtime,theatreid});
      console.log('aaaaaaaaaaa[]][[',response)
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

const seatInformationSlice = createSlice({
  name: 'seatInformation',
  initialState: { loading: false, seat: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSeatInformation.pending, (state) => {
        state.loading = true;
        state.seat = [];
        state.error = null;
      })
      .addCase(getSeatInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.seat = action.payload;
        state.error = null;
      })
      .addCase(getSeatInformation.rejected, (state, action) => {
        state.loading = false;
        state.seat = [];
        state.error = action.payload;
      });
  },
});

export const selectSeatInformation = (state) => state.seatInformation;

export default seatInformationSlice.reducer;
