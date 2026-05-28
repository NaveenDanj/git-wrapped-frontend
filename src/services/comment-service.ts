import type { Comment } from "../types/comment-type";
import { baseApi } from "./base-api";

export const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCommentsForWrapped: builder.query<Comment[], string>({
            query: (wrappedId) => `/comments/${wrappedId}`
        }),

        addComment: builder.mutation<Comment, { wrappedId: string; content: string }>({
            query: ({ wrappedId, content }) => ({
                url: `/comments/create`,
                method: 'POST',
                body: { wrappedId, content },
            }),
            invalidatesTags: ['Comments'],
        }),

        deleteComment: builder.mutation<void, string>({
            query: (commentId) => ({
                url: `/comments/${commentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comments']
        })

    })
});