import { createSlice } from '@reduxjs/toolkit';
import { openAPI } from '../api/openApi';

const electronicSlice = createSlice({
  name: 'electronic',
  initialState: {
    electronicList: [],
    selected: true,
  },
  reducers: {
    toggleSelected: (state) => {
      state.selected = !state.selected;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(openAPI.endpoints.getElectronics.matchFulfilled, (state, { payload }) => {
      state.electronicList = payload.body;
    });
  },
});

export const electronicReducer = electronicSlice.reducer;
export const electronicActions = electronicSlice.actions;
