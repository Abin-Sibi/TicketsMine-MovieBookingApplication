import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: { date: null, error: null },
  reducers: {
    addDateAndDayToStateSuccess: (state, action) => {
        console.log('action.payload',action.payload)
      state.date = action.payload;
      state.error = null;
    },
    addDateAndDayToStateFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addDateAndDayToStateSuccess, addDateAndDayToStateFail } =
  dateSlice.actions;

export const selectDate = (date, day, month, year) => async (dispatch) => {
  try {
    console.log(date, day, month, year,"iiiiiiiiiiiiiii")
    dispatch(addDateAndDayToStateSuccess({ date, day, month, year }));
  } catch (error) {
    dispatch(
      addDateAndDayToStateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export default dateSlice.reducer
