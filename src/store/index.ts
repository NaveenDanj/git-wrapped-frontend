import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import wrappedReducer from './wrapped/wrappedSlice'
import { baseApi } from '../services/base-api';

export const store = configureStore({
    reducer: {
        user: userReducer,
        wrapped: wrappedReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch