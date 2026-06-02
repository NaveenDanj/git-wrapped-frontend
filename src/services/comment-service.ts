import type { Comment } from "../types/comment-type";
import { baseApi } from "./base-api";

export const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCommentsForWrapped: builder.query<Comment[], string>({
            query: (wrappedId) => `/comment/${wrappedId}`,
            providesTags: ['Comments'],
        }),

        addComment: builder.mutation<Comment, { wrappedId: string; content: string }>({
            query: ({ wrappedId, content }) => ({
                url: `/comment/create`,
                method: 'POST',
                body: { wrappedId, content },
            }),
            invalidatesTags: ['Comments'],
        }),

        deleteComment: builder.mutation<void, string>({
            query: (commentId) => ({
                url: `/comment/${commentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comments']
        }),

        editComment: builder.mutation<Comment, { commentId: string; content: string }>({
            query: ({ commentId, content }) => ({
                url: `/comment/${commentId}`,
                method: 'PATCH',
                body: { content },
            }),
            invalidatesTags: ['Comments'],
        })

    })
});

export const { useGetCommentsForWrappedQuery, useAddCommentMutation, useDeleteCommentMutation, useEditCommentMutation } = commentApi;