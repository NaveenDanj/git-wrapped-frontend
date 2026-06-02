import { useState } from "react";
import type { Comment } from "../types/comment-type";
import type { Wrapped } from "../types/wrapped-type";
import type { UserState } from "../types/user-type";
import { useDeleteCommentMutation, useEditCommentMutation } from "../services/comment-service";

interface CommentListProps {
    comments: Comment[];
    wrap: Wrapped;
    user: { user: UserState } | undefined;
    isLoading: boolean;
}

const CommentList = ({ comments, wrap, user, isLoading }: CommentListProps) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [deleteComment] = useDeleteCommentMutation();
    const [editComment] = useEditCommentMutation();

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await deleteComment(commentId).unwrap();
        } catch (err) {
            console.error("Failed to delete comment:", err);
        }
    };

    const handleEditStart = (comment: Comment) => {
        setEditingId(comment.id);
        setEditText(comment.content);
    };

    const handleSaveEdit = async (commentId: string) => {
        if (!editText.trim()) return;
        try {
            await editComment({ commentId, content: editText }).unwrap();
            setEditingId(null);
            setEditText("");
        } catch (err) {
            console.error("Failed to edit comment:", err);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditText("");
    };


    return (
        <div className="space-y-3 max-h-96 overflow-y-auto">
            {isLoading ? (
                <p className="text-slate-400 text-sm text-center py-4">Loading comments...</p>
            ) : comments.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-4">No comments yet. Be the first!</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="bg-slate-700/30 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 rounded-full">
                                    <img 
                                        src={wrap.user.avatarURL} 
                                        alt={wrap.user.username} 
                                        className="w-full h-full rounded-full object-cover" 
                                    />
                                </div>
                                <div>
                                    <label className="text-slate-300 text-sm font-medium">
                                        {wrap.user.username}
                                    </label>
                                    <br />
                                    <label className="text-slate-500 text-xs">
                                        {formatDate(comment.createdAt)}
                                    </label>
                                </div>
                            </div>
                            {user?.user?.id === comment.userId && (
                                <div className="flex gap-2">
                                    {editingId !== comment.id && (
                                        <>
                                            <button
                                                onClick={() => handleEditStart(comment)}
                                                className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {editingId === comment.id ? (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-full bg-slate-600/50 border border-slate-500 rounded px-2 py-1 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400"
                                    placeholder="Edit comment..."
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleSaveEdit(comment.id)}
                                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="text-xs bg-slate-600 hover:bg-slate-700 text-white px-2 py-1 rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-300 text-sm">{comment.content}</p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentList;
