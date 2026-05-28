
import { useState } from 'react';

const HomePage = () => {
    const [isLoggedIn] = useState(false);

    const login = () => {
        if (isLoggedIn) {
            window.location.href = 'http://localhost:3000/profile';
            return;
        }else{
            window.location.href = 'http://localhost:3000/auth/github';
            return;
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center">
            <div className="text-center px-4">
                
                <div className="mb-12">
                    <h1 className="text-6xl font-bold text-white mb-4">
                        GitHub Wrapped
                    </h1>
                    <p className="text-xl text-slate-400">
                        Discover your GitHub story for 2025
                    </p>
                </div>

                <button
                    onClick={login}
                    className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                        isLoggedIn
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {isLoggedIn ? 'Continue to Profile' : 'Login with GitHub'}
                </button>

                
                <div className="mt-20 flex justify-center gap-4 text-slate-500 text-sm">
                    <span>See your contributions</span>
                    <span>View your stats</span>
                    <span>Share your story</span>
                </div>
            </div>
        </div>
    );
}

export default HomePage