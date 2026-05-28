import type { Wrapped } from "../types/wrapped-type";
import { baseApi } from "./base-api";

const wrappedApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        getWrapped: builder.query<Wrapped[], void>({
            query: () => '/wrapped/user-wrapped',
            providesTags: ['Wrapped'],
        }),

        getWrappedStatus: builder.query<{ progress: number, attemptsMade: number }, string>({
            query: (wrappedId) => `/wrapped/get-status/${wrappedId}`,
            providesTags: ['Wrapped'],
        }),

        deleteWrapped: builder.mutation<void, string>({
            query: (wrappedId) => ({
                url: `/wrapped/delete/${wrappedId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Wrapped'],
        }),

        generateWrap: builder.mutation<{ progress: number; attemptsMade: number }, void>({
            query: () => ({
                url: '/wrapped/generate',
                method: 'POST',
            }),
            invalidatesTags: ['Wrapped'],
        })

    })

});

export const { useGetWrappedQuery, useGetWrappedStatusQuery, useDeleteWrappedMutation, useGenerateWrapMutation } = wrappedApi;

