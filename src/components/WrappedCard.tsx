import { useNavigate } from "react-router-dom";
import { useDeleteWrappedMutation } from "../services/wrapped-service";
import type { Wrapped } from "../types/wrapped-type";

const WrappedCard = ({item} : {item: Wrapped}) => {
    const navigate = useNavigate();
    const [deleteWrapped, { isLoading: isDeleteWrappedLoading }] = useDeleteWrappedMutation();

    const handleDeleteWrap = async (wrappedId: string) => {
        if (isDeleteWrappedLoading) return;
        try {
            await deleteWrapped(wrappedId).unwrap();
        }catch (err) {
            console.error('Failed to delete wrap:', err);
        }
    }

    const handleClick = () => {
        navigate(`/story?wrappedId=${item.id}`);
    }

    return (
        <div
            key={item.id}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-300 font-semibold">
                    {item.title}
                </h3>
            </div>
            <p className="text-3xl font-bold text-white">
                {item.year}
            </p>

            <p>Status: {item.status}</p>

            <button onClick={() => handleDeleteWrap(item.id)} className='bg-red-600 hover:bg-red-700 mt-3 text-white py-1 px-1 rounded-lg transition-colors duration-300'>
                Delete
            </button>

            <button onClick={handleClick} className='bg-blue-600 hover:bg-blue-700 mt-3 ml-2 text-white py-1 px-1 rounded-lg transition-colors duration-300'>
                View Story
            </button>

        </div>
    )
}

export default WrappedCard;