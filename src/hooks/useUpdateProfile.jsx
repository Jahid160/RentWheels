import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUpdateProfile = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, data }) => {
      const res = await axiosSecure.patch(`/users/profile/${email}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["profile", variables.email]);
    },
  });
};

export default useUpdateProfile;
