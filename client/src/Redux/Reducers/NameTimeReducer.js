import { createSlice } from "@reduxjs/toolkit";

const dateInformationSlice = createSlice({
  name: "dateInformation",
  initialState: { loading: false, dateInfo: {} },
  reducers: {
    getBookedDetailsSuccess: (state, action) => {
      state.loading = false;
      state.dateInfo = action.payload;
    },
    getBookedDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getBookedDetailsSuccess,
  getBookedDetailsFail
} = dateInformationSlice.actions;

export default dateInformationSlice.reducer;



export const handleSelectNameTime = (name, time, screen, theaterId) => async (
  dispatch
) => {
  const data = {
    name,
    time,
    screen,
    theaterId,
  };
  try {
    console.log(data,'ijij[ppp[p][[')
    dispatch(getBookedDetailsSuccess(data));
  } catch (error) {
    dispatch(
      getBookedDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

