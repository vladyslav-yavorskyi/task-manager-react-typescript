import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialDate = { date: dayjs(Date.now()).format('DD-MM-YYYY') };

export const dateSlice = createSlice({
  name: 'date',
  initialState: initialDate,
  reducers: {
    incrementDay: (state) => {
      state.date = dayjs(state.date, 'DD-MM-YYYY')
        .add(1, 'day')
        .format('DD-MM-YYYY');
    },
    decrementDay: (state) => {
      state.date = dayjs(state.date, 'DD-MM-YYYY')
        .subtract(1, 'day')
        .format('DD-MM-YYYY');
    },
  },
});

export const { incrementDay, decrementDay } = dateSlice.actions;
export default dateSlice.reducer;
