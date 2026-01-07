import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProfile = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["profile", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${email}`);
      return res.data;
    },
  });
};

export default useProfile;
