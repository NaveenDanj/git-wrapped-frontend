import type { GetCurrentUserResponse } from "../types/user-type";
import { baseApi } from "./base-api";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<GetCurrentUserResponse, void>({
            query: () => '/auth/me',
            providesTags: ['Auth'],
        }),
    })
})

export const { useGetCurrentUserQuery } = authApi;