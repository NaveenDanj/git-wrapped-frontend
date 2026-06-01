import { useEffect, useState } from 'react';
import type { Wrapped } from '../types/wrapped-type';
import { useGetWrappedQuery, useGenerateWrapMutation } from '../services/wrapped-service';
import WrappedCard from '../components/WrappedCard';
import { useDispatch } from 'react-redux';
import { setUserWrapped } from '../store/wrapped/wrappedSlice';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [wrapped, setWrapped] = useState<Wrapped[]>([]);
    const { data, error, isLoading: isGetWrappedLoading } = useGetWrappedQuery();
    const [generateWrap, { isLoading: isGenerateWrapLoading }] = useGenerateWrapMutation();

    if (error) {
        return <p>Failed to load your GitHub Wrapped. Please try again later.</p>;
    }

    useEffect(() => {
        if (data) {
            setWrapped(data);
            // dispatch({ type: 'wrapped/setUserWrapped', payload: data });
            dispatch(setUserWrapped(data))
        }
    }, [data]);

    const handleGenerateWrap = async() => {
        if (isGetWrappedLoading || isGenerateWrapLoading) return;

        try {
            const res  = await generateWrap().unwrap();
            console.log('Wrap generated successfully:', res);
        } catch (err) {
            console.error('Failed to generate wrap:', err);
            return;
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black p-8">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-3">
                        Your GitHub Wrapped
                    </h1>
                    <p className="text-slate-400 text-lg">
                        See your GitHub story for { new Date().getFullYear() }
                    </p>
                </div>

                <div className="flex justify-center mb-12 gap-5">
                    <button
                        onClick={handleGenerateWrap}
                        disabled={isGetWrappedLoading}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isGetWrappedLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Generating...
                            </>
                        ) : (
                            <>
                                Generate Wrap
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => navigate('/feed')}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        Feed
                    </button>
                </div>

                {wrapped.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wrapped.map((item) => (
                            <WrappedCard key={item.id} item={item} />
                        ))}
                    </div>
                )}

                {wrapped.length === 0 && !isGetWrappedLoading && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🎁</div>
                        <p className="text-slate-400 text-lg">
                            Click the button above to generate your GitHub Wrapped!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
