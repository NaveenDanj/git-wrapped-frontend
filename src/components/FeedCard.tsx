import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Wrapped } from "../types/wrapped-type";
import { useUser } from "../hooks/useUser";
import CommentSection from "./CommentSection";

interface FeedCardProps {
    wrap: Wrapped;
}

const FeedCard = ({ wrap }: FeedCardProps) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [showComments, setShowComments] = useState(false);

    const handleViewStory = () => {
        navigate(`/story?wrappedId=${wrap.id}`);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full">
                        <img src={wrap.user.avatarURL} alt={wrap.user.username} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">@{wrap.githubUsername}</h3>
                        <p className="text-slate-400 text-sm">{formatDate(wrap.createdAt)}</p>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">{wrap.title}</h2>
                <p className="text-4xl font-bold text-white bg-clip-text">
                    {wrap.year}
                </p>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-slate-400 text-sm">Type</p>
                    <p className="text-white font-semibold capitalize">{wrap.type}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-slate-400 text-sm">Created</p>
                    <p className="text-white font-semibold">{formatDate(wrap.createdAt)}</p>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={handleViewStory}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium"
                >
                    View Story
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium"
                >
                    {showComments ? "Hide Comments" : `Comments`}
                </button>
            </div>

            {showComments && <CommentSection wrap={wrap} user={user} />}
        </div>
    );
};

export default FeedCard;
