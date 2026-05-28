import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/auth-service";
import TokenStorageService from "../services/local-storage";

const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenFromUrl) {
      TokenStorageService.setKey("authToken", tokenFromUrl);
      setEnabled(true);
    }
  }, [tokenFromUrl]);

  const {data, isLoading, error} = useGetCurrentUserQuery(undefined, {
    skip: !enabled,
  });

  const handleNavigate = () => {
    navigate("/profile");
    return;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center">
      <div className="text-center px-4">

        {isLoading && (
          <>
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Processing your login...
            </h2>
          </>
        )}

        {data && (
          <>
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">
              Login Successful!
            </h2>

            <p className="text-slate-400 mb-8">
              Welcome {data.user.username}
            </p>

            <button onClick={handleNavigate} className="mt-5 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all">
              Continue to Profile
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default LoginCallback;