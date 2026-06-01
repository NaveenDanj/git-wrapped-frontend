
import { useGetAllWrapsQuery } from "../services/wrapped-service";
import FeedCard from "../components/FeedCard";

const FeedPage = () => {
    const { data: wraps = [], isLoading, error } = useGetAllWrapsQuery();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-8 px-4">
            <div className="max-w-6xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">GitHub Wrapped Feed</h1>
                    <p className="text-slate-400">Discover and comment on community Git wraps</p>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin mb-4"></div>
                        <p className="text-slate-400">Loading wraps...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
                        <p className="text-red-400 font-semibold">Failed to load wraps</p>
                        <p className="text-red-300 text-sm mt-2">
                            {error instanceof Error ? error.message : "An error occurred"}
                        </p>
                    </div>
                ) : wraps.length === 0 ? (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
                        <p className="text-slate-400 text-lg">No wraps found matching your criteria</p>
                        <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {wraps.map((wrap) => (
                            <FeedCard key={wrap.id} wrap={wrap} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedPage;