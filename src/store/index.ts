import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import { baseApi } from '../services/base-api';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch