import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading: roleLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-role"],
    enabled: !loading && !!user, // wait for auth
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role");
      return res.data.role;
    },
  });

  if (isError) {
    console.error("Failed to fetch user role:", error);
  }

  return { role, roleLoading };
};

export default useRole;
