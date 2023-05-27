import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OPEN_API_URL } from '../constants/openAPI_urls';

export const openAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: OPEN_API_URL.SEOUL.BASE_URL,
  }),
  endpoints: (build) => ({
    getItemByContentsId: build.query({
      query: ({ id, category }) => {
        return { url: OPEN_API_URL.SEOUL.CONTENTS.URL({ id, category }) };
      },
    }),
    getMedicines: build.query({
      query: ({ coordinate, level }) => {
        return { url: OPEN_API_URL.SEOUL.MEDICINES.URL({ coordinate, level }) };
      },
    }),
    getElectronics: build.query({
      query: ({ coordinate, level }) => {
        return { url: OPEN_API_URL.SEOUL.ELECTRONIC.URL({ coordinate, level }) };
      },
    }),
  }),
});

export const { useGetMedicinesQuery, useGetItemByContentsIdQuery, useGetElectronicsQuery } =
  openAPI;
