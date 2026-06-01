import { useState } from "react";
import { useAddCommentMutation, useGetCommentsForWrappedQuery } from "../services/comment-service";
import type { Wrapped } from "../types/wrapped-type";
import type { UserState } from "../types/user-type";
import CommentList from "./CommentList";

interface CommentSectionProps {
    wrap: Wrapped;
    user: { user: UserState } | undefined;
}

const CommentSection = ({ wrap, user }: CommentSectionProps) => {
    const [commentText, setCommentText] = useState("");
    
    const { data: comments = [], isLoading: commentsLoading } = useGetCommentsForWrappedQuery(wrap.id);
    const [addComment, { isLoading: addingComment }] = useAddCommentMutation();

    const handleAddComment = async () => {
        if (!commentText.trim()) return;
        try {
            await addComment({
                wrappedId: wrap.id,
                content: commentText,
            }).unwrap();
            setCommentText("");
        } catch (err) {
            console.error("Failed to add comment:", err);
        }
    };

    return (
        <div className="border-t border-slate-700 pt-4">
            {user && (
                <div className="mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                            placeholder="Add a comment..."
                            className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button
                            onClick={handleAddComment}
                            disabled={addingComment || !commentText.trim()}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
                        >
                            {addingComment ? "..." : "Post"}
                        </button>
                    </div>
                </div>
            )}

            <CommentList 
                comments={comments} 
                wrap={wrap} 
                user={user} 
                isLoading={commentsLoading}
            />
        </div>
    );
};

export default CommentSection;
