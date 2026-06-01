import type { Comment } from "../types/comment-type";
import type { Wrapped } from "../types/wrapped-type";
import type { UserState } from "../types/user-type";
import { useDeleteCommentMutation } from "../services/comment-service";

interface CommentListProps {
    comments: Comment[];
    wrap: Wrapped;
    user: { user: UserState } | undefined;
    isLoading: boolean;
}

const CommentList = ({ comments, wrap, user, isLoading }: CommentListProps) => {
    const [deleteComment] = useDeleteCommentMutation();

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


    return (
        <div className="space-y-3 max-h-96 overflow-y-auto">
            {isLoading ? (
                <p className="text-slate-400 text-sm text-center py-4">Loading comments...</p>
            ) : comments.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-4">No comments yet. Be the first!</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="bg-slate-700/30 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-1">
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
                                <button
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        <div className="flex flex-start">
                            <p className="text-slate-300 text-sm">{comment.content}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentList;
