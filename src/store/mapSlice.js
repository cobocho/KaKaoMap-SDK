import { createSlice } from '@reduxjs/toolkit';
import { BASE_COORD, DEFAULT_LEVEL } from '../constants/coordinate';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    center: {
      coord: BASE_COORD,
      isPanto: true,
    },
    position: {
      ...BASE_COORD,
    },
    level: DEFAULT_LEVEL,
    selectedItemId: null,
    hoveredItemId: null,
  },
  reducers: {
    setCenter: (state, { payload }) => {
      state.center = {
        coord: payload,
        isPanto: true,
      };
    },
    setPosition: (state, { payload }) => {
      state.position = payload;
    },
    setLevel: (state, { payload }) => {
      state.level = payload;
    },
    setSelectedItemId: (state, { payload }) => {
      state.selectedItemId = payload;
    },
    setHoveredItemId: (state, { payload }) => {
      state.hoveredItemId = payload;
    },
  },
});

export const mapReducer = mapSlice.reducer;
export const mapActions = mapSlice.actions;
