import { useGetCurrentUserQuery } from "../services/auth-service";
import TokenStorageService from "../services/local-storage"

export const useUser = () => {
    const token = TokenStorageService.getKey("authToken");

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useGetCurrentUserQuery(undefined, {
        skip: !token,
    });

    return {
        token,
        user: data,
        isLoading,
        isError,
        refetch,
    };
}