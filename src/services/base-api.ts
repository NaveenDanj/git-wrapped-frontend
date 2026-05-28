import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import TokenStorageService from "./local-storage";

export const baseApi = createApi({
    reducerPath: 'baseApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers) => {
            const token = TokenStorageService.getKey('authToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),

    tagTypes: ['Auth', 'Wrapped'],

    endpoints: () => ({})

});