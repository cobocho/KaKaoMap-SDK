import { createSlice } from '@reduxjs/toolkit';
import { openAPI } from '../api/openApi';

const medicineSlice = createSlice({
  name: 'medicine',
  initialState: {
    medicineList: [],
    selected: true,
  },
  reducers: {
    toggleSelected: (state) => {
      state.selected = !state.selected;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(openAPI.endpoints.getMedicines.matchFulfilled, (state, { payload }) => {
      state.medicineList = payload.body;
    });
  },
});

export const medicineReducer = medicineSlice.reducer;
export const medicineActions = medicineSlice.actions;
