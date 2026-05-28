import { Navigate, Outlet } from "react-router-dom";
import TokenStorageService from "../services/local-storage";
import { useGetCurrentUserQuery } from "../services/auth-service";

const ProtectedRoute = () => {
  const token = TokenStorageService.getKey("authToken");

  const {
    isLoading,
    isError,
  } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <div>Checking session...</div>;
  }

  if (isError) {
    TokenStorageService.removeKey("authToken");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;