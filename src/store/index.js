import { configureStore } from '@reduxjs/toolkit';
import { medicineReducer } from './medicineSlice';
import { openAPI } from '../api/openApi.js';
import { mapReducer } from './mapSlice';
import { electronicReducer } from './elcetronicSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    medicine: medicineReducer,
    electronic: electronicReducer,
    [openAPI.reducerPath]: openAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(openAPI.middleware),
});

export default store;
