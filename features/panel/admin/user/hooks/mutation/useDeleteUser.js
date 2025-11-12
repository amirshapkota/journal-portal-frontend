import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../api/UserApiSlice";

export const useDeleteUser = (options = {}) => {
  return useMutation({
    mutationFn: (userId) => deleteUser(userId),

    ...options,
  });
};
